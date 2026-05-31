'use client';

import { CONTACT_CHANNELS as CHANNELS, CONTACT_STATUS, CONTACT_EMAIL, CAPACITY } from '@/data/site-content';

/* ─── Design Tokens ─── */
const T = { bg:'#06070a', surface:'#0a0c10', surface2:'#0e1116', surface3:'#13171e', border:'#1a1f28', borderStrong:'#252b35', ink:'#e9edf2', sub:'#8a93a0', dim:'#3d4654', accent:'#b5fb6b', accentDim:'#7da848', warn:'#ffb648', pink:'#ff5da2', blue:'#5ecfff', green:'#69e6a6', red:'#ff5a64', purple:'#b48cff' };

/* ─── Main Section ─── */
export function ContactSection() {
  return (
    <section id="contact" className="sect" style={{ padding: '180px 0' }}>
      <div className="studio-container" style={{ maxWidth: 1320, margin: '0 auto', padding: '0 56px' }}>
        {/* 12-col grid */}
        <div className="bento-12" style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 20, alignItems: 'flex-start' }}>

          {/* Left: span 8 */}
          <div className="contact-card" style={{
            gridColumn: 'span 8',
            background: T.surface,
            border: `1px solid ${T.border}`,
            borderRadius: 0,
            padding: '56px 56px 48px',
            height: 487,
            display: 'flex',
            flexDirection: 'column',
          }}>
            {/* Meta row */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 40 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{
                  width: 7,
                  height: 7,
                  borderRadius: '50%',
                  background: T.green,
                  animation: 'contact-pulse 2s infinite',
                  display: 'inline-block',
                }} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: T.sub, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  {CONTACT_STATUS}
                </span>
              </div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: T.dim }}>§ 06</span>
            </div>

            {/* Title */}
            <h2 className="contact-h2" style={{
              fontSize: 88,
              fontWeight: 600,
              fontFamily: '"Geist", "Noto Sans JP", sans-serif',
              letterSpacing: '-0.025em',
              lineHeight: 1.1,
              margin: 0,
              marginBottom: 24,
            }}>
              <span style={{ color: T.ink }}>一緒に</span>
              <br />
              <span style={{ color: T.accent }}>つくりませんか？</span>
            </h2>

            {/* Body */}
            <p style={{
              fontSize: 17,
              color: T.sub,
              lineHeight: 1.8,
              maxWidth: 600,
              marginBottom: 40,
              fontFamily: '"Noto Sans JP", "Hiragino Kaku Gothic ProN", sans-serif',
              margin: 0,
              marginTop: 8,
            }}>
              新規プロジェクトのご相談、デザインシステムの構築、フロントエンド開発の支援など、
              お気軽にお問い合わせください。24時間以内に返信いたします。
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', gap: 16, marginTop: 'auto' }}>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="studio-cta-primary"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '18px 30px',
                  borderRadius: 0,
                  background: T.accent,
                  color: '#06070a',
                  fontSize: 15,
                  fontWeight: 700,
                  fontFamily: 'var(--font-mono)',
                  textDecoration: 'none',
                  transition: 'opacity 0.2s',
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
                  padding: '18px 30px',
                  borderRadius: 0,
                  background: 'transparent',
                  color: T.sub,
                  fontSize: 15,
                  fontWeight: 600,
                  fontFamily: 'var(--font-mono)',
                  textDecoration: 'none',
                  border: `1px solid ${T.border}`,
                  transition: 'border-color 0.2s, color 0.2s',
                }}
              >
                Brief PDF &#8599;
              </a>
            </div>
          </div>

          {/* Right: span 4 */}
          <div style={{ gridColumn: 'span 4', display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Capacity card */}
            <div style={{
              background: T.surface,
              border: `1px solid ${T.border}`,
              borderRadius: 0,
              padding: '28px 28px',
            }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: T.dim, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                {CAPACITY.label}
              </span>

              <div style={{ fontSize: 44, fontWeight: 700, color: T.ink, fontFamily: 'var(--font-mono)', marginTop: 16, marginBottom: 16 }}>
                {CAPACITY.filled} / {CAPACITY.total} <span style={{ fontSize: 16, fontWeight: 400, color: T.dim }}>slots</span>
              </div>

              {/* Progress bar */}
              <div style={{ width: '100%', height: 6, background: T.surface3, marginBottom: 12, overflow: 'hidden' }}>
                <div style={{ width: `${CAPACITY.percent}%`, height: '100%', background: T.accent }} />
              </div>

              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: T.sub }}>
                {CAPACITY.note}
              </span>
            </div>

            {/* Channels card */}
            <div style={{
              background: T.surface,
              border: `1px solid ${T.border}`,
              borderRadius: 0,
              padding: '28px 28px',
              flex: 1,
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {CHANNELS.map(([text, color]) => (
                  <div
                    key={text}
                    className="channel-row"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px 0',
                      borderBottom: `1px solid ${T.border}`,
                      cursor: 'pointer',
                      transition: 'background 0.15s',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ width: 6, height: 6, background: color, display: 'inline-block' }} />
                      <span style={{ fontSize: 12, color: T.ink, fontFamily: 'var(--font-mono)' }}>{text}</span>
                    </div>
                    <span style={{ fontSize: 11, color: T.dim, fontFamily: 'var(--font-mono)' }}>&#8599;</span>
                  </div>
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
        .channel-row:hover {
          background: ${T.surface2};
        }
      `}</style>
    </section>
  );
}
