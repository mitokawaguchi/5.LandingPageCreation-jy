'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { HERO_META } from '@/data/site-content';

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
        className="studio-container"
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
            gap: 16,
            marginBottom: 56,
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            color: T.sub,
            letterSpacing: 0.4,
            flexWrap: 'wrap',
          }}
        >
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            {/* Accent pulse dot */}
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: 3,
                background: T.accent,
                boxShadow: `0 0 8px ${T.accent}`,
                animation: 'studioPulse 1.6s ease-in-out infinite',
              }}
            />
            {/* Badge */}
            <span
              style={{
                color: T.accent,
                fontFamily: 'var(--font-sans)',
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: '-0.005em',
              }}
            >
              {t('badge')}
            </span>
          </span>
          <span style={{ color: T.dim }}>/</span>
          <span>{HERO_META.thesis}</span>
          {/* Flexible rule */}
          <span
            style={{
              flex: 1,
              minHeight: 1,
              background: T.border,
              alignSelf: 'center',
            }}
          />
          <span>
            <span style={{ color: T.dim }}>v</span> 6.0.0
          </span>
          <span style={{ color: T.dim }}>·</span>
          <span>{HERO_META.handle}</span>
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

          <h1
            style={{
              margin: 0,
              fontFamily: 'var(--font-sans)',
              color: T.ink,
              fontSize: 'clamp(96px, 11vw, 184px)',
              fontWeight: 700,
              letterSpacing: '-0.055em',
              lineHeight: 0.9,
              maxWidth: '13ch',
              position: 'relative',
            }}
          >
            {/* Line 1 */}
            <span style={{ display: 'block' }}>{renderChars(line1, 0)}</span>

            {/* Line 2 */}
            <span
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 22,
                margin: '14px 0 10px',
                paddingLeft: '0.08em',
              }}
            >
              <span
                style={{
                  fontStyle: 'italic',
                  fontWeight: 400,
                  color: T.ink,
                  fontSize: '0.6em',
                  letterSpacing: '-0.04em',
                  lineHeight: 1,
                  opacity: 0.62,
                }}
              >
                {renderChars(line2, 1)}
              </span>
              <span
                className="kt-rule"
                style={{
                  flex: 1,
                  height: 1,
                  background: T.border,
                  transform: 'scaleX(0)',
                  transformOrigin: 'left',
                  transition: 'transform 0.8s cubic-bezier(.16,1,.3,1)',
                }}
              />
            </span>

            {/* Line 3 */}
            <span
              style={{
                position: 'relative',
                display: 'inline-block',
                color: T.accent,
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
          className="hero-type-grid"
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
              letterSpacing: '-0.004em',
            }}
          >
            {t('subtitle')}
          </p>

          {/* Right: CTA group */}
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
            <a
              href="#works"
              onClick={handleScrollToWorks}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                padding: '16px 24px',
                background: T.accent,
                color: '#0a0c10',
                fontFamily: 'var(--font-sans)',
                fontSize: 14,
                fontWeight: 600,
                letterSpacing: '-0.005em',
                textDecoration: 'none',
                cursor: 'pointer',
                position: 'relative',
                transition: 'transform .15s, box-shadow .15s',
              }}
            >
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, opacity: 0.65 }}>▸</span>
              {t('viewWorks')}
            </a>
            <a
              href="#about"
              onClick={handleScrollToAbout}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                padding: '16px 24px',
                border: `1px solid ${T.border}`,
                color: T.ink,
                fontFamily: 'var(--font-sans)',
                fontSize: 14,
                fontWeight: 500,
                textDecoration: 'none',
                cursor: 'pointer',
                transition: 'border-color .15s, background .15s',
              }}
            >
              {t('learnMore')}
            </a>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                marginLeft: 8,
                fontFamily: 'var(--font-sans)',
                fontSize: 12,
                color: T.sub,
                letterSpacing: '-0.003em',
              }}
            >
              <span>or press</span>
              <span
                style={{
                  padding: '4px 9px',
                  border: `1px solid ${T.border}`,
                  borderRadius: 4,
                  color: T.ink,
                  fontFamily: 'var(--font-sans)',
                  fontSize: 11,
                  fontWeight: 500,
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                ⌘K
              </span>
              <span style={{ color: T.dim }}>/</span>
              <span
                style={{
                  padding: '4px 9px',
                  border: `1px solid ${T.border}`,
                  borderRadius: 4,
                  color: T.ink,
                  fontFamily: 'var(--font-sans)',
                  fontSize: 11,
                  fontWeight: 500,
                }}
              >
                Ctrl K
              </span>
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
