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
// How much larger than the docked nav logo the opening lockup sits.
const BIG = 3;

export function StudioIntro({ onExitStart, onDone }: StudioIntroProps) {
  const [phase, setPhase] = useState<'enter' | 'fly' | 'fade' | 'done'>('enter');
  const lockupRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLDivElement>(null);
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

    // Compute fly transform to nav logo dock.
    //
    // Position: align the lockup CENTER to the dock center. The lockup is
    // scaled with transform-origin:center, so its center is invariant under
    // scaling — measuring it at scale(BIG) gives the right target for any
    // final scale.
    //
    // Scale: derive from the "M" mark, not the whole lockup. The mark has an
    // identical 36px base in both the intro lockup and the nav dock, so this
    // resolves to ~1.0 regardless of sub-pixel text-width differences — the
    // docked logo ends at exactly the nav logo's size with no visible pop.
    const dock = document.querySelector<HTMLElement>('[data-logo-dock]');
    const dockMark = dock?.firstElementChild as HTMLElement | undefined;
    const lockup = lockupRef.current;
    const mark = markRef.current;

    if (dock && dockMark && lockup && mark) {
      const dockRect = dock.getBoundingClientRect();
      const lockupRect = lockup.getBoundingClientRect();
      const dockMarkRect = dockMark.getBoundingClientRect();
      const markRect = mark.getBoundingClientRect();

      const naturalMark = markRect.width / BIG;
      const s = naturalMark > 0 ? dockMarkRect.width / naturalMark : 1;

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

  // Per-character reveal timing. The subtitle ("Tokyo · since 2025") only
  // starts once the final "o" of "MIT Tech Studio" has emerged.
  const CHAR_BASE = 360;
  const CHAR_STEP = 42;
  const lastCharDelay = CHAR_BASE + (studioChars.length - 1) * CHAR_STEP;
  const subDelay = lastCharDelay + 140;

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
          gap: 10,
          transformOrigin: 'center center',
          transform:
            phase === 'enter'
              ? `scale(${BIG})`
              : phase === 'fly' || phase === 'fade'
                ? flyTransform
                : 'none',
          transition:
            phase === 'fly' || phase === 'fade'
              ? 'transform 880ms cubic-bezier(.16,1,.3,1)'
              : undefined,
        }}
      >
        {/* Logo "M" square — matches the nav dock exactly */}
        <div
          ref={markRef}
          style={{
            width: 36,
            height: 36,
            background: T.accent,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            fontFamily: 'var(--font-mono)',
            fontWeight: 800,
            fontSize: 18,
            color: T.bg,
            lineHeight: 1,
          }}
        >
          M
        </div>

        {/* Text lockup */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            lineHeight: 1.2,
          }}
        >
          {/* "MIT Tech Studio" with staggered character reveal */}
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 600,
              fontSize: 15,
              color: T.ink,
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
                    animation: `introCharReveal 0.7s cubic-bezier(.2,.86,.24,1.04) ${CHAR_BASE + i * CHAR_STEP}ms both`,
                    whiteSpace: ch === ' ' ? 'pre' : undefined,
                  }}
                >
                  {ch}
                </span>
              </span>
            ))}
          </span>

          {/* Subtitle — matches the nav dock exactly */}
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
              color: T.sub,
              opacity: 0,
              animation: `introSubFade 0.6s ease ${subDelay}ms both`,
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
