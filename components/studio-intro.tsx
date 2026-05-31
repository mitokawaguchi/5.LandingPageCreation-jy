'use client';

import React, { useEffect, useState, useCallback } from 'react';

interface StudioIntroProps {
  onDone: () => void;
}

export function StudioIntro({ onDone }: StudioIntroProps) {
  const [phase, setPhase] = useState<'enter' | 'fly' | 'done'>('enter');

  const triggerFly = useCallback(() => {
    if (phase === 'enter') {
      setPhase('fly');
    }
  }, [phase]);

  // Auto-transition after 2.6s
  useEffect(() => {
    const timer = setTimeout(triggerFly, 2600);
    return () => clearTimeout(timer);
  }, [triggerFly]);

  // User interaction shortcut
  useEffect(() => {
    const handleInteraction = () => triggerFly();
    window.addEventListener('click', handleInteraction);
    window.addEventListener('keydown', handleInteraction);
    window.addEventListener('touchstart', handleInteraction);
    return () => {
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
    };
  }, [triggerFly]);

  // Call onDone after fly animation completes
  useEffect(() => {
    if (phase === 'fly') {
      const timer = setTimeout(() => {
        setPhase('done');
        onDone();
      }, 900);
      return () => clearTimeout(timer);
    }
  }, [phase, onDone]);

  if (phase === 'done') return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#06070a',
        opacity: phase === 'fly' ? 0 : 1,
        transition: 'opacity 0.7s ease 0.2s',
        pointerEvents: phase === 'fly' ? 'none' : 'auto',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          transform:
            phase === 'enter'
              ? 'scale(1) translate(0, 0)'
              : 'scale(0.45) translate(-60vw, -44vh)',
          opacity: phase === 'enter' ? 1 : 0.6,
          transition: 'transform 0.8s cubic-bezier(0.16,1,0.3,1), opacity 0.6s ease',
        }}
      >
        {/* Logo "M" square */}
        <div
          style={{
            width: '56px',
            height: '56px',
            background: '#b5fb6b',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: phase === 'enter' ? 1 : 1,
            transform: phase === 'enter' ? 'scale(1)' : 'scale(1)',
            animation: phase === 'enter' ? 'intro-pop 0.6s cubic-bezier(0.16,1,0.3,1) both' : undefined,
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 800,
              fontSize: '1.75rem',
              color: '#06070a',
              lineHeight: 1,
            }}
          >
            M
          </span>
        </div>

        {/* Studio text */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2px',
            opacity: phase === 'enter' ? 1 : 1,
            animation: phase === 'enter' ? 'intro-slide 0.6s cubic-bezier(0.16,1,0.3,1) 0.2s both' : undefined,
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontWeight: 700,
              fontSize: '1.5rem',
              color: '#e9edf2',
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
            }}
          >
            MIT Tech Studio
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6875rem',
              color: '#8a93a0',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
            }}
          >
            Datapunk v2
          </span>
        </div>
      </div>

      <style>{`
        @keyframes intro-pop {
          0% { transform: scale(0) rotate(-8deg); opacity: 0; }
          100% { transform: scale(1) rotate(0deg); opacity: 1; }
        }
        @keyframes intro-slide {
          0% { transform: translateX(-12px); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
