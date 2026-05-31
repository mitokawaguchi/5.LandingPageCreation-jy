'use client';

import { useMemo } from 'react';
import { LAB_REPOS, LAB_GITHUB_PROFILE } from '@/data/lab-github';
import { Sparkline } from '@/components/sparkline';

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

const SPARK_VALUES = [2, 5, 3, 8, 6, 9, 4, 7, 11, 8, 13, 10, 15, 12, 9, 14];

const HEATMAP_COLORS = [T.border, '#2d3a22', '#6b8f3a', T.accent];

/* ─── Descriptions for repos ─── */
const REPO_DESCRIPTIONS: Record<string, string> = {
  '5.LandingPageCreation-jy':
    'Dark-themed portfolio landing page built with Next.js, TypeScript, and custom design system. Real-time GitHub integration and performance-optimized animations.',
  taskflow:
    'Full-stack task management app with drag-and-drop Kanban board, real-time updates and Vercel deployment.',
  mitokawaguchi:
    'GitHub profile README with dynamic stats, contribution graph, and auto-updated skill badges.',
};

/* ─── Heatmap Data (deterministic) ─── */
function generateHeatmap(): number[][] {
  const weeks: number[][] = [];
  for (let w = 0; w < 52; w++) {
    const week: number[] = [];
    for (let d = 0; d < 7; d++) {
      const v = Math.sin(w * 0.7 + d * 1.3) * 0.5 + 0.5;
      if (v > 0.75) week.push(3);
      else if (v > 0.55) week.push(2);
      else if (v > 0.35) week.push(1);
      else week.push(0);
    }
    weeks.push(week);
  }
  return weeks;
}

/* ─── Section Head ─── */
function SectionHead() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        borderBottom: `1px solid ${T.border}`,
        paddingBottom: 28,
        marginBottom: 88,
      }}
    >
      <div>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            color: T.accent,
            letterSpacing: 1.4,
            textTransform: 'uppercase',
            display: 'block',
            marginBottom: 12,
          }}
        >
          &sect;03 &mdash; Portfolio
        </span>
        <h2
          style={{
            fontSize: 'clamp(36px, 3.4vw, 50px)',
            fontWeight: 500,
            color: T.ink,
            fontFamily: 'var(--font-sans)',
            letterSpacing: '-0.02em',
            margin: 0,
            marginBottom: 8,
          }}
        >
          Selected Works
        </h2>
        <p
          style={{
            fontSize: 14,
            color: T.sub,
            fontFamily: 'var(--font-mono)',
            margin: 0,
          }}
        >
          GitHub&#x3067;&#x516C;&#x958B;&#x3057;&#x3066;&#x3044;&#x308B;&#x5B9F;&#x5728;&#x306E;&#x5236;&#x4F5C;&#x7269;&#x30FB;&#x958B;&#x767A;&#x4E8B;&#x4F8B;&#x3067;&#x3059;&#x3002;
        </p>
      </div>
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          color: T.green,
          whiteSpace: 'nowrap',
        }}
      >
        last_sync 2m ago&nbsp;|&nbsp;&#x25CF; OK
      </span>
    </div>
  );
}

/* ─── PUBLIC Badge ─── */
function PublicBadge() {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 5,
        fontSize: 10,
        fontFamily: 'var(--font-mono)',
        padding: '3px 8px',
        background: `${T.accent}12`,
        border: `1px solid ${T.accent}33`,
        color: T.accent,
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
      }}
    >
      <span
        style={{
          width: 5,
          height: 5,
          borderRadius: '50%',
          background: T.accent,
          animation: 'studioPulse 2s infinite',
        }}
      />
      PUBLIC
    </span>
  );
}

/* ─── Featured Repo Card ─── */
function FeaturedCard({ repo }: { repo: (typeof LAB_REPOS)[number] }) {
  const hostname = repo.homepage
    ? new URL(repo.homepage).hostname
    : null;

  return (
    <div
      className="studioFeaturedCard"
      style={{
        background: T.surface,
        border: `1px solid ${T.border}`,
        borderRadius: 0,
        padding: '40px 48px',
        position: 'relative',
        overflow: 'hidden',
        transition: 'border-color 0.2s',
      }}
    >
      {/* Top accent line on hover via CSS */}
      {/* Badge row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
        {repo.language && (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 10, fontFamily: 'var(--font-mono)', color: T.sub, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            <span style={{ width: 7, height: 7, background: '#3178c6', display: 'inline-block' }} />
            {repo.language}
          </span>
        )}
        <span
          style={{
            fontSize: 10,
            fontFamily: 'var(--font-mono)',
            padding: '3px 8px',
            background: `${T.warn}18`,
            color: T.warn,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
          }}
        >
          FEATURED
        </span>
        <span style={{ flex: 1, height: 1, background: T.border }} />
        <PublicBadge />
      </div>

      {/* Grid layout: 1.5fr 1fr */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 32, alignItems: 'start' }}>
        {/* Left */}
        <div>
          <h3
            style={{
              fontSize: 40,
              fontWeight: 600,
              color: T.ink,
              fontFamily: 'var(--font-mono)',
              marginBottom: 8,
              letterSpacing: '-0.02em',
              margin: 0,
              marginTop: 4,
            }}
          >
            {repo.name}
          </h3>
          <p style={{ fontSize: 14, color: T.sub, marginBottom: 24, lineHeight: 1.6, maxWidth: 560, marginTop: 8 }}>
            {REPO_DESCRIPTIONS[repo.name] || repo.name}
          </p>
          <div style={{ display: 'flex', gap: 12 }}>
            <a
              href={repo.htmlUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                fontSize: 12,
                fontFamily: 'var(--font-mono)',
                color: T.ink,
                padding: '8px 16px',
                border: `1px solid ${T.border}`,
                background: 'transparent',
                textDecoration: 'none',
                transition: 'border-color 0.2s',
                borderRadius: 0,
              }}
            >
              &#x2197; GitHub
            </a>
            {repo.homepage && (
              <a
                href={repo.homepage}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  fontSize: 12,
                  fontFamily: 'var(--font-mono)',
                  color: T.accent,
                  padding: '8px 16px',
                  border: `1px solid ${T.accent}33`,
                  background: 'transparent',
                  textDecoration: 'none',
                  transition: 'border-color 0.2s',
                  borderRadius: 0,
                }}
              >
                &#x2197; Live &middot; {hostname}
              </a>
            )}
          </div>
        </div>

        {/* Right */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 16 }}>
          <Sparkline values={SPARK_VALUES} color={T.accent} width={140} height={40} />
          <div style={{ display: 'flex', gap: 20 }}>
            {[
              { label: 'commits', value: String(repo.commitsCount) },
              { label: 'updated', value: '4m' },
              { label: 'status', value: 'OK', color: T.green },
            ].map((stat) => (
              <div key={stat.label} style={{ textAlign: 'right' }}>
                <span
                  style={{
                    display: 'block',
                    fontSize: 10,
                    color: T.dim,
                    fontFamily: 'var(--font-mono)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                  }}
                >
                  {stat.label}
                </span>
                <span
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: stat.color || T.ink,
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  {stat.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Language color helper ─── */
function langColor(lang: string | null): string {
  if (!lang) return T.dim;
  const map: Record<string, string> = {
    TypeScript: '#3178c6',
    JavaScript: '#f1e05a',
    CSS: T.pink,
    Markdown: T.purple,
  };
  return map[lang] || T.sub;
}

/* ─── Other Repo Card ─── */
function RepoCard({ repo }: { repo: (typeof LAB_REPOS)[number] }) {
  const hostname = repo.homepage ? new URL(repo.homepage).hostname : null;

  return (
    <div
      style={{
        background: T.surface,
        border: `1px solid ${T.border}`,
        borderRadius: 0,
        padding: '28px 30px',
        minHeight: 280,
        display: 'flex',
        flexDirection: 'column',
        transition: 'border-color 0.2s',
      }}
    >
      {/* Badge row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
        {repo.language && (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 10, fontFamily: 'var(--font-mono)', color: T.sub, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            <span style={{ width: 7, height: 7, background: langColor(repo.language), display: 'inline-block' }} />
            {repo.language}
          </span>
        )}
        <PublicBadge />
      </div>

      {/* Name */}
      <h3
        style={{
          fontSize: 24,
          fontWeight: 600,
          color: T.ink,
          fontFamily: 'var(--font-mono)',
          letterSpacing: '-0.02em',
          margin: 0,
          marginBottom: 8,
        }}
      >
        {repo.name}
      </h3>

      {/* Desc */}
      <p style={{ fontSize: 13, color: T.sub, lineHeight: 1.6, marginBottom: 20, marginTop: 0, flex: 1 }}>
        {REPO_DESCRIPTIONS[repo.name] || repo.name}
      </p>

      {/* CTA */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
        <a
          href={repo.htmlUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            fontSize: 12,
            fontFamily: 'var(--font-mono)',
            color: T.ink,
            padding: '8px 16px',
            border: `1px solid ${T.border}`,
            background: 'transparent',
            textDecoration: 'none',
            borderRadius: 0,
          }}
        >
          &#x2197; GitHub
        </a>
        {repo.homepage && (
          <a
            href={repo.homepage}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              fontSize: 12,
              fontFamily: 'var(--font-mono)',
              color: T.accent,
              padding: '8px 16px',
              border: `1px solid ${T.accent}33`,
              background: 'transparent',
              textDecoration: 'none',
              borderRadius: 0,
            }}
          >
            &#x2197; Live &middot; {hostname}
          </a>
        )}
      </div>

      {/* Sparkline */}
      <Sparkline values={SPARK_VALUES} color={T.accent} width={120} height={28} />

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginTop: 12 }}>
        {[
          { label: 'commits', value: String(repo.commitsCount) },
          { label: 'updated', value: '4m' },
          { label: 'status', value: 'OK', color: T.green },
        ].map((s) => (
          <div key={s.label}>
            <span style={{ display: 'block', fontSize: 10, color: T.dim, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              {s.label}
            </span>
            <span style={{ fontSize: 13, fontWeight: 600, color: s.color || T.ink, fontFamily: 'var(--font-mono)' }}>
              {s.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Commit Heatmap ─── */
function CommitHeatmap() {
  const heatmap = useMemo(() => generateHeatmap(), []);

  return (
    <div
      style={{
        background: T.surface,
        border: `1px solid ${T.border}`,
        borderRadius: 0,
        padding: '28px 30px',
        marginTop: 20,
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
        <span style={{ width: 7, height: 7, background: T.accent, display: 'inline-block' }} />
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: T.sub, letterSpacing: '0.06em' }}>
          Commit heatmap &middot; 52 weeks
        </span>
      </div>

      {/* Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(52, 14px)',
          gridTemplateRows: 'repeat(7, 14px)',
          gap: 3,
          gridAutoFlow: 'column',
          overflowX: 'auto',
          paddingBottom: 8,
        }}
      >
        {Array.from({ length: 52 }).flatMap((_, w) =>
          Array.from({ length: 7 }).map((_, d) => {
            const level = heatmap[w][d];
            return (
              <div
                key={`${w}-${d}`}
                style={{
                  width: 14,
                  height: 14,
                  background: HEATMAP_COLORS[level],
                  borderRadius: 0,
                }}
              />
            );
          })
        )}
      </div>

      {/* Footer */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 16,
          fontSize: 10,
          fontFamily: 'var(--font-mono)',
          color: T.dim,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span>less</span>
          {HEATMAP_COLORS.map((c, i) => (
            <span key={i} style={{ width: 12, height: 12, background: c, display: 'inline-block' }} />
          ))}
          <span>more</span>
        </div>
        <div style={{ display: 'flex', gap: 20 }}>
          <span>peak: Tue 14:00 JST</span>
          <span style={{ color: T.green }}>streak: 18d</span>
        </div>
      </div>
    </div>
  );
}

/* ─── Workflow Card ─── */
function WorkflowCard({
  num,
  title,
  body,
  color,
}: {
  num: string;
  title: string;
  body: string;
  color: string;
}) {
  return (
    <div
      style={{
        background: T.surface,
        border: `1px solid ${T.border}`,
        borderRadius: 0,
        padding: '24px 28px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            color,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            fontWeight: 600,
          }}
        >
          {num}
        </span>
      </div>
      <h4 style={{ fontSize: 16, fontWeight: 600, color: T.ink, marginBottom: 6, fontFamily: 'var(--font-mono)', margin: 0 }}>
        {title}
      </h4>
      <p style={{ fontSize: 12, color: T.sub, lineHeight: 1.5, margin: 0, marginTop: 6 }}>
        {body}
      </p>
    </div>
  );
}

/* ─── Main Section ─── */
export function WorksSection() {
  const featuredRepo = LAB_REPOS[0];
  const otherRepos = LAB_REPOS.slice(1);

  return (
    <section id="works" style={{ background: T.surface2, padding: '180px 0' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 56px' }}>
        <SectionHead />

        {/* Featured repo */}
        <FeaturedCard repo={featuredRepo} />

        {/* Other repos grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20, marginTop: 20 }}>
          {otherRepos.map((repo) => (
            <RepoCard key={repo.id} repo={repo} />
          ))}
        </div>

        {/* Heatmap */}
        <CommitHeatmap />

        {/* Workflow row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginTop: 20 }}>
          <WorkflowCard
            num="01"
            title="Build"
            body="TypeScript strict, ESLint, Prettier &#x2014; zero warnings policy"
            color={T.green}
          />
          <WorkflowCard
            num="02"
            title="Deploy"
            body="Vercel Preview on PR, Production on merge to main"
            color={T.blue}
          />
          <WorkflowCard
            num="03"
            title="Auto Update"
            body="Dependabot + automated security patches weekly"
            color={T.purple}
          />
        </div>
      </div>

      <style>{`
        @keyframes studioPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        .studioFeaturedCard::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: ${T.accent};
          opacity: 0;
          transition: opacity 0.2s;
        }
        .studioFeaturedCard:hover::after {
          opacity: 1;
        }
      `}</style>
    </section>
  );
}
