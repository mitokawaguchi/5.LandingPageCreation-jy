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
    <div style={{ borderBottom: `1px solid ${T.border}` }}>
      <div className="studio-container" style={{
        maxWidth: 1320,
        margin: '0 auto',
        padding: '0 56px',
        display: 'flex',
        alignItems: 'center',
        height: 72,
      }}>
        {/* Logo dock */}
        <div data-logo-dock style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <span style={{
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
          }}>
            M
          </span>
          <div>
            <div style={{ fontFamily: 'var(--font-sans)', fontSize: 15, fontWeight: 600, color: T.ink, letterSpacing: '-0.01em' }}>
              MIT Tech Studio
            </div>
            <div style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: T.sub, letterSpacing: '-0.005em' }}>
              Tokyo · since 2025
            </div>
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
                fontFamily: 'var(--font-sans)',
                fontSize: 14,
                color: T.sub,
                textDecoration: 'none',
                borderRadius: 4,
                transition: 'color .15s, background .15s',
              }}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* CTA */}
        <div className="nav-cta" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <a
            href="#contact"
            className="studio-cta-primary"
            style={{
              padding: '10px 18px',
              background: T.accent,
              color: '#0a0c10',
              fontFamily: 'var(--font-sans)',
              fontSize: 13,
              fontWeight: 600,
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            ↗ Contact
          </a>
        </div>
      </div>
    </div>
  );
}
