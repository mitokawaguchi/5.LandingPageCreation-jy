'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';

const T = {
  bg: '#06070a', surface: '#0a0c10', surface2: '#0e1116', surface3: '#13171e',
  border: '#1a1f28', borderStrong: '#252b35', ink: '#e9edf2', sub: '#8a93a0',
  dim: '#3d4654', accent: '#b5fb6b', accentDim: '#7da848', warn: '#ffb648',
  pink: '#ff5da2', blue: '#5ecfff', green: '#69e6a6', red: '#ff5a64', purple: '#b48cff',
};

const LINE_BASE = [140, 520, 700];
const STEP = 34;

function splitChars(text: string) {
  return text.split('');
}

export function HeroSection() {
  const t = useTranslations('hero');
  const titleRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const [beamDone, setBeamDone] = useState(false);

  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPlaying(true);
          obs.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!playing) return;
    const el = titleRef.current;
    if (!el) return;
    const chars = el.querySelectorAll<HTMLSpanElement>('.kt-char');
    let maxDelay = 0;
    chars.forEach((c) => {
      const line = parseInt(c.dataset.line || '0', 10);
      const idx = parseInt(c.dataset.idx || '0', 10);
      const delay = LINE_BASE[line] + idx * STEP;
      if (delay > maxDelay) maxDelay = delay;
      setTimeout(() => c.classList.add('on'), delay);
    });
    // rule line
    const rule = el.querySelector<HTMLSpanElement>('.kt-rule');
    if (rule) {
      setTimeout(() => rule.classList.add('on'), LINE_BASE[1] + 200);
    }
    // beam done
    setTimeout(() => setBeamDone(true), maxDelay + 400);
  }, [playing]);

  const handleScrollToWorks = (e: React.MouseEvent) => {
    e.preventDefault();
    document.querySelector('#works')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToAbout = (e: React.MouseEvent) => {
    e.preventDefault();
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  };

  const line1 = t('line1');
  const line2 = t('line2');
  const line3 = t('line3');

  const renderChars = (text: string, lineIndex: number) =>
    splitChars(text).map((ch, i) => (
      <span
        key={`${lineIndex}-${i}`}
        className="kt-char"
        data-line={lineIndex}
        data-idx={i}
        style={{ display: 'inline-block', whiteSpace: ch === ' ' ? 'pre' : undefined }}
      >
        {ch}
      </span>
    ));

  return (
    <section
      id="home"
      style={{
        position: 'relative',
        background: T.bg,
        padding: '64px 0 160px',
      }}
    >
      <div
        style={{
          maxWidth: 1320,
          margin: '0 auto',
          padding: '0 56px',
        }}
      >
        {/* HeroMeta strip */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            marginBottom: 56,
            fontFamily: 'var(--font-mono)',
            fontSize: 13,
            color: T.sub,
          }}
        >
          {/* Green pulse dot */}
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: T.green,
              boxShadow: `0 0 6px ${T.green}`,
              animation: 'studioPulse 1.6s infinite',
              flexShrink: 0,
            }}
          />
          {/* Badge */}
          <span
            style={{
              color: T.accent,
              fontSize: 13,
              fontWeight: 600,
              fontFamily: 'var(--font-mono)',
            }}
          >
            {t('badge')}
          </span>
          <span style={{ color: T.dim }}>/</span>
          <span>OVR–001 · primary thesis</span>
          {/* Horizontal rule */}
          <span
            style={{
              flex: 1,
              height: 1,
              background: T.border,
            }}
          />
          <span>v 6.0.0</span>
          <span style={{ color: T.dim }}>·</span>
          <span>mitokawaguchi</span>
        </div>

        {/* KineticTitle */}
        <div ref={titleRef} style={{ position: 'relative' }}>
          {/* Beam */}
          {playing && !beamDone && (
            <div
              className="kt-beam"
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                height: 2,
                background: `linear-gradient(90deg, transparent, ${T.accent}, transparent)`,
                animation: 'ktBeam 1.1s ease-out forwards',
                zIndex: 2,
                pointerEvents: 'none',
              }}
            />
          )}

          <h1 style={{ margin: 0, padding: 0 }}>
            {/* Line 1 */}
            <span
              style={{
                display: 'block',
                fontFamily: 'var(--font-sans)',
                fontWeight: 700,
                fontSize: 'clamp(96px, 11vw, 184px)',
                color: T.ink,
                letterSpacing: '-0.055em',
                lineHeight: 0.9,
              }}
            >
              {renderChars(line1, 0)}
            </span>

            {/* Line 2 */}
            <span
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 24,
                fontFamily: 'var(--font-sans)',
                fontWeight: 400,
                fontStyle: 'italic',
                fontSize: 'clamp(57.6px, 6.6vw, 110.4px)',
                color: T.ink,
                opacity: 0.62,
                letterSpacing: '-0.055em',
                lineHeight: 0.9,
                margin: '8px 0',
              }}
            >
              <span>{renderChars(line2, 1)}</span>
              <span
                className="kt-rule"
                style={{
                  flex: 1,
                  height: 1,
                  background: T.borderStrong,
                  transform: 'scaleX(0)',
                  transformOrigin: 'left',
                  transition: 'transform 0.8s cubic-bezier(.16,1,.3,1)',
                }}
              />
            </span>

            {/* Line 3 */}
            <span
              style={{
                display: 'block',
                fontFamily: 'var(--font-sans)',
                fontWeight: 700,
                fontSize: 'clamp(96px, 11vw, 184px)',
                color: T.accent,
                letterSpacing: '-0.055em',
                lineHeight: 0.9,
                animation: playing ? 'ktGlow 3s ease-in-out infinite' : undefined,
              }}
            >
              {renderChars(line3, 2)}
              <span style={{ color: T.sub }}>.</span>
              <span
                className="kt-caret"
                style={{
                  display: 'inline-block',
                  width: 3,
                  height: '0.75em',
                  background: T.accent,
                  marginLeft: 4,
                  verticalAlign: 'baseline',
                  animation: 'ktCaret 1s step-end infinite',
                }}
              />
            </span>
          </h1>
        </div>

        {/* Subtitle + CTA layout */}
        <div
          style={{
            marginTop: 80,
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            gap: 64,
            alignItems: 'flex-end',
          }}
        >
          {/* Left: Subtitle */}
          <p
            style={{
              margin: 0,
              fontFamily: 'var(--font-sans)',
              fontSize: 19,
              lineHeight: 1.7,
              color: T.sub,
              maxWidth: 580,
              fontWeight: 400,
            }}
          >
            {t('subtitle')}
          </p>

          {/* Right: CTA group */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              gap: 12,
            }}
          >
            <div style={{ display: 'flex', gap: 12 }}>
              <a
                href="#works"
                onClick={handleScrollToWorks}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  background: T.accent,
                  color: T.bg,
                  fontFamily: 'var(--font-sans)',
                  fontSize: 14,
                  fontWeight: 600,
                  padding: '12px 28px',
                  borderRadius: 8,
                  textDecoration: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'opacity .2s, transform .15s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.9'; }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
              >
                <span style={{ fontFamily: 'var(--font-mono)', marginRight: 2 }}>▸</span>
                {t('viewWorks')}
              </a>
              <a
                href="#about"
                onClick={handleScrollToAbout}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  background: 'transparent',
                  color: T.ink,
                  fontFamily: 'var(--font-sans)',
                  fontSize: 14,
                  fontWeight: 500,
                  padding: '12px 28px',
                  borderRadius: 8,
                  border: `1px solid ${T.borderStrong}`,
                  textDecoration: 'none',
                  cursor: 'pointer',
                  transition: 'border-color .2s, background .2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = T.accent;
                  e.currentTarget.style.background = 'rgba(181,251,107,0.04)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = T.borderStrong;
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                {t('learnMore')}
              </a>
            </div>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 12,
                color: T.dim,
              }}
            >
              or press ⌘K / Ctrl K
            </span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes studioPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        .kt-char {
          opacity: 0;
          transform: translateY(0.30em) scaleY(1.32);
          filter: blur(9px);
          transform-origin: bottom;
          transition: opacity 0.5s cubic-bezier(.16,1,.3,1),
                      transform 0.6s cubic-bezier(.16,1,.3,1),
                      filter 0.5s cubic-bezier(.16,1,.3,1);
        }
        .kt-char.on {
          opacity: 1;
          transform: none;
          filter: blur(0);
        }
        .kt-rule.on {
          transform: scaleX(1) !important;
        }
        @keyframes ktGlow {
          0%, 100% { text-shadow: 0 0 0 transparent; }
          50% { text-shadow: 0 0 40px rgba(181,251,107,0.18), 0 0 80px rgba(181,251,107,0.08); }
        }
        @keyframes ktCaret {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes ktBeam {
          0% { top: 0; opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </section>
  );
}
