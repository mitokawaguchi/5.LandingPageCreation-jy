'use client';

/* ─── Design Tokens ─── */
const T = { bg:'#06070a', surface:'#0a0c10', surface2:'#0e1116', surface3:'#13171e', border:'#1a1f28', borderStrong:'#252b35', ink:'#e9edf2', sub:'#8a93a0', dim:'#3d4654', accent:'#b5fb6b', accentDim:'#7da848', warn:'#ffb648', pink:'#ff5da2', blue:'#5ecfff', green:'#69e6a6', red:'#ff5a64', purple:'#b48cff' };

/* ─── Link Data ─── */
const STUDIO_LINKS = [
  { label: 'Studio', href: '#about' },
  { label: 'Works', href: '#works' },
  { label: 'Lab', href: '#lab' },
  { label: 'Notes', href: '#writing' },
  { label: 'Contact', href: '#contact' },
];

const LEGAL_LINKS = [
  'プライバシーポリシー',
  '利用規約',
  '免責事項',
  '特定商取引法に基づく表記',
  'お問い合わせ（窓口）',
  '運営者情報',
];

const STACK_ITEMS = [
  'Next.js 16 · React 19',
  'TypeScript · Tailwind',
  'Vercel · Edge runtime',
  'next-intl / ja · en',
];

/* ─── Pixel Monogram SVG ─── */
function PixelMonogram() {
  const s = 10; // cell size
  // M shape: outer verticals + inner V
  const cells: [number, number, string][] = [
    // left column (x=0, y=0..4)
    [0, 0, T.ink], [0, 1, T.ink], [0, 2, T.ink], [0, 3, T.ink], [0, 4, T.ink],
    // right column (x=4, y=0..4)
    [4, 0, T.ink], [4, 1, T.ink], [4, 2, T.ink], [4, 3, T.ink], [4, 4, T.ink],
    // inner V
    [1, 1, T.ink], [3, 1, T.ink],
    // center accent
    [2, 2, T.accent],
  ];

  return (
    <svg viewBox="0 0 50 50" width={52} height={52} style={{ display: 'block' }}>
      {/* Construction grid lines */}
      {Array.from({ length: 6 }, (_, i) => (
        <line key={`v${i}`} x1={i * s} y1={0} x2={i * s} y2={50} stroke={T.border} strokeWidth={0.5} />
      ))}
      {Array.from({ length: 6 }, (_, i) => (
        <line key={`h${i}`} x1={0} y1={i * s} x2={50} y2={i * s} stroke={T.border} strokeWidth={0.5} />
      ))}
      {/* Pixel cells */}
      {cells.map(([x, y, fill]) => (
        <rect key={`${x}-${y}`} x={x * s} y={y * s} width={s} height={s} fill={fill} />
      ))}
    </svg>
  );
}

/* ─── Main Footer ─── */
export function Footer() {
  return (
    <footer style={{ background: T.surface2, borderTop: `1px solid ${T.border}`, padding: '64px 0 32px' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 56px' }}>

        {/* Top section: grid auto 1fr */}
        <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 'clamp(28px,4vw,56px)', alignItems: 'flex-start', marginBottom: 56 }}>

          {/* Left: Pixel monogram */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <span style={{ width: 6, height: 6, background: T.accent, display: 'inline-block' }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: T.dim, letterSpacing: '0.06em' }}>
                Brandmark · 田/05×05
              </span>
            </div>
            <PixelMonogram />
          </div>

          {/* Right: Type-contrast wordmark */}
          <div>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontWeight: 700,
              fontSize: 'clamp(48px,7vw,108px)',
              textTransform: 'uppercase' as const,
              letterSpacing: '-0.055em',
              lineHeight: 1,
              color: T.ink,
            }}>
              MIT TECH
            </div>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontWeight: 700,
              fontSize: 'clamp(48px,7vw,108px)',
              textTransform: 'uppercase' as const,
              letterSpacing: '-0.055em',
              lineHeight: 1,
              color: T.ink,
              display: 'flex',
              alignItems: 'baseline',
              gap: 16,
            }}>
              STUDIO
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, fontWeight: 400, color: T.dim, letterSpacing: '0.02em' }}>
                ● Tokyo · 35.68°N
              </span>
            </div>
          </div>
        </div>

        {/* Colophon (4-col grid) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 1,
          background: T.border,
          overflow: 'hidden',
          marginBottom: 56,
        }}>
          {[
            { label: 'Set in', value: 'Geist · Geist Mono · Noto Sans JP' },
            { label: 'Printed on', value: '12-col CSS Grid · 1320 px · 20 gap' },
            { label: 'Built in', value: 'Tokyo · 35.68°N / 139.69°E' },
            { label: 'Revision', value: 'rev. 06 · MMXXVI · build #2148' },
          ].map((item) => (
            <div key={item.label} style={{ background: T.surface, padding: '20px 24px' }}>
              <span style={{ display: 'block', fontSize: 10, color: T.dim, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>
                {item.label}
              </span>
              <span style={{ fontSize: 12, color: T.sub, fontFamily: 'var(--font-mono)', lineHeight: 1.5 }}>
                {item.value}
              </span>
            </div>
          ))}
        </div>

        {/* 3-col links */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 48, marginBottom: 56, borderBottom: `1px solid ${T.border}`, paddingBottom: 56 }}>
          {/* Studio */}
          <div>
            <span style={{ display: 'block', fontSize: 10, color: T.dim, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }}>
              Studio
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {STUDIO_LINKS.map((link) => (
                <a key={link.label} href={link.href} style={{ fontSize: 13, color: T.sub, fontFamily: 'var(--font-mono)', textDecoration: 'none', transition: 'color 0.2s' }}>
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Legal */}
          <div>
            <span style={{ display: 'block', fontSize: 10, color: T.dim, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }}>
              Legal
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {LEGAL_LINKS.map((label) => (
                <a key={label} href="#" style={{ fontSize: 13, color: T.sub, fontFamily: 'var(--font-mono)', textDecoration: 'none', transition: 'color 0.2s' }}>
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Stack */}
          <div>
            <span style={{ display: 'block', fontSize: 10, color: T.dim, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 16 }}>
              Stack
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {STACK_ITEMS.map((item) => (
                <span key={item} style={{ fontSize: 13, color: T.sub, fontFamily: 'var(--font-mono)' }}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: T.green, display: 'inline-block' }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: T.ink }}>all systems normal</span>
            </div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: T.dim }}>build #2148</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: T.dim }}>commit a3f9c12</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: T.dim }}>
              &copy; 2026 MIT Tech Studio
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: T.dim }}>All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
