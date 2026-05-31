'use client';

/* ─── Design Tokens ─── */
const T = { bg:'#06070a', surface:'#0a0c10', surface2:'#0e1116', surface3:'#13171e', border:'#1a1f28', borderStrong:'#252b35', ink:'#e9edf2', sub:'#8a93a0', dim:'#3d4654', accent:'#b5fb6b', accentDim:'#7da848', warn:'#ffb648', pink:'#ff5da2', blue:'#5ecfff', green:'#69e6a6', red:'#ff5a64', purple:'#b48cff' };

const NAV_LINKS: { label: string; href: string }[] = [
  { label: 'Studio', href: '#about' },
  { label: 'Works', href: '#works' },
  { label: 'Lab', href: '#lab' },
  { label: 'Notes', href: '#writing' },
  { label: 'Contact', href: '#contact' },
];

export function NavHeader() {
  return (
    <header style={{ borderBottom: `1px solid ${T.border}` }}>
      <div className="studio-container" style={{
        maxWidth: 1320,
        margin: '0 auto',
        padding: '0 56px',
        display: 'flex',
        alignItems: 'center',
        height: 72,
      }}>
        {/* Logo */}
        <div data-logo-dock style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 36,
            height: 36,
            background: T.accent,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'var(--font-mono)',
            fontWeight: 800,
            fontSize: 18,
            color: '#06070a',
          }}>
            M
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
            <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 15, color: T.ink }}>
              MIT Tech Studio
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: T.sub }}>
              Tokyo · since 2025
            </span>
          </div>
        </div>

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Center nav */}
        <div className="nav-links" style={{ display: 'flex', gap: 4 }}>
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="studio-nav-link"
              style={{
                padding: '8px 14px',
                fontSize: 14,
                color: T.sub,
                textDecoration: 'none',
                borderRadius: 4,
                transition: 'color 0.2s, background 0.2s',
                fontFamily: 'var(--font-sans)',
              }}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* CTA */}
        <a
          href="#contact"
          className="studio-cta-primary"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            background: T.accent,
            color: '#06070a',
            fontFamily: 'var(--font-sans)',
            fontSize: 13,
            fontWeight: 600,
            padding: '10px 18px',
            textDecoration: 'none',
            transition: 'opacity 0.2s',
          }}
        >
          ↗ Contact
        </a>
      </div>
    </header>
  );
}
