'use client';

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

/* ─── Articles Data ─── */
const ARTICLES = [
  {
    source: 'Zenn' as const,
    title: 'Next.js App Router で next-intl を使い倒す',
    likes: 42,
    impressions: 1280,
    date: '2026-02-18',
    url: 'https://zenn.dev/mitokawaguchi/articles/nextjs-next-intl',
  },
  {
    source: 'Qiita' as const,
    title: 'デザインシステムを CSS Variables だけで構築する',
    likes: 28,
    impressions: 980,
    date: '2026-01-09',
    url: 'https://qiita.com/mitokawaguchi/items/css-variables-design-system',
  },
  {
    source: 'Zenn' as const,
    title: 'TypeScript で堅牢な i18n を設計する',
    likes: 19,
    impressions: 612,
    date: '2025-12-22',
    url: 'https://zenn.dev/mitokawaguchi/articles/typescript-i18n',
  },
];

/* Sparkline placeholder data per article */
const SPARK_DATA = [
  [3, 7, 5, 12, 9, 15, 11, 18, 14, 20, 17, 22, 19, 25, 21, 28],
  [2, 4, 6, 5, 9, 7, 11, 8, 13, 10, 12, 14, 11, 16, 13, 18],
  [1, 3, 2, 5, 4, 7, 5, 8, 6, 9, 7, 10, 8, 11, 9, 12],
];

function getSourceColor(source: 'Zenn' | 'Qiita'): string {
  return source === 'Zenn' ? t.blue : t.green;
}

/* ─── Article Card ─── */
function ArticleCard({ article, index }: { article: typeof ARTICLES[number]; index: number }) {
  const sourceColor = getSourceColor(article.source);

  return (
    <a
      href={article.url}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        minWidth: 360,
        padding: '28px 32px',
        background: t.surface,
        border: `1px solid ${t.border}`,
        borderRadius: 14,
        flexShrink: 0,
        textDecoration: 'none',
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        transition: 'border-color 0.2s, transform 0.2s',
      }}
    >
      {/* Top: source badge + date */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{
          fontSize: 10,
          fontFamily: 'var(--font-mono)',
          padding: '3px 10px',
          borderRadius: 4,
          background: `${sourceColor}15`,
          color: sourceColor,
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          fontWeight: 600,
        }}>
          {article.source}
        </span>
        <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: t.dim }}>
          {article.date}
        </span>
      </div>

      {/* Title */}
      <h4 style={{
        fontSize: 15,
        fontWeight: 600,
        color: t.ink,
        lineHeight: 1.5,
        fontFamily: '"Noto Sans JP", "Hiragino Kaku Gothic ProN", sans-serif',
      }}>
        {article.title}
      </h4>

      {/* Sparkline */}
      <Sparkline values={SPARK_DATA[index]} color={sourceColor} width={140} height={28} />

      {/* Stats */}
      <div style={{ display: 'flex', gap: 20, marginTop: 'auto' }}>
        <div>
          <span style={{ display: 'block', fontSize: 10, color: t.dim, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            likes
          </span>
          <span style={{ fontSize: 16, fontWeight: 600, color: t.ink, fontFamily: 'var(--font-mono)' }}>
            {article.likes}
          </span>
        </div>
        <div>
          <span style={{ display: 'block', fontSize: 10, color: t.dim, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            impressions
          </span>
          <span style={{ fontSize: 16, fontWeight: 600, color: t.ink, fontFamily: 'var(--font-mono)' }}>
            {article.impressions.toLocaleString()}
          </span>
        </div>
      </div>
    </a>
  );
}

/* ─── Articles Marquee ─── */
function ArticlesMarquee() {
  const doubled = [...ARTICLES, ...ARTICLES, ...ARTICLES];

  return (
    <div style={{ overflow: 'hidden', width: '100%', position: 'relative', marginTop: 48 }}>
      {/* Fade masks */}
      <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: 100, background: `linear-gradient(to right, ${t.bg}, transparent)`, zIndex: 1, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: 100, background: `linear-gradient(to left, ${t.bg}, transparent)`, zIndex: 1, pointerEvents: 'none' }} />

      <div
        style={{
          display: 'flex',
          width: 'max-content',
          gap: 24,
          animation: 'articles-marquee 35s linear infinite',
        }}
      >
        {doubled.map((article, i) => (
          <ArticleCard key={`${article.title}-${i}`} article={article} index={i % ARTICLES.length} />
        ))}
      </div>

      <style>{`
        @keyframes articles-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-384px * 3 - 24px * 3)); }
        }
      `}</style>
    </div>
  );
}

/* ─── Main Section ─── */
export function WritingSection() {
  return (
    <section id="articles" style={{ background: t.bg, padding: '180px 0' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 56px' }}>
        {/* Section header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: t.dim, letterSpacing: '0.08em' }}>§05</span>
          <span style={{ width: 24, height: 1, background: t.dim, display: 'inline-block' }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: t.sub, letterSpacing: '0.04em' }}>Writing</span>
        </div>

        <h2 style={{
          fontSize: 'clamp(32px, 4vw, 52px)',
          fontWeight: 800,
          color: t.ink,
          marginBottom: 12,
          fontFamily: '"Noto Sans JP", "Hiragino Kaku Gothic ProN", sans-serif',
        }}>
          執筆記事
        </h2>

        <p style={{ fontSize: 14, color: t.sub, marginBottom: 0, fontFamily: 'var(--font-mono)', maxWidth: 480 }}>
          Technical writing on Zenn and Qiita — sharing learnings from production builds
        </p>

        {/* Marquee */}
        <ArticlesMarquee />

        {/* Summary stats */}
        <div style={{ display: 'flex', gap: 32, marginTop: 40 }}>
          {[
            { label: 'Total articles', value: '3' },
            { label: 'Total likes', value: '89' },
            { label: 'Platforms', value: 'Zenn · Qiita' },
          ].map((stat) => (
            <div key={stat.label}>
              <span style={{ display: 'block', fontSize: 10, color: t.dim, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>
                {stat.label}
              </span>
              <span style={{ fontSize: 14, fontWeight: 500, color: t.sub, fontFamily: 'var(--font-mono)' }}>
                {stat.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
