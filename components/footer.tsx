'use client';

/* ─── Design Tokens ─── */
const t = {
  bg: '#06070a',
  surface: '#0a0c10',
  surface2: '#0e1116',
  surface3: '#13171e',
  border: '#1a1f28',
  ink: '#e9edf2',
  sub: '#8a93a0',
  dim: '#3d4654',
  accent: '#b5fb6b',
  warn: '#ffb648',
  pink: '#ff5da2',
  blue: '#5ecfff',
  green: '#69e6a6',
  purple: '#b48cff',
} as const;

/* ─── Pixel Monogram SVG (5x5 "M" shape) ─── */
function PixelMonogram() {
  // 5x5 grid representing "M"
  const grid = [
    [1, 0, 0, 0, 1],
    [1, 1, 0, 1, 1],
    [1, 0, 1, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
  ];
  const size = 8;
  const gap = 3;

  return (
    <svg
      width={(size + gap) * 5 - gap}
      height={(size + gap) * 5 - gap}
      viewBox={`0 0 ${(size + gap) * 5 - gap} ${(size + gap) * 5 - gap}`}
      style={{ display: 'block' }}
    >
      {grid.map((row, y) =>
        row.map((cell, x) =>
          cell === 1 ? (
            <rect
              key={`${x}-${y}`}
              x={x * (size + gap)}
              y={y * (size + gap)}
              width={size}
              height={size}
              fill={t.accent}
              rx={1}
            />
          ) : null
        )
      )}
    </svg>
  );
}

/* ─── Footer Links Data ─── */
const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Works', href: '#works' },
  { label: 'Writing', href: '#articles' },
  { label: 'Contact', href: '#contact' },
];

const LEGAL_LINKS = [
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Disclaimer', href: '/disclaimer' },
  { label: 'Tokushoho', href: '/tokushoho' },
];

const STACK_ITEMS = [
  'Next.js 15',
  'React 19',
  'TypeScript 5.7',
  'Vercel',
  'GitHub Actions',
];

/* ─── Main Footer ─── */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{ background: t.surface2, borderTop: `1px solid ${t.border}` }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '80px 56px 48px' }}>
        {/* Wordmark */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 64 }}>
          <PixelMonogram />
          <span style={{
            fontSize: 'clamp(24px, 4vw, 48px)',
            fontWeight: 800,
            color: t.ink,
            fontFamily: 'var(--font-mono)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}>
            MIT TECH STUDIO
          </span>
        </div>

        {/* Colophon row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 1,
          background: t.border,
          borderRadius: 10,
          overflow: 'hidden',
          marginBottom: 56,
        }}>
          {[
            { label: 'Set in', value: 'Geist · Geist Mono · Noto Sans JP' },
            { label: 'Printed on', value: '12-col CSS Grid · 1320px · 20 gap' },
            { label: 'Built in', value: 'Tokyo · 35.68°N / 139.69°E' },
            { label: 'Revision', value: 'rev. 06 · MMXXVI' },
          ].map((item) => (
            <div key={item.label} style={{ background: t.surface, padding: '20px 24px' }}>
              <span style={{
                display: 'block',
                fontSize: 10,
                color: t.dim,
                fontFamily: 'var(--font-mono)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom: 6,
              }}>
                {item.label}
              </span>
              <span style={{
                fontSize: 12,
                color: t.sub,
                fontFamily: 'var(--font-mono)',
                lineHeight: 1.5,
              }}>
                {item.value}
              </span>
            </div>
          ))}
        </div>

        {/* Footer links (3-col) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 48, marginBottom: 56 }}>
          {/* Studio nav */}
          <div>
            <span style={{ display: 'block', fontSize: 10, color: t.dim, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }}>
              Studio
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  style={{
                    fontSize: 13,
                    color: t.sub,
                    fontFamily: 'var(--font-mono)',
                    textDecoration: 'none',
                    transition: 'color 0.2s',
                  }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Legal */}
          <div>
            <span style={{ display: 'block', fontSize: 10, color: t.dim, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }}>
              Legal
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {LEGAL_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  style={{
                    fontSize: 13,
                    color: t.sub,
                    fontFamily: 'var(--font-mono)',
                    textDecoration: 'none',
                    transition: 'color 0.2s',
                  }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Stack */}
          <div>
            <span style={{ display: 'block', fontSize: 10, color: t.dim, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }}>
              Stack
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {STACK_ITEMS.map((item) => (
                <span
                  key={item}
                  style={{
                    fontSize: 13,
                    color: t.sub,
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: `1px solid ${t.border}`,
          paddingTop: 24,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 16,
        }}>
          {/* System status */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: t.green, animation: 'footer-pulse 2s infinite' }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: t.dim }}>
              All systems operational
            </span>
          </div>

          {/* Build info */}
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: t.dim }}>
            Next.js 15 · Deployed on Vercel · Build #{Math.floor(Math.random() * 900 + 100)}
          </span>

          {/* Copyright */}
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: t.dim }}>
            &copy; {year} MIT Tech Studio. All rights reserved.
          </span>
        </div>
      </div>

      <style>{`
        @keyframes footer-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </footer>
  );
}
