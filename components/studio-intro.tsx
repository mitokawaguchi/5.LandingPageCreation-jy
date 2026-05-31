'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';

const T = {
  bg: '#06070a', accent: '#b5fb6b', ink: '#e9edf2', sub: '#8a93a0',
};

interface StudioIntroProps {
  onExitStart?: () => void;
  onDone?: () => void;
}

const STUDIO_NAME = 'MIT Tech Studio';

export function StudioIntro({ onExitStart, onDone }: StudioIntroProps) {
  const [phase, setPhase] = useState<'enter' | 'fly' | 'fade' | 'done'>('enter');
  const lockupRef = useRef<HTMLDivElement>(null);
  const [flyTransform, setFlyTransform] = useState<string>('');
  const skipReady = useRef(false);
  const hasExited = useRef(false);

  // Allow skip after 1200ms
  useEffect(() => {
    const timer = setTimeout(() => {
      skipReady.current = true;
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  // Body overflow
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const triggerExit = useCallback(() => {
    if (hasExited.current) return;
    hasExited.current = true;

    // Compute fly transform to nav logo dock
    const dock = document.querySelector<HTMLElement>('[data-logo-dock]');
    const lockup = lockupRef.current;

    if (dock && lockup) {
      const dockRect = dock.getBoundingClientRect();
      const lockupRect = lockup.getBoundingClientRect();

      const scaleX = dockRect.width / lockupRect.width;
      const scaleY = dockRect.height / lockupRect.height;
      const s = Math.min(scaleX, scaleY);

      const dx = dockRect.left + dockRect.width / 2 - (lockupRect.left + lockupRect.width / 2);
      const dy = dockRect.top + dockRect.height / 2 - (lockupRect.top + lockupRect.height / 2);

      setFlyTransform(`translate(${dx}px, ${dy}px) scale(${s})`);
    } else {
      setFlyTransform('scale(0.3) translate(-60vw, -44vh)');
    }

    onExitStart?.();
    setPhase('fly');
  }, [onExitStart]);

  // Auto exit after 2600ms
  useEffect(() => {
    const timer = setTimeout(triggerExit, 2600);
    return () => clearTimeout(timer);
  }, [triggerExit]);

  // Skip handlers (keyboard, wheel, touch, pointer) after 1200ms
  useEffect(() => {
    const handle = () => {
      if (skipReady.current) triggerExit();
    };
    window.addEventListener('keydown', handle);
    window.addEventListener('wheel', handle, { passive: true });
    window.addEventListener('touchstart', handle, { passive: true });
    window.addEventListener('pointerdown', handle);
    return () => {
      window.removeEventListener('keydown', handle);
      window.removeEventListener('wheel', handle);
      window.removeEventListener('touchstart', handle);
      window.removeEventListener('pointerdown', handle);
    };
  }, [triggerExit]);

  // Fly phase -> fade phase after 880ms
  useEffect(() => {
    if (phase === 'fly') {
      const timer = setTimeout(() => {
        document.body.style.overflow = '';
        setPhase('fade');
      }, 880);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  // Fade phase -> done after 560ms
  useEffect(() => {
    if (phase === 'fade') {
      const timer = setTimeout(() => {
        setPhase('done');
        onDone?.();
      }, 560);
      return () => clearTimeout(timer);
    }
  }, [phase, onDone]);

  if (phase === 'done') return null;

  const studioChars = STUDIO_NAME.split('');

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: T.bg,
        opacity: phase === 'fade' ? 0 : 1,
        transition: phase === 'fade' ? 'opacity 560ms ease' : undefined,
        pointerEvents: phase === 'fly' || phase === 'fade' ? 'none' : 'auto',
      }}
    >
      <div
        ref={lockupRef}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          transform:
            phase === 'enter'
              ? 'scale(3)'
              : phase === 'fly' || phase === 'fade'
                ? flyTransform
                : 'none',
          transition:
            phase === 'fly' || phase === 'fade'
              ? 'transform 880ms cubic-bezier(.16,1,.3,1)'
              : undefined,
        }}
      >
        {/* Logo "M" square */}
        <div
          style={{
            width: 36,
            height: 36,
            background: T.accent,
            borderRadius: 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 800,
              fontSize: 20,
              color: T.bg,
              lineHeight: 1,
            }}
          >
            M
          </span>
        </div>

        {/* Text lockup */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          {/* "MIT Tech Studio" with staggered character reveal */}
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 700,
              fontSize: 20,
              color: T.ink,
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
              display: 'flex',
            }}
          >
            {studioChars.map((ch, i) => (
              <span
                key={i}
                style={{
                  display: 'inline-block',
                  overflow: 'hidden',
                }}
              >
                <span
                  className="intro-char"
                  style={{
                    display: 'inline-block',
                    animation: `introCharReveal 0.7s cubic-bezier(.2,.86,.24,1.04) ${360 + i * 42}ms both`,
                    whiteSpace: ch === ' ' ? 'pre' : undefined,
                  }}
                >
                  {ch}
                </span>
              </span>
            ))}
          </span>

          {/* Subtitle */}
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              color: T.sub,
              letterSpacing: '0.06em',
              textTransform: 'uppercase' as const,
              opacity: 0,
              animation: 'introSubFade 0.6s ease 900ms both',
            }}
          >
            Tokyo · since 2025
          </span>
        </div>
      </div>

      <style>{`
        @keyframes introCharReveal {
          0% { transform: translateY(116%); }
          100% { transform: translateY(0); }
        }
        @keyframes introSubFade {
          0% { opacity: 0; transform: translateY(6px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
