'use client';

import { Sparkline } from '@/components/sparkline';
import { Reveal } from '@/components/reveal';
import { LAB_REPOS } from '@/data/lab-github';
import { REPOS, REPO_DESCRIPTIONS, HEATMAP_META, WORKFLOW_CARDS } from '@/data/site-content';

/* ─── Design Tokens ─── */
const T = {
  bg: '#06070a',
  surface: '#0a0c10',
  surface2: '#0e1116',
  surface3: '#13171e',
  border: '#1a1f28',
  borderStrong: '#252b35',
  ink: '#e9edf2',
  sub: '#8a93a0',
  dim: '#3d4654',
  accent: '#b5fb6b',
  accentDim: '#7da848',
  warn: '#ffb648',
  pink: '#ff5da2',
  blue: '#5ecfff',
  green: '#69e6a6',
  red: '#ff5a64',
  purple: '#b48cff',
} as const;

const monoFam = 'var(--font-mono)';
const sansFam = 'var(--font-sans)';

const HEATMAP_COLORS = [T.border, '#2d3a22', '#6b8f3a', T.accent];

/* ─── Series helper (matches reference) ─── */
function series(seed: number, n = 28, base = 50, amp = 30): number[] {
  return Array.from(
    { length: n },
    (_, i) =>
      base + Math.sin(i * 0.4 + seed) * amp + Math.cos(i * 0.7 + seed * 1.3) * amp * 0.4
  );
}

/* ─── Heatmap Data (deterministic) ─── */
function generateHeatmap(): number[] {
  return Array.from({ length: 7 * 52 }).map((_, i) => {
    const v = Math.abs(Math.sin(i * 0.31 + Math.cos(i * 0.07)) + Math.cos(i * 0.21));
    return v < 0.3 ? 0 : v < 0.7 ? 1 : v < 1.1 ? 2 : 3;
  });
}

/* ─── Section Head ─── */
function SectionHead() {
  return (
    <Reveal>
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          gap: 24,
          justifyContent: 'space-between',
          marginBottom: 88,
          paddingBottom: 28,
          borderBottom: `1px solid ${T.border}`,
        }}
      >
        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              fontFamily: monoFam,
              fontSize: 11,
              color: T.accent,
              letterSpacing: 1.4,
              textTransform: 'uppercase',
              marginBottom: 14,
            }}
          >
            <span>&sect;03</span>
            <span style={{ width: 24, height: 1, background: T.accent }} />
            <span>Portfolio</span>
          </div>
          <div
            style={{
              fontFamily: "'Geist', 'Noto Sans JP', system-ui, 'Hiragino Kaku Gothic ProN', sans-serif",
              fontSize: 'clamp(36px, 3.4vw, 50px)',
              fontWeight: 500,
              color: T.ink,
              letterSpacing: '-0.018em',
              lineHeight: 1.3,
              fontFeatureSettings: '"palt"',
            }}
          >
            Selected Works
          </div>
          <div
            style={{
              fontFamily: sansFam,
              fontSize: 16,
              color: T.sub,
              marginTop: 14,
              maxWidth: 720,
              lineHeight: 1.65,
            }}
          >
            GitHub&#x3067;&#x516C;&#x958B;&#x3057;&#x3066;&#x3044;&#x308B;&#x5B9F;&#x5728;&#x306E;&#x5236;&#x4F5C;&#x7269;&#x30FB;&#x958B;&#x767A;&#x4E8B;&#x4F8B;&#x3067;&#x3059;&#x3002;
          </div>
        </div>
        <div
          style={{
            flexShrink: 0,
            paddingBottom: 6,
            fontFamily: monoFam,
            fontSize: 11,
            color: T.sub,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <span>last_sync</span>
          <span style={{ color: T.ink }}>2m ago</span>
          <span style={{ width: 1, height: 12, background: T.border }} />
          <span style={{ color: T.green }}>&#x25CF; OK</span>
        </div>
      </div>
    </Reveal>
  );
}

/* ─── PUBLIC Badge ─── */
function PublicBadge() {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: '3px 8px',
        background: 'rgba(181,251,107,.08)',
        border: `1px solid rgba(181,251,107,.30)`,
        color: T.accent,
        fontFamily: monoFam,
        fontSize: 9.5,
        letterSpacing: 1.2,
        fontWeight: 600,
      }}
    >
      <span
        style={{
          width: 5,
          height: 5,
          borderRadius: 3,
          background: T.accent,
          boxShadow: `0 0 6px ${T.accent}`,
          animation: 'studioPulse 1.6s ease-in-out infinite',
        }}
      />
      PUBLIC
    </span>
  );
}

/* ─── Small Stat ─── */
function SmallStat({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <div
        style={{
          fontFamily: monoFam,
          fontSize: 9.5,
          color: T.dim,
          letterSpacing: 1.1,
          textTransform: 'uppercase',
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontFamily: sansFam,
          fontSize: 18,
          color: T.ink,
          fontWeight: 600,
          letterSpacing: '-0.015em',
          marginTop: 2,
        }}
      >
        {value}
      </div>
    </div>
  );
}

/* ─── Heatmap ─── */
function Heatmap() {
  const cells = generateHeatmap();
  return (
    <div
      className="heatmap-grid"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(52, 1fr)',
        gridTemplateRows: 'repeat(7, 14px)',
        gap: 3,
      }}
    >
      {cells.map((lvl, i) => (
        <span key={i} style={{ background: HEATMAP_COLORS[lvl] }} />
      ))}
    </div>
  );
}

/* ─── Main Section ─── */
export function WorksSection() {
  const repos = REPOS;
  const featuredRepo = LAB_REPOS[0];
  const repoColors = [T.accent, T.warn, T.purple];

  return (
    <section id="works" className="sect" style={{ padding: '180px 0', background: T.surface2 }}>
      <div className="studio-container" style={{ maxWidth: 1320, margin: '0 auto', padding: '0 56px' }}>
        <SectionHead />

        {/* Featured (first repo) */}
        <Reveal>
          <div
            className="studio-tile repo-card"
            style={{
              background: T.surface,
              border: `1px solid ${T.border}`,
              padding: '40px 40px 36px',
              marginBottom: 20,
              position: 'relative',
              transition: 'border-color .25s',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                fontFamily: monoFam,
                fontSize: 10,
                color: T.sub,
                letterSpacing: 1.2,
                textTransform: 'uppercase',
                marginBottom: 22,
              }}
            >
              <span style={{ width: 7, height: 7, background: '#3178c6' }} />
              <span>{featuredRepo.language}</span>
              <span style={{ color: T.dim }}>&middot;</span>
              <span>FEATURED</span>
              <span style={{ flex: 1, height: 1, background: T.border }} />
              <PublicBadge />
            </div>
            <div
              className="grid-feat"
              style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 56, alignItems: 'flex-end' }}
            >
              <div>
                <div
                  style={{
                    fontFamily: sansFam,
                    fontSize: 40,
                    color: T.ink,
                    fontWeight: 600,
                    letterSpacing: '-0.03em',
                    lineHeight: 1.1,
                    wordBreak: 'break-all',
                  }}
                >
                  {featuredRepo.name}
                </div>
                <div
                  style={{
                    fontFamily: sansFam,
                    fontSize: 16,
                    color: T.sub,
                    marginTop: 16,
                    lineHeight: 1.65,
                    maxWidth: 620,
                  }}
                >
                  {REPO_DESCRIPTIONS[featuredRepo.name] || featuredRepo.name}
                </div>
                <div style={{ display: 'flex', gap: 12, marginTop: 24, flexWrap: 'wrap' }}>
                  <a
                    className="studio-cta-ghost"
                    href={featuredRepo.htmlUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 8,
                      padding: '10px 18px',
                      border: `1px solid ${T.border}`,
                      color: T.ink,
                      fontFamily: sansFam,
                      fontSize: 13,
                      fontWeight: 500,
                      cursor: 'pointer',
                      textDecoration: 'none',
                    }}
                  >
                    &#x2197; GitHub
                  </a>
                  {featuredRepo.homepage && (
                    <a
                      className="studio-cta-ghost"
                      href={featuredRepo.homepage}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 8,
                        padding: '10px 18px',
                        border: `1px solid ${T.accent}`,
                        color: T.accent,
                        fontFamily: sansFam,
                        fontSize: 13,
                        fontWeight: 500,
                        cursor: 'pointer',
                        textDecoration: 'none',
                      }}
                    >
                      &#x2197; Live &middot; {featuredRepo.homepage}
                    </a>
                  )}
                </div>
              </div>
              <div>
                <Sparkline
                  values={series(2, 60, 50, 22)}
                  color={T.accent}
                  fill="rgba(181,251,107,.10)"
                  width={420}
                  height={90}
                  stroke={1.6}
                />
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: 12,
                    marginTop: 16,
                    paddingTop: 16,
                    borderTop: `1px solid ${T.border}`,
                  }}
                >
                  <SmallStat label="commits" value={featuredRepo.commitsCount} />
                  <SmallStat label="updated" value="4m" />
                  <SmallStat label="status" value={<span style={{ color: T.green }}>OK</span>} />
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Other repos */}
        <div
          className="grid-2"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20, marginBottom: 28 }}
        >
          {repos.slice(1).map((r, i) => (
            <Reveal key={r.id}>
              <div
                className="studio-tile repo-card"
                style={{
                  background: T.surface,
                  border: `1px solid ${T.border}`,
                  padding: '28px 30px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 16,
                  minHeight: 280,
                  position: 'relative',
                  transition: 'border-color .25s, transform .25s',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    fontFamily: monoFam,
                    fontSize: 10,
                    color: T.sub,
                    letterSpacing: 1.2,
                    textTransform: 'uppercase',
                  }}
                >
                  <span
                    style={{
                      width: 7,
                      height: 7,
                      background:
                        r.language === 'JavaScript'
                          ? '#f1e05a'
                          : r.language === 'Markdown'
                            ? T.purple
                            : T.accent,
                    }}
                  />
                  <span>{r.language || 'PROFILE'}</span>
                  <span style={{ flex: 1, height: 1, background: T.border }} />
                  <PublicBadge />
                </div>
                <div
                  style={{
                    fontFamily: sansFam,
                    fontSize: 24,
                    color: T.ink,
                    fontWeight: 600,
                    letterSpacing: '-0.02em',
                    wordBreak: 'break-all',
                  }}
                >
                  {r.name}
                </div>
                <div style={{ fontFamily: sansFam, fontSize: 14, color: T.sub, lineHeight: 1.65 }}>
                  {REPO_DESCRIPTIONS[r.name] || r.name}
                </div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 2 }}>
                  <a
                    className="studio-cta-ghost"
                    href={r.htmlUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      padding: '7px 12px',
                      border: `1px solid ${T.border}`,
                      color: T.ink,
                      fontFamily: sansFam,
                      fontSize: 12,
                      fontWeight: 500,
                      cursor: 'pointer',
                      textDecoration: 'none',
                    }}
                  >
                    &#x2197; GitHub
                  </a>
                  {r.homepage && (
                    <a
                      className="studio-cta-ghost"
                      href={r.homepage}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 6,
                        padding: '7px 12px',
                        border: `1px solid ${T.accent}`,
                        color: T.accent,
                        fontFamily: sansFam,
                        fontSize: 12,
                        fontWeight: 500,
                        cursor: 'pointer',
                        textDecoration: 'none',
                      }}
                    >
                      &#x2197; Live
                    </a>
                  )}
                </div>
                <div style={{ flex: 1 }} />
                <Sparkline
                  values={series(i * 13 + 7, 50, 40, 22)}
                  color={repoColors[i + 1]}
                  fill="rgba(255,255,255,.03)"
                  width={420}
                  height={50}
                  stroke={1.5}
                />
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: 12,
                    paddingTop: 14,
                    borderTop: `1px solid ${T.border}`,
                  }}
                >
                  <SmallStat label="commits" value={r.commitsCount} />
                  <SmallStat label="updated" value={['1d', '3w'][i]} />
                  <SmallStat label="status" value={<span style={{ color: T.green }}>OK</span>} />
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Heatmap full-width */}
        <Reveal>
          <div style={{ background: T.surface, border: `1px solid ${T.border}`, padding: '26px 28px', marginBottom: 20 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                fontFamily: monoFam,
                fontSize: 10,
                color: T.sub,
                letterSpacing: 1.2,
                textTransform: 'uppercase',
                marginBottom: 18,
              }}
            >
              <span style={{ width: 6, height: 6, background: T.accent }} />
              Commit heatmap &middot; 52 weeks
              <span style={{ flex: 1, height: 1, background: T.border }} />
              <span style={{ color: T.dim }}>cells = day</span>
            </div>
            <div className="heatmap-scroll">
              <Heatmap />
            </div>
            <div
              style={{
                display: 'flex',
                gap: 18,
                marginTop: 18,
                fontFamily: monoFam,
                fontSize: 10,
                color: T.sub,
                alignItems: 'center',
              }}
            >
              <span>less</span>
              <span style={{ display: 'flex', gap: 2 }}>
                {HEATMAP_COLORS.map((c, i) => (
                  <span key={i} style={{ width: 12, height: 12, background: c }} />
                ))}
              </span>
              <span>more</span>
              <span style={{ flex: 1 }} />
              <span>
                {HEATMAP_META.peak.split(': ')[0]}:{' '}
                <span style={{ color: T.ink }}>{HEATMAP_META.peak.split(': ')[1]}</span>
              </span>
              <span style={{ color: T.green }}>{HEATMAP_META.streak}</span>
            </div>
          </div>
        </Reveal>

        {/* Workflow row 3-col */}
        <Reveal delay={80}>
          <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {WORKFLOW_CARDS.map((card, i) => (
              <div
                key={card.num}
                style={{
                  background: T.surface,
                  border: `1px solid ${T.border}`,
                  padding: '22px 24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    fontFamily: monoFam,
                    fontSize: 10,
                    color: T.sub,
                    letterSpacing: 1.2,
                    textTransform: 'uppercase',
                  }}
                >
                  <span style={{ color: card.color, fontWeight: 700, fontSize: 12 }}>0{i + 1}</span>
                  <span style={{ flex: 1, height: 1, background: T.border }} />
                  <span style={{ color: card.color }}>{card.title}</span>
                </div>
                <div
                  style={{
                    fontFamily: sansFam,
                    fontSize: 17,
                    color: T.ink,
                    fontWeight: 600,
                    letterSpacing: '-0.015em',
                  }}
                >
                  {card.title}
                </div>
                <div style={{ fontFamily: sansFam, fontSize: 13, color: T.sub, lineHeight: 1.65 }}>
                  {card.body}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      <style>{`
        @keyframes studioPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </section>
  );
}
