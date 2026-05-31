'use client';

import { useEffect, useRef, useState } from 'react';
import { Sparkline } from '@/components/sparkline';
import { ARTICLES } from '@/data/site-content';

/* ─── Design Tokens ─── */
const T = { bg:'#06070a', surface:'#0a0c10', surface2:'#0e1116', surface3:'#13171e', border:'#1a1f28', borderStrong:'#252b35', ink:'#e9edf2', sub:'#8a93a0', dim:'#3d4654', accent:'#b5fb6b', accentDim:'#7da848', warn:'#ffb648', pink:'#ff5da2', blue:'#5ecfff', green:'#69e6a6', red:'#ff5a64', purple:'#b48cff' };

/* 記事データ（source/title/likes/impressions/date/url）は data/site-content.ts に集約 */

const series = (seed: number, n = 28, base = 50, amp = 30) =>
  Array.from({ length: n }, (_, i) => base + Math.sin(i * 0.4 + seed) * amp + Math.cos(i * 0.7 + seed * 1.3) * amp * 0.4);

/* ─── CountUp ─── */
function CountUp({ end, duration = 1200 }: { end: number; duration?: number }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        obs.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / duration, 1);
          setVal(Math.round(end * t));
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [end, duration]);

  return <span ref={ref}>{val.toLocaleString()}</span>;
}

/* ─── Article Card ─── */
function ArticleCard({ article, idx }: { article: typeof ARTICLES[number]; idx: number }) {
  const borderColor = article.source === 'Zenn' ? T.blue : T.green;
  const sparkColor = article.source === 'Zenn' ? T.blue : T.green;

  return (
    <div className="studio-tile writing-card" style={{
      flex: '0 0 380px',
      minHeight: 320,
      background: T.surface,
      border: `1px solid ${T.border}`,
      borderRadius: 0,
      padding: '28px 32px',
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
    }}>
      {/* Source badge */}
      <span style={{
        alignSelf: 'flex-start',
        fontSize: 10,
        fontFamily: 'var(--font-mono)',
        padding: '3px 10px',
        border: `1px solid ${borderColor}`,
        color: borderColor,
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
        fontWeight: 600,
      }}>
        {article.source}
      </span>

      {/* Title */}
      <h4 style={{
        fontSize: 20,
        fontWeight: 600,
        color: T.ink,
        lineHeight: 1.5,
        fontFamily: '"Noto Sans JP", "Hiragino Kaku Gothic ProN", sans-serif',
        margin: 0,
      }}>
        {article.title}
      </h4>

      {/* Sparkline */}
      <Sparkline values={series(idx + 1)} color={sparkColor} width={320} height={36} />

      {/* 3-col stats */}
      <div style={{ display: 'flex', gap: 24, marginTop: 'auto' }}>
        {[
          { label: 'likes', value: article.likes },
          { label: 'imp', value: article.impressions },
          { label: 'open', value: Math.round(article.impressions * 0.12) },
        ].map((s) => (
          <div key={s.label}>
            <span style={{ display: 'block', fontSize: 10, color: T.dim, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>
              {s.label}
            </span>
            <span style={{ fontSize: 18, fontWeight: 600, color: T.ink, fontFamily: 'var(--font-mono)' }}>
              <CountUp end={s.value} />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Seamless Marquee ─── */
function ArticlesMarquee() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const tripled = [...ARTICLES, ...ARTICLES, ...ARTICLES];
  const cardW = 380;
  const gap = 20;
  const setW = ARTICLES.length * (cardW + gap);

  return (
    <div
      style={{ overflow: 'hidden', width: '100%', position: 'relative', marginTop: 32 }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        ref={trackRef}
        style={{
          display: 'flex',
          width: 'max-content',
          gap,
          animation: `writing-marquee ${35}s linear infinite`,
          animationPlayState: paused ? 'paused' : 'running',
        }}
      >
        {tripled.map((a, i) => (
          <ArticleCard key={`${a.title}-${i}`} article={a} idx={i % ARTICLES.length} />
        ))}
      </div>

      <style>{`
        @keyframes writing-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-${setW}px); }
        }
      `}</style>
    </div>
  );
}

/* ─── Main Section ─── */
export function WritingSection() {
  return (
    <section id="writing" className="sect" style={{ background: T.surface2, padding: '180px 0' }}>
      <div className="studio-container" style={{ maxWidth: 1320, margin: '0 auto', padding: '0 56px' }}>
        {/* SectionHead */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: T.dim, letterSpacing: '0.08em' }}>§05 — Writing</span>
        </div>

        <h2 style={{
          fontSize: 'clamp(32px, 4vw, 52px)',
          fontWeight: 800,
          color: T.ink,
          marginBottom: 12,
          fontFamily: '"Noto Sans JP", "Hiragino Kaku Gothic ProN", sans-serif',
        }}>
          執筆記事
        </h2>

        <p style={{ fontSize: 14, color: T.sub, marginBottom: 8, fontFamily: 'var(--font-mono)', maxWidth: 600 }}>
          Zenn と Qiita に公開している技術記事を、いいね数またはインプレッション数の高い順に最大3件表示します。
        </p>

        {/* Action indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 32 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: T.dim }}>
            last_sync 2m ago
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: T.dim }}>·</span>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: T.green, display: 'inline-block' }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: T.green }}>OK</span>
        </div>

        {/* Sub header row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: T.dim }}>—— Articles</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: T.sub }}>3 posts · auto-sync monthly</span>
          </div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: T.dim }}>auto · hover to pause</span>
        </div>

        {/* Marquee */}
        <ArticlesMarquee />
      </div>
    </section>
  );
}
