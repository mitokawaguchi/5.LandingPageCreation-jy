'use client';

import { useRef, useState } from 'react';
import { NAV_LINKS } from '@/data/landing-content';
import { LandingStyles } from './landing-styles';
import { useLandingEffects } from './use-landing-effects';
import { Intro } from './intro';
import { Cursor } from './cursor';
import { SiteNav } from './site-nav';
import { Hero } from './hero';
import { About } from './about';
import { Works } from './works';
import { Writing } from './writing';
import { Contact } from './contact';
import { SiteFooter } from './site-footer';
import { sans } from './tokens';

function MobileMenu({ onClose }: { onClose: () => void }) {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 60,
        background: 'rgba(7,8,11,.97)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        display: 'flex',
        flexDirection: 'column',
        padding: '24px clamp(20px,6vw,40px)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 48 }}>
        <span style={{ fontWeight: 700, fontSize: 15, fontFamily: sans }}>MIT Tech Studio</span>
        <button
          type="button"
          onClick={onClose}
          aria-label="閉じる"
          style={{ width: 42, height: 42, background: '#10141a', border: '1px solid #1b1f27', borderRadius: 10, color: '#cfd5dd', fontSize: 20, cursor: 'pointer' }}
        >
          ×
        </button>
      </div>
      {NAV_LINKS.map((link) => (
        <a
          key={link.href}
          href={link.href}
          onClick={onClose}
          style={{ textDecoration: 'none', color: '#cfd5dd', fontSize: 34, fontWeight: 600, letterSpacing: '-0.02em', padding: '14px 0', borderBottom: '1px solid #14181f', fontFamily: sans }}
        >
          {link.label}
        </a>
      ))}
      <a
        href="#contact"
        onClick={onClose}
        style={{ marginTop: 'auto', textAlign: 'center', textDecoration: 'none', background: 'var(--accent)', color: '#0c0e12', fontWeight: 600, fontSize: 17, padding: 18, borderRadius: 12, fontFamily: sans }}
      >
        お問い合わせ →
      </a>
    </div>
  );
}

export function Landing() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  useLandingEffects(rootRef);

  return (
    <div
      ref={rootRef}
      className="dcx"
      style={{ fontFamily: sans, background: '#0c0e12', color: '#cfd5dd', minHeight: '100vh', overflowX: 'hidden' }}
    >
      <LandingStyles />
      <Intro />
      <Cursor />
      <SiteNav onToggleMenu={() => setMenuOpen((o) => !o)} />
      {menuOpen && <MobileMenu onClose={() => setMenuOpen(false)} />}
      <Hero />
      <About />
      <Works />
      <Writing />
      <Contact />
      <SiteFooter />
    </div>
  );
}
