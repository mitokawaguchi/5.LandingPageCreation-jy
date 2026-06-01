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
  const [shown, setShown] = useState(false);     // entrance played
  const [exiting, setExiting] = useState(false);  // lockup flies to nav dock
  const [fading, setFading] = useState(false);    // overlay clears + page surfaces
  const [dock, setDock] = useState<string | null>(null); // transform that lands on nav
  const lockRef = useRef<HTMLDivElement>(null);
  const doneRef = useRef(false);
  const prevOverflowRef = useRef('');

  // Low-power / reduced-motion: drop the heavier blur + glow compositing.
  const liteRef = useRef(false);
  if (typeof window !== 'undefined' && !liteRef.current) {
    liteRef.current =
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ||
      window.matchMedia?.('(max-width: 820px)').matches ||
      'ontouchstart' in window;
  }
  const lite = liteRef.current;

  // Keep the latest callbacks in refs so the exit logic can stay dependency-free.
  const onExitStartRef = useRef(onExitStart);
  const onDoneRef = useRef(onDone);
  onExitStartRef.current = onExitStart;
  onDoneRef.current = onDone;

  const finish = useCallback(() => {
    if (doneRef.current) return;
    doneRef.current = true;
    // Measure the nav logo and compute the transform that docks onto it.
    requestAnimationFrame(() => {
      const lock = lockRef.current;
      const target = document.querySelector<HTMLElement>('[data-logo-dock]');
      if (lock && target) {
        const ir = lock.getBoundingClientRect();
        const tr = target.getBoundingClientRect();
        const dx = (tr.left + tr.width / 2) - (ir.left + ir.width / 2);
        const dy = (tr.top + tr.height / 2) - (ir.top + ir.height / 2);
        const natural = ir.width / BIG; // size at scale 1
        const sc = natural > 0 ? tr.width / natural : 1;
        setDock(`translate(${dx}px, ${dy}px) scale(${sc})`);
      } else {
        setDock('scale(1)');
      }
      setExiting(true);
    });
    const FLY = 880;   // logo flight to the nav slot (slow drift, then snap)
    const SURF = 560;  // page surfacing out of blur (kept brief)
    // once the logo has arrived, the page emerges from blur behind it
    setTimeout(() => { setFading(true); onExitStartRef.current?.(); }, FLY);
    setTimeout(() => { onDoneRef.current?.(); }, FLY + SURF);
  }, []);

  useEffect(() => {
    prevOverflowRef.current = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.scrollTo(0, 0);
    const raf = requestAnimationFrame(() => setShown(true));
    const auto = setTimeout(finish, 2600);
    // skip — armed after a beat so a stray scroll/tap can't kill it instantly
    let armed = false;
    const arm = setTimeout(() => { armed = true; }, 1200);
    const skip = () => { if (armed) finish(); };
    window.addEventListener('keydown', skip);
    window.addEventListener('wheel', skip, { passive: true });
    window.addEventListener('touchmove', skip, { passive: true });
    window.addEventListener('pointerdown', skip);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(auto);
      clearTimeout(arm);
      window.removeEventListener('keydown', skip);
      window.removeEventListener('wheel', skip);
      window.removeEventListener('touchmove', skip);
      window.removeEventListener('pointerdown', skip);
      document.body.style.overflow = prevOverflowRef.current;
    };
  }, [finish]);

  // Release the scroll lock the instant the page starts surfacing.
  useEffect(() => {
    if (fading) document.body.style.overflow = prevOverflowRef.current || '';
  }, [fading]);

  const studioChars = [...STUDIO_NAME];
  const subDelay = 360 + STUDIO_NAME.length * 42 + 120;

  // lockup transform: big while open, docked transform on exit
  const lockTransform = exiting && dock ? dock : `scale(${shown ? BIG : BIG * 0.82})`;

  return (
    <div
      className={'intro-overlay' + (fading ? ' out' : '')}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: exiting || fading ? 'none' : 'auto',
      }}
    >
      <div
        ref={lockRef}
        className="intro-lock"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          transformOrigin: 'center center',
          transform: lockTransform,
          opacity: shown ? 1 : 0,
          transition: exiting
            ? 'transform .88s cubic-bezier(.72,0,.84,.15), opacity .88s ease'
            : 'transform .7s cubic-bezier(.16,1,.3,1), opacity .5s ease',
          willChange: 'transform, opacity',
        }}
      >
        {/* Logo "M" square — springs in with a soft overshoot + accent glow */}
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 36,
            height: 36,
            background: T.accent,
            color: '#0a0c10',
            fontWeight: 800,
            fontSize: 18,
            fontFamily: 'var(--font-sans)',
            lineHeight: 1,
            flexShrink: 0,
            transform: shown ? 'none' : 'scale(.5) rotate(-12deg)',
            transition: 'transform .6s cubic-bezier(.34,1.56,.5,1)',
            boxShadow: shown && !exiting && !lite ? `0 0 30px ${T.accent}66` : 'none',
          }}
        >
          M
        </span>

        <div>
          {/* "MIT Tech Studio" — masked letterpress rise, per-glyph focus-in */}
          <div
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 15,
              fontWeight: 600,
              color: T.ink,
              letterSpacing: '-0.01em',
              whiteSpace: 'nowrap',
            }}
          >
            {studioChars.map((ch, i) => {
              if (ch === ' ') {
                return (
                  <span key={i} style={{ display: 'inline-block', width: '0.28em' }}>
                    {' '}
                  </span>
                );
              }
              const delay = 360 + i * 42;
              return (
                <span
                  key={i}
                  style={{
                    display: 'inline-block',
                    overflow: 'hidden',
                    verticalAlign: 'bottom',
                    paddingBottom: '0.08em',
                    marginBottom: '-0.08em',
                  }}
                >
                  <span
                    style={{
                      display: 'inline-block',
                      transform: shown ? 'none' : 'translateY(116%)',
                      filter: shown || lite ? 'none' : 'blur(3px)',
                      opacity: shown ? 1 : 0,
                      transition: `transform .74s cubic-bezier(.2,.86,.24,1.04) ${delay}ms, opacity .5s ease ${delay}ms, filter .55s ease ${delay}ms`,
                      willChange: 'transform',
                    }}
                  >
                    {ch}
                  </span>
                </span>
              );
            })}
          </div>

          {/* Subtitle — matches the nav dock exactly */}
          <div
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 12,
              color: T.sub,
              letterSpacing: '-0.005em',
              opacity: shown ? 1 : 0,
              transform: shown ? 'none' : 'translateY(6px)',
              transition: `opacity .55s ease ${subDelay}ms, transform .6s cubic-bezier(.2,.8,.25,1) ${subDelay}ms`,
            }}
          >
            Tokyo · since 2025
          </div>
        </div>
      </div>
    </div>
  );
}
