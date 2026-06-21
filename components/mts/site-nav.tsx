'use client';

import type { MouseEvent } from 'react';
import { NAV_LINKS, CONTACT_EMAIL } from '@/data/landing-content';
import { LanguageSwitcher } from '@/components/language-switcher';
import { LogoMark } from './logo';
import { sans, mono } from './tokens';

const MAIL_ICON =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath fill='%23ffb648' d='M2 5a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5zm2 1.2V18h16V6.2l-8 5-8-5z'/%3E%3C/svg%3E";

type SiteNavProps = { onToggleMenu: () => void };

export function SiteNav({ onToggleMenu }: SiteNavProps) {
  const goHome = (e: MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px clamp(20px,5vw,56px)',
        background: 'rgba(7,8,11,.72)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        borderBottom: '1px solid #14181f',
      }}
    >
      <a href="#home" onClick={goHome} style={{ display: 'flex', alignItems: 'center', gap: 13, textDecoration: 'none', color: 'inherit' }}>
        <span id="navLogoMark" style={{ display: 'inline-flex', width: 32, height: 32, alignItems: 'center', justifyContent: 'center' }}>
          <LogoMark width={34} height={28} />
        </span>
        <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
          <span style={{ fontWeight: 700, fontSize: 14, letterSpacing: '-0.01em' }}>MIT Tech Studio</span>
          <span style={{ fontFamily: mono, fontSize: 10, color: '#5b6471', letterSpacing: '.06em', marginTop: 3 }}>rev.07 · tokyo</span>
        </span>
      </a>

      <div className="nav-links" style={{ alignItems: 'center', gap: 6 }}>
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="nav-link"
            style={{ textDecoration: 'none', color: '#aab2bd', fontSize: 14, fontWeight: 500, padding: '9px 14px 11px', borderRadius: 8, transition: 'color .2s, background .2s' }}
          >
            {link.label}
          </a>
        ))}
        <LanguageSwitcher />
        <div className="cm-wrap" style={{ marginLeft: 10 }}>
          <a
            href="#contact"
            style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8, background: 'var(--accent)', color: '#0c0e12', fontWeight: 600, fontSize: 14, padding: '10px 18px', borderRadius: 9, transition: 'transform .15s, box-shadow .2s' }}
          >
            お問い合わせ
          </a>
          <div className="cm-pop">
            <a href={`mailto:${CONTACT_EMAIL}`} className="cm-item">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={MAIL_ICON} alt="Email" />
              <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.25, minWidth: 0 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#cfd5dd' }}>メール</span>
                <span style={{ fontFamily: mono, fontSize: 10, color: '#6b7480', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{CONTACT_EMAIL}</span>
              </span>
            </a>
            {[
              ['https://github.com/mitokawaguchi', 'https://cdn.simpleicons.org/github/e9edf2', 'GitHub'],
              ['https://x.com/mito_112_', 'https://cdn.simpleicons.org/x/e9edf2', 'X'],
              ['https://zenn.dev/mitokawaguchi', 'https://cdn.simpleicons.org/zenn/3EA8FF', 'Zenn'],
            ].map(([url, icon, label]) => (
              <a key={label} href={url} target="_blank" rel="noreferrer" className="cm-item">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={icon} alt={label} />
                <span style={{ fontSize: 13, fontWeight: 500, color: '#cfd5dd' }}>{label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <button
        type="button"
        className="nav-burger"
        onClick={onToggleMenu}
        aria-label="メニューを開く"
        style={{ width: 42, height: 42, alignItems: 'center', justifyContent: 'center', background: '#10141a', border: '1px solid #1b1f27', borderRadius: 10, cursor: 'pointer', fontFamily: sans }}
      >
        <span style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
          <span style={{ width: 18, height: 2, background: '#cfd5dd', borderRadius: 2 }} />
          <span style={{ width: 18, height: 2, background: '#cfd5dd', borderRadius: 2 }} />
        </span>
      </button>
    </nav>
  );
}
