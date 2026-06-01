'use client';

import { Reveal } from '@/components/reveal';
import { CONTACT_CHANNELS as CHANNELS, CONTACT_STATUS, CONTACT_EMAIL, CAPACITY } from '@/data/site-content';

/* ─── Design Tokens ─── */
const T = { bg:'#06070a', surface:'#0a0c10', surface2:'#0e1116', surface3:'#13171e', border:'#1a1f28', borderStrong:'#252b35', ink:'#e9edf2', sub:'#8a93a0', dim:'#3d4654', accent:'#b5fb6b', accentDim:'#7da848', warn:'#ffb648', pink:'#ff5da2', blue:'#5ecfff', green:'#69e6a6', red:'#ff5a64', purple:'#b48cff' };

const monoFam = "'Geist Mono', 'SFMono-Regular', ui-monospace, monospace";
const sansFam = "'Geist', 'Noto Sans JP', system-ui, 'Hiragino Kaku Gothic ProN', sans-serif";

/* ─── Main Section ─── */
export function ContactSection() {
  return (
    <section id="contact" className="sect" style={{ padding: '180px 0' }}>
      <div className="studio-container" style={{ maxWidth: 1320, margin: '0 auto', padding: '0 56px' }}>
        {/* 12-col grid */}
        <div className="bento-12" style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 20, alignItems: 'flex-start' }}>

          {/* Left: span 8 */}
          <Reveal style={{ gridColumn: 'span 8' }}>
            <div className="contact-card" style={{
              background: T.surface,
              border: `1px solid ${T.border}`,
              padding: '56px 56px 48px',
              position: 'relative',
              overflow: 'hidden',
              height: '487px',
            }}>
              {/* Meta strip */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: monoFam, fontSize: 10, color: T.sub, letterSpacing: 1.4, textTransform: 'uppercase', marginBottom: 28 }}>
                <span style={{
                  width: 6, height: 6, background: T.accent,
                  boxShadow: `0 0 8px ${T.accent}`, animation: 'studioPulse 1.4s ease-in-out infinite',
                }} />
                {CONTACT_STATUS}
                <span style={{ flex: 1, height: 1, background: T.border }} />
                <span style={{ color: T.dim }}>§ 06</span>
              </div>

              {/* Title */}
              <h2 className="contact-h2" style={{
                margin: 0,
                fontFamily: sansFam,
                color: T.ink,
                fontWeight: 600,
                letterSpacing: '-0.025em',
                lineHeight: 1.1,
                fontFeatureSettings: '"palt"',
                fontSize: '88px',
              }}>
                一緒に<br />
                <span style={{ color: T.accent }}>つくりませんか？</span>
              </h2>

              {/* Body */}
              <div className="contact-body" style={{ fontFamily: sansFam, fontSize: 17, color: T.sub, lineHeight: 1.7, marginTop: 28, maxWidth: 600 }}>
                新規プロジェクトのご相談、デザインシステムの構築、フロントエンド開発の支援など、お気軽にお問い合わせください。24時間以内に返信いたします。
              </div>

              {/* CTAs */}
              <div style={{ display: 'flex', gap: 12, marginTop: 20, flexWrap: 'wrap' }}>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="studio-cta-primary"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 12,
                    background: T.accent, color: '#0a0c10',
                    fontFamily: sansFam, fontSize: 15, fontWeight: 600, cursor: 'pointer',
                    textDecoration: 'none',
                    transition: 'transform .15s, box-shadow .15s', padding: '18px 30px',
                  }}
                >▸ お問い合わせ</a>
                <a
                  href="#"
                  className="studio-cta-ghost"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 10,
                    padding: '18px 24px', border: `1px solid ${T.border}`, color: T.ink,
                    fontFamily: sansFam, fontSize: 15, fontWeight: 500, cursor: 'pointer',
                    textDecoration: 'none',
                  }}
                >Brief PDF ↗</a>
              </div>
            </div>
          </Reveal>

          {/* Right: span 4 */}
          <Reveal delay={100} style={{ gridColumn: 'span 4' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {/* Capacity card */}
              <div style={{ background: T.surface, border: `1px solid ${T.border}`, padding: '24px 26px' }}>
                <div style={{ fontFamily: monoFam, fontSize: 10, color: T.sub, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 12 }}>{CAPACITY.label}</div>
                <div style={{ fontFamily: sansFam, fontSize: 44, color: T.ink, fontWeight: 600, letterSpacing: '-0.03em' }}>
                  {CAPACITY.filled} <span style={{ color: T.sub, fontSize: 18, fontWeight: 400 }}>/ {CAPACITY.total} slots</span>
                </div>
                <div style={{ marginTop: 12, height: 4, background: T.surface3, position: 'relative' }}>
                  <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: `${CAPACITY.percent}%`, background: T.accent }} />
                </div>
                <div style={{ fontFamily: monoFam, fontSize: 10, color: T.green, marginTop: 10 }}>{CAPACITY.note}</div>
              </div>

              {/* Channels card */}
              <div style={{ background: T.surface, border: `1px solid ${T.border}`, padding: '24px 26px' }}>
                <div style={{ fontFamily: monoFam, fontSize: 10, color: T.sub, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 14 }}>Channels</div>
                {CHANNELS.map(([text, color], i) => (
                  <div
                    key={text}
                    className="channel-row"
                    style={{
                      display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0',
                      borderTop: i === 0 ? 'none' : `1px solid ${T.border}`,
                      fontFamily: monoFam, fontSize: 12, color: T.ink, cursor: 'pointer',
                    }}
                  >
                    <span style={{ width: 6, height: 6, background: color }} />
                    <span style={{ flex: 1 }}>{text}</span>
                    <span style={{ color: T.sub }}>↗</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <style>{`
        @keyframes contact-pulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 0 0 #69e6a644; }
          50% { opacity: 0.6; box-shadow: 0 0 0 4px #69e6a600; }
        }
        @keyframes studioPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.8); }
        }
        .channel-row:hover {
          background: ${T.surface2};
        }
      `}</style>
    </section>
  );
}
