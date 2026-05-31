'use client';

import { useMemo } from 'react';
import { LAB_REPOS, LAB_GITHUB_PROFILE } from '@/data/lab-github';
import { Sparkline } from '@/components/sparkline';

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

/* ─── Heatmap Data (simulated) ─── */
function generateHeatmap(): number[][] {
  const weeks: number[][] = [];
  for (let w = 0; w < 52; w++) {
    const week: number[] = [];
    for (let d = 0; d < 7; d++) {
      const rand = Math.random();
      if (rand > 0.7) week.push(Math.floor(Math.random() * 4) + 1);
      else week.push(0);
    }
    weeks.push(week);
  }
  return weeks;
}

function getHeatColor(level: number): string {
  const colors = ['transparent', '#0e4429', '#006d32', '#26a641', '#39d353'];
  return colors[Math.min(level, 4)];
}

/* ─── Sparkline values (simulated) ─── */
const SPARK_VALUES = [2, 5, 3, 8, 6, 9, 4, 7, 11, 8, 13, 10, 15, 12, 9, 14];

/* ─── Repo Card ─── */
function RepoCard({ repo, featured = false }: { repo: typeof LAB_REPOS[number]; featured?: boolean }) {
  const isFeatured = featured;

  return (
    <div
      style={{
        background: t.surface,
        border: `1px solid ${t.border}`,
        borderRadius: 16,
        padding: isFeatured ? '40px 48px' : '28px 32px',
        gridColumn: isFeatured ? '1 / -1' : undefined,
        display: 'grid',
        gridTemplateColumns: isFeatured ? '1fr auto' : '1fr',
        gap: 32,
        alignItems: 'center',
        transition: 'border-color 0.2s',
      }}
    >
      <div>
        {/* Badges */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
          {repo.language && (
            <span style={{
              fontSize: 10,
              fontFamily: 'var(--font-mono)',
              padding: '3px 8px',
              borderRadius: 4,
              background: `${t.blue}18`,
              color: t.blue,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
            }}>
              {repo.language}
            </span>
          )}
          {isFeatured && (
            <span style={{
              fontSize: 10,
              fontFamily: 'var(--font-mono)',
              padding: '3px 8px',
              borderRadius: 4,
              background: `${t.warn}18`,
              color: t.warn,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
            }}>
              FEATURED
            </span>
          )}
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 10, fontFamily: 'var(--font-mono)', padding: '3px 8px', borderRadius: 4, background: `${t.green}12`, color: t.green }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: t.green, animation: 'pulse-dot-repo 2s infinite' }} />
            PUBLIC
          </span>
        </div>

        {/* Repo name */}
        <h3 style={{
          fontSize: isFeatured ? 'clamp(28px, 3vw, 40px)' : 20,
          fontWeight: 700,
          color: t.ink,
          fontFamily: 'var(--font-mono)',
          marginBottom: 8,
          letterSpacing: '-0.02em',
        }}>
          {repo.name}
        </h3>

        {/* Description */}
        <p style={{ fontSize: 14, color: t.sub, marginBottom: 20, lineHeight: 1.6, maxWidth: 560 }}>
          {isFeatured
            ? 'Dark-themed portfolio landing page built with Next.js, TypeScript, and custom design system. Real-time GitHub integration and performance-optimized animations.'
            : repo.homepage ? `Live project deployed on Vercel` : `GitHub profile repository`
          }
        </p>

        {/* Links */}
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
              color: t.ink,
              padding: '8px 16px',
              borderRadius: 6,
              border: `1px solid ${t.border}`,
              background: t.surface2,
              textDecoration: 'none',
              transition: 'border-color 0.2s',
            }}
          >
            GitHub &#8599;
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
                color: t.accent,
                padding: '8px 16px',
                borderRadius: 6,
                border: `1px solid ${t.accent}33`,
                background: `${t.accent}08`,
                textDecoration: 'none',
                transition: 'border-color 0.2s',
              }}
            >
              Live &#8599;
            </a>
          )}
        </div>
      </div>

      {/* Right side stats (featured only) */}
      {isFeatured && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 16 }}>
          <Sparkline values={SPARK_VALUES} color={t.accent} width={140} height={40} />
          <div style={{ display: 'flex', gap: 20 }}>
            {[
              { label: 'commits', value: String(repo.commitsCount) },
              { label: 'updated', value: '4m' },
              { label: 'status', value: 'OK', color: t.green },
            ].map((stat) => (
              <div key={stat.label} style={{ textAlign: 'right' }}>
                <span style={{ display: 'block', fontSize: 10, color: t.dim, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  {stat.label}
                </span>
                <span style={{ fontSize: 14, fontWeight: 600, color: stat.color || t.ink, fontFamily: 'var(--font-mono)' }}>
                  {stat.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Commit Heatmap ─── */
function CommitHeatmap() {
  const heatmap = useMemo(() => generateHeatmap(), []);

  return (
    <div style={{ marginTop: 64 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: t.dim, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          Contribution Activity
        </span>
        <span style={{ flex: 1, height: 1, background: t.border }} />
      </div>
      <div style={{ display: 'flex', gap: 3, overflowX: 'auto', paddingBottom: 8 }}>
        {heatmap.map((week, wi) => (
          <div key={wi} style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {week.map((level, di) => (
              <div
                key={di}
                style={{
                  width: 11,
                  height: 11,
                  borderRadius: 2,
                  background: level === 0 ? t.surface3 : getHeatColor(level),
                  border: level === 0 ? `1px solid ${t.border}` : 'none',
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Workflow Card ─── */
function WorkflowCard({ title, status, description, color }: { title: string; status: string; description: string; color: string }) {
  return (
    <div style={{
      background: t.surface,
      border: `1px solid ${t.border}`,
      borderRadius: 12,
      padding: '24px 28px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: color }} />
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: t.dim, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          {status}
        </span>
      </div>
      <h4 style={{ fontSize: 16, fontWeight: 600, color: t.ink, marginBottom: 6, fontFamily: 'var(--font-mono)' }}>
        {title}
      </h4>
      <p style={{ fontSize: 12, color: t.sub, lineHeight: 1.5 }}>
        {description}
      </p>
    </div>
  );
}

/* ─── Main Section ─── */
export function WorksSection() {
  const featuredRepo = LAB_REPOS[0];
  const otherRepos = LAB_REPOS.slice(1);

  return (
    <section id="works" style={{ background: t.bg, padding: '180px 0' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 56px' }}>
        {/* Section header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: t.dim, letterSpacing: '0.08em' }}>§03</span>
          <span style={{ width: 24, height: 1, background: t.dim, display: 'inline-block' }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: t.sub, letterSpacing: '0.04em' }}>Portfolio</span>
        </div>

        <h2 style={{
          fontSize: 'clamp(32px, 4vw, 52px)',
          fontWeight: 800,
          color: t.ink,
          marginBottom: 12,
          fontFamily: 'var(--font-sans)',
          letterSpacing: '-0.02em',
        }}>
          Selected Works
        </h2>

        <p style={{ fontSize: 14, color: t.sub, marginBottom: 64, fontFamily: 'var(--font-mono)', maxWidth: 560 }}>
          Public repositories on GitHub — {LAB_GITHUB_PROFILE.publicRepos} repos · {LAB_GITHUB_PROFILE.followers} followers · shipping in TypeScript
        </p>

        {/* Featured repo */}
        <RepoCard repo={featuredRepo} featured />

        {/* Other repos grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24, marginTop: 24 }}>
          {otherRepos.map((repo) => (
            <RepoCard key={repo.id} repo={repo} />
          ))}
        </div>

        {/* Heatmap */}
        <CommitHeatmap />

        {/* Workflow row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginTop: 48 }}>
          <WorkflowCard
            title="Build"
            status="passing"
            description="TypeScript strict, ESLint, Prettier — zero warnings policy"
            color={t.green}
          />
          <WorkflowCard
            title="Deploy"
            status="auto"
            description="Vercel Preview on PR, Production on merge to main"
            color={t.blue}
          />
          <WorkflowCard
            title="Auto Update"
            status="enabled"
            description="Dependabot + automated security patches weekly"
            color={t.purple}
          />
        </div>
      </div>

      <style>{`
        @keyframes pulse-dot-repo {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </section>
  );
}
