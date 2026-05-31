'use client';

import React, { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

const livePhrases = [
  'Design system tuning in progress.',
  'Shipping small, polished improvements.',
  'Accessibility and performance first.',
  'Building the next iteration.',
  'Fine-tuning motion and spacing.',
] as const;

export function HeroSection() {
  const t = useTranslations('hero');
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }
    const timer = window.setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % livePhrases.length);
    }, 2400);
    return () => window.clearInterval(timer);
  }, []);

  const handleScrollToWorks = (e: React.MouseEvent) => {
    e.preventDefault();
    document.querySelector('#works')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToAbout = (e: React.MouseEvent) => {
    e.preventDefault();
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        background: '#06070a',
        padding: '180px 56px',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 1320,
          margin: '0 auto',
        }}
      >
        {/* Hero Meta Strip */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            marginBottom: 48,
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            color: '#8a93a0',
          }}
        >
          {/* Green pulse dot */}
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: '50%',
              background: '#69e6a6',
              boxShadow: '0 0 6px #69e6a6',
              animation: 'heroPulse 2s infinite',
              flexShrink: 0,
            }}
          />
          {/* Badge */}
          <span
            style={{
              padding: '3px 10px',
              borderRadius: 4,
              background: '#13171e',
              border: '1px solid #1a1f28',
              color: '#e9edf2',
              fontSize: 11,
              fontFamily: 'var(--font-mono)',
            }}
          >
            {t('badge')}
          </span>
          <span style={{ color: '#3d4654' }}>·</span>
          <span>OVR-001 · primary thesis</span>
          {/* Horizontal rule */}
          <span
            style={{
              flex: 1,
              height: 1,
              background: '#1a1f28',
              margin: '0 8px',
            }}
          />
          <span>v 6.0.0</span>
          <span style={{ color: '#3d4654' }}>·</span>
          <span>mitokawaguchi</span>
        </div>

        {/* Main Headline */}
        <h1
          style={{
            margin: 0,
            padding: 0,
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
          }}
        >
          <span
            style={{
              display: 'block',
              fontFamily: 'var(--font-sans)',
              fontWeight: 800,
              fontSize: 'clamp(3.5rem, 8vw, 7rem)',
              color: '#e9edf2',
            }}
          >
            {t('line1')}
          </span>
          <span
            style={{
              display: 'block',
              fontFamily: 'var(--font-sans)',
              fontWeight: 500,
              fontSize: 'clamp(1.5rem, 3.5vw, 3rem)',
              color: '#8a93a0',
              margin: '8px 0',
            }}
          >
            {t('line2')}
          </span>
          <span
            style={{
              display: 'block',
              fontFamily: 'var(--font-sans)',
              fontWeight: 800,
              fontSize: 'clamp(3.5rem, 8vw, 7rem)',
              color: '#e9edf2',
            }}
          >
            {t('line3')}
          </span>
        </h1>

        {/* Subtitle */}
        <p
          style={{
            maxWidth: 560,
            margin: '32px 0 0',
            fontFamily: 'var(--font-sans)',
            fontSize: 17,
            lineHeight: 1.7,
            color: '#8a93a0',
            fontWeight: 400,
          }}
        >
          {t('subtitle')}
        </p>

        {/* CTA Group */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            marginTop: 40,
            flexWrap: 'wrap',
          }}
        >
          <a
            href="#works"
            onClick={handleScrollToWorks}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: '#b5fb6b',
              color: '#06070a',
              fontFamily: 'var(--font-sans)',
              fontSize: 14,
              fontWeight: 600,
              padding: '12px 28px',
              borderRadius: 8,
              textDecoration: 'none',
              transition: 'opacity .2s, transform .15s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.9'; }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
          >
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
              color: '#e9edf2',
              fontFamily: 'var(--font-sans)',
              fontSize: 14,
              fontWeight: 500,
              padding: '12px 28px',
              borderRadius: 8,
              border: '1px solid #252b35',
              textDecoration: 'none',
              transition: 'border-color .2s, background .2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#b5fb6b';
              e.currentTarget.style.background = 'rgba(181,251,107,0.04)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#252b35';
              e.currentTarget.style.background = 'transparent';
            }}
          >
            {t('learnMore')}
          </a>
        </div>

        {/* Live rotating phrases */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            marginTop: 32,
            padding: '6px 14px',
            borderRadius: 6,
            background: '#0a0c10',
            border: '1px solid #1a1f28',
            fontFamily: 'var(--font-mono)',
            fontSize: 12,
            color: '#8a93a0',
          }}
        >
          <span
            style={{
              width: 5,
              height: 5,
              borderRadius: '50%',
              background: '#b5fb6b',
              animation: 'heroPulse 2s infinite',
              flexShrink: 0,
            }}
          />
          <span
            key={phraseIndex}
            style={{
              animation: 'phraseFadeIn 0.4s ease',
            }}
          >
            {livePhrases[phraseIndex]}
          </span>
        </div>
      </div>

      {/* Section number watermark */}
      <span
        style={{
          position: 'absolute',
          top: 56,
          right: 56,
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          color: '#3d4654',
          letterSpacing: '0.05em',
        }}
      >
        §01
      </span>

      <style>{`
        @keyframes heroPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        @keyframes phraseFadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
