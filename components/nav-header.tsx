'use client';

import React, { useEffect, useState } from 'react';

const NAV_LINKS = ['Studio', 'Works', 'Lab', 'Notes', 'Contact'] as const;

export function NavHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      style={{
        position: 'sticky',
        top: 36,
        zIndex: 100,
        height: 72,
        display: 'flex',
        alignItems: 'center',
        background: 'rgba(6,7,10,.85)',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: '1px solid #1a1f28',
        padding: '0 56px',
        maxWidth: '100%',
        transition: 'backdrop-filter .3s ease',
      }}
    >
      <nav
        style={{
          width: '100%',
          maxWidth: 1320,
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo */}
        <div data-logo-dock style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 4,
              background: '#b5fb6b',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--font-mono)',
              fontWeight: 700,
              fontSize: 16,
              color: '#06070a',
            }}
          >
            M
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontWeight: 700,
                fontSize: 14,
                color: '#e9edf2',
                letterSpacing: '-0.01em',
              }}
            >
              MIT Tech Studio
            </span>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 10,
                color: '#8a93a0',
                letterSpacing: '0.02em',
              }}
            >
              Tokyo · since 2025
            </span>
          </div>
        </div>

        {/* Center nav links */}
        <ul
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 32,
            listStyle: 'none',
            margin: 0,
            padding: 0,
          }}
        >
          {NAV_LINKS.map((label) => (
            <li key={label}>
              <a
                href={`#${label.toLowerCase()}`}
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 13,
                  fontWeight: 500,
                  color: '#8a93a0',
                  textDecoration: 'none',
                  transition: 'color .2s',
                  position: 'relative',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#e9edf2';
                  e.currentTarget.style.textDecoration = 'underline';
                  e.currentTarget.style.textUnderlineOffset = '4px';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#8a93a0';
                  e.currentTarget.style.textDecoration = 'none';
                }}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="#contact"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            background: '#b5fb6b',
            color: '#06070a',
            fontFamily: 'var(--font-sans)',
            fontSize: 13,
            fontWeight: 600,
            padding: '8px 18px',
            borderRadius: 6,
            textDecoration: 'none',
            transition: 'opacity .2s',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.85'; }}
          onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
        >
          <span style={{ fontSize: 14 }}>↗</span> Contact
        </a>
      </nav>
    </header>
  );
}
