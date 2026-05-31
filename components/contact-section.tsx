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

/* ─── Contact Channels ─── */
const CHANNELS = [
  { label: 'Email', value: 'contact@mittechstudio.com', href: 'mailto:contact@mittechstudio.com', color: t.accent },
  { label: 'GitHub', value: '@mitokawaguchi', href: 'https://github.com/mitokawaguchi', color: t.ink },
  { label: 'Instagram', value: '@mito_112_', href: 'https://www.instagram.com/mito_112_/', color: t.pink },
  { label: 'Threads', value: '@mito_112_', href: 'https://www.threads.net/@mito_112_', color: t.purple },
  { label: 'Zenn', value: '@mitokawaguchi', href: 'https://zenn.dev/mitokawaguchi', color: t.blue },
  { label: 'Qiita', value: '@mitokawaguchi_', href: 'https://qiita.com/mitokawaguchi_', color: t.green },
];

/* ─── Main Section ─── */
export function ContactSection() {
  return (
    <section id="contact" style={{ background: t.bg, padding: '180px 0' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 56px' }}>
        {/* Section header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 64 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: t.dim, letterSpacing: '0.08em' }}>§06</span>
          <span style={{ width: 24, height: 1, background: t.dim, display: 'inline-block' }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: t.sub, letterSpacing: '0.04em' }}>Contact</span>
        </div>

        {/* Two-column layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '8fr 4fr', gap: 48 }}>
          {/* Left: main CTA card */}
          <div style={{
            background: t.surface,
            border: `1px solid ${t.border}`,
            borderRadius: 20,
            padding: '56px 52px',
          }}>
            {/* Meta */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 40 }}>
              <span style={{
                width: 7,
                height: 7,
                borderRadius: '50%',
                background: t.green,
                animation: 'contact-pulse 2s infinite',
              }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: t.sub, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                ACCEPTING-WORK · response &lt; 24h
              </span>
            </div>

            {/* Big text */}
            <h2 style={{
              fontSize: 'clamp(48px, 6vw, 88px)',
              fontWeight: 800,
              lineHeight: 1.1,
              marginBottom: 32,
              fontFamily: '"Noto Sans JP", "Hiragino Kaku Gothic ProN", sans-serif',
            }}>
              <span style={{ color: t.ink }}>一緒に</span>
              <br />
              <span style={{ color: t.accent }}>つくりませんか？</span>
            </h2>

            {/* Body */}
            <p style={{
              fontSize: 15,
              color: t.sub,
              lineHeight: 1.8,
              maxWidth: 480,
              marginBottom: 40,
              fontFamily: '"Noto Sans JP", "Hiragino Kaku Gothic ProN", sans-serif',
            }}>
              新規プロジェクトのご相談、デザインシステムの構築、フロントエンド開発の支援など、
              お気軽にお問い合わせください。24時間以内に返信いたします。
            </p>

            {/* CTA Buttons */}
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <a
                href="mailto:contact@mittechstudio.com"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '14px 32px',
                  borderRadius: 8,
                  background: t.accent,
                  color: '#06070a',
                  fontSize: 14,
                  fontWeight: 700,
                  fontFamily: 'var(--font-mono)',
                  textDecoration: 'none',
                  transition: 'opacity 0.2s',
                  letterSpacing: '0.02em',
                }}
              >
                &#9656; お問い合わせ
              </a>
              <a
                href="#"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '14px 32px',
                  borderRadius: 8,
                  background: 'transparent',
                  color: t.sub,
                  fontSize: 14,
                  fontWeight: 600,
                  fontFamily: 'var(--font-mono)',
                  textDecoration: 'none',
                  border: `1px solid ${t.border}`,
                  transition: 'border-color 0.2s, color 0.2s',
                }}
              >
                Brief PDF &#8599;
              </a>
            </div>
          </div>

          {/* Right column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {/* Capacity card */}
            <div style={{
              background: t.surface,
              border: `1px solid ${t.border}`,
              borderRadius: 14,
              padding: '28px 28px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: t.dim, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Capacity</span>
              </div>

              <div style={{ fontSize: 32, fontWeight: 700, color: t.ink, fontFamily: 'var(--font-mono)', marginBottom: 12 }}>
                2 / 3 <span style={{ fontSize: 14, fontWeight: 400, color: t.dim }}>slots</span>
              </div>

              {/* Progress bar */}
              <div style={{
                width: '100%',
                height: 6,
                borderRadius: 3,
                background: t.surface3,
                marginBottom: 12,
                overflow: 'hidden',
              }}>
                <div style={{
                  width: '66%',
                  height: '100%',
                  borderRadius: 3,
                  background: `linear-gradient(90deg, ${t.accent}, ${t.green})`,
                }} />
              </div>

              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: t.sub }}>
                1 slot available · from 2026.05
              </span>
            </div>

            {/* Channels card */}
            <div style={{
              background: t.surface,
              border: `1px solid ${t.border}`,
              borderRadius: 14,
              padding: '28px 28px',
              flex: 1,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: t.dim, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Channels</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {CHANNELS.map((ch) => (
                  <a
                    key={ch.label}
                    href={ch.href}
                    target={ch.href.startsWith('mailto') ? undefined : '_blank'}
                    rel={ch.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px 0',
                      borderBottom: `1px solid ${t.border}`,
                      textDecoration: 'none',
                      transition: 'background 0.15s',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{
                        width: 5,
                        height: 5,
                        borderRadius: '50%',
                        background: ch.color,
                      }} />
                      <span style={{ fontSize: 12, color: t.ink, fontFamily: 'var(--font-mono)' }}>{ch.label}</span>
                    </div>
                    <span style={{ fontSize: 11, color: t.dim, fontFamily: 'var(--font-mono)' }}>&#8599;</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes contact-pulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 0 0 #69e6a644; }
          50% { opacity: 0.6; box-shadow: 0 0 0 4px #69e6a600; }
        }
      `}</style>
    </section>
  );
}
