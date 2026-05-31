'use client';

import { useEffect, useRef, useState } from 'react';
import { Sparkline } from '@/components/sparkline';
import { ARTICLES } from '@/data/site-content';

/* ─── Design Tokens ─── */
const T = { bg:'#06070a', surface:'#0a0c10', surface2:'#0e1116', surface3:'#13171e', border:'#1a1f28', borderStrong:'#252b35', ink:'#e9edf2', sub:'#8a93a0', dim:'#3d4654', accent:'#b5fb6b', accentDim:'#7da848', warn:'#ffb648', pink:'#ff5da2', blue:'#5ecfff', green:'#69e6a6', red:'#ff5a64', purple:'#b48cff' };

const monoFam = 'var(--font-mono)';
const sansFam = 'var(--font-sans)';

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

/* ─── SmallStat ─── */
function SmallStat({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <div style={{ fontFamily: monoFam, fontSize: 10, color: T.dim, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 4 }}>
        {label}
      </div>
      <div style={{ fontFamily: monoFam, fontSize: 18, fontWeight: 600, color: T.ink }}>
        {value}
      </div>
    </div>
  );
}

/* ─── Writing Card ─── */
function WritingCard({ a, i }: { a: typeof ARTICLES[number]; i: number }) {
  const accent = a.source === 'Zenn' ? T.blue : T.green;
  const fillCol = a.source === 'Zenn' ? 'rgba(94,207,255,.10)' : 'rgba(105,230,166,.10)';

  return (
    <a
      href={a.url || '#'}
      target="_blank"
      rel="noopener noreferrer"
      className="studio-tile writing-card"
      style={{
        background: T.surface,
        border: `1px solid ${T.border}`,
        padding: '28px 30px',
        minHeight: 320,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
        transition: 'transform .25s, border-color .25s, box-shadow .25s',
        textDecoration: 'none',
        color: T.ink,
        flex: '0 0 380px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: monoFam, fontSize: 10, letterSpacing: 1.2, textTransform: 'uppercase' }}>
        <span style={{
          padding: '3px 8px', color: accent,
          border: `1px solid ${accent}`, fontWeight: 700,
        }}>{a.source}</span>
        <span style={{ flex: 1, height: 1, background: T.border }} />
        <span style={{ color: T.dim }}>{a.date}</span>
      </div>
      <div style={{ fontFamily: sansFam, fontSize: 20, color: T.ink, fontWeight: 600, lineHeight: 1.4, letterSpacing: '-0.012em' }}>{a.title}</div>
      <div style={{ flex: 1 }} />
      <Sparkline values={series(i * 11 + 3, 32, 30, 18)} color={accent} fill={fillCol} width={320} height={36} stroke={1.5} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, paddingTop: 14, borderTop: `1px solid ${T.border}` }}>
        <SmallStat label="likes" value={<CountUp end={a.likes} />} />
        <SmallStat label="imp" value={<CountUp end={a.impressions} />} />
        <SmallStat label="open" value={<span style={{ color: T.accent }}>↗</span>} />
      </div>
    </a>
  );
}

/* ─── Main Section ─── */
export function WritingSection() {
  const articles = ARTICLES;
  // duration tuned to card-set width for a ticker-like glide (~44px/s)
  const setWidth = articles.length * (380 + 20);
  const dur = Math.round(setWidth / 44);

  return (
    <section id="writing" className="sect" style={{ padding: '180px 0', background: T.surface2 }}>
      <div className="studio-container" style={{ maxWidth: 1320, margin: '0 auto', padding: '0 56px' }}>
        {/* SectionHead */}
        <div style={{
          display: 'flex', alignItems: 'flex-end', gap: 24, justifyContent: 'space-between',
          marginBottom: 88, paddingBottom: 28, borderBottom: `1px solid ${T.border}`,
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontFamily: monoFam, fontSize: 11, color: T.accent, letterSpacing: 1.4, textTransform: 'uppercase', marginBottom: 14 }}>
              <span>§05</span>
              <span style={{ width: 24, height: 1, background: T.accent }} />
              <span>Writing</span>
            </div>
            <div style={{
              fontFamily: "'Geist', 'Noto Sans JP', system-ui, 'Hiragino Kaku Gothic ProN', sans-serif",
              fontSize: 'clamp(36px, 3.4vw, 50px)', fontWeight: 500,
              color: T.ink, letterSpacing: '-0.018em', lineHeight: 1.3,
              fontFeatureSettings: '"palt"',
            }}>執筆記事</div>
            <div style={{ fontFamily: sansFam, fontSize: 16, color: T.sub, marginTop: 14, maxWidth: 720, lineHeight: 1.65 }}>
              Zenn と Qiita に公開している技術記事を、いいね数またはインプレッション数の高い順に最大3件表示します。
            </div>
          </div>
          <div style={{ flexShrink: 0, paddingBottom: 6, fontFamily: monoFam, fontSize: 11, color: T.sub, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span>last_sync</span>
            <span style={{ color: T.ink }}>2m ago</span>
            <span style={{ width: 1, height: 12, background: T.border }} />
            <span style={{ color: T.green }}>● OK</span>
          </div>
        </div>

        {/* Sub header row */}
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 18, marginBottom: 20 }}>
          <div style={{ fontFamily: monoFam, fontSize: 11, color: T.accent, letterSpacing: 1.4, textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 12 }}>
            <span>—— Articles</span>
            <span style={{ color: T.dim }}>{articles.length} posts · auto-sync monthly</span>
          </div>
          <span style={{ flex: 1 }} />
          <div style={{ fontFamily: monoFam, fontSize: 10, color: T.dim, letterSpacing: 1.2, textTransform: 'uppercase' }}>auto · hover to pause</div>
        </div>

        {/* seamless marquee track (same motion as the top ticker) */}
        <div className="studio-marquee">
          <div className="studio-marquee-track" style={{ animationDuration: `${dur}s` }}>
            {articles.map((a, i) => (
              <div key={`a${i}`} style={{ flex: '0 0 auto', marginRight: 20 }}><WritingCard a={a} i={i} /></div>
            ))}
            {articles.map((a, i) => (
              <div key={`b${i}`} style={{ flex: '0 0 auto', marginRight: 20 }}><WritingCard a={a} i={i} /></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
