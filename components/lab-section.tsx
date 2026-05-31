'use client';

import { useEffect, useRef, useState } from 'react';
import { CountUp } from '@/components/count-up';
import { LANGUAGES, LIGHTHOUSE, GIT_LOG as GIT_ROWS, GIT_LOG_TOTAL, LIGHTHOUSE_TARGET } from '@/data/site-content';

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

/* データ（言語比率 / Lighthouse / git log）は data/site-content.ts に集約 */

/* ─── Ring Gauge ─── */
function RingGauge({ score, color, label }: { score: number; color: string; label: string }) {
  const R = 38;
  const C = 2 * Math.PI * R;
  const offset = C - (score / 100) * C;
  const ref = useRef<SVGSVGElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
      <svg ref={ref} width={96} height={96} viewBox="0 0 96 96">
        <circle cx={48} cy={48} r={R} fill="none" stroke={T.border} strokeWidth={4} />
        <circle
          cx={48}
          cy={48}
          r={R}
          fill="none"
          stroke={color}
          strokeWidth={4}
          strokeLinecap="round"
          strokeDasharray={C}
          strokeDashoffset={visible ? offset : C}
          transform="rotate(-90 48 48)"
          style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(0.16,1,0.3,1)' }}
        />
        <text
          x={48}
          y={48}
          textAnchor="middle"
          dominantBaseline="central"
          fill={T.ink}
          fontFamily="var(--font-mono)"
          fontSize={22}
          fontWeight={600}
        >
          {visible ? <CountUp to={score} /> : '0'}
        </text>
      </svg>
      <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: T.sub, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
        {label}
      </span>
    </div>
  );
}

/* ─── Language Bar ─── */
function LangBar({ name, pct, color }: { name: string; pct: number; color: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ display: 'grid', gridTemplateColumns: '120px 1fr 48px', alignItems: 'center', gap: 16 }}>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 13, fontFamily: 'var(--font-mono)', color: T.ink }}>
        <span style={{ width: 9, height: 9, background: color, display: 'inline-block' }} />
        {name}
      </span>
      <div style={{ height: 6, background: T.border, position: 'relative', overflow: 'hidden' }}>
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            height: '100%',
            width: `${pct}%`,
            background: color,
            transform: visible ? 'scaleX(1)' : 'scaleX(0)',
            transformOrigin: 'left',
            transition: 'transform 0.8s cubic-bezier(0.16,1,0.3,1)',
          }}
        />
      </div>
      <span style={{ fontSize: 13, fontFamily: 'var(--font-mono)', color: T.ink, textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>
        {visible ? <CountUp to={pct} suffix="%" /> : '0%'}
      </span>
    </div>
  );
}

/* ─── Git Log with typewriter ─── */
function GitLog() {
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const [charCounts, setCharCounts] = useState<number[]>(GIT_ROWS.map(() => 0));
  const [currentRow, setCurrentRow] = useState(0);
  const [allDone, setAllDone] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setStarted(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started || allDone) return;

    const msg = GIT_ROWS[currentRow][1];
    if (charCounts[currentRow] >= msg.length) {
      if (currentRow < GIT_ROWS.length - 1) {
        setCurrentRow((r) => r + 1);
      } else {
        setAllDone(true);
      }
      return;
    }

    const timer = setTimeout(() => {
      setCharCounts((prev) => {
        const next = [...prev];
        next[currentRow] = prev[currentRow] + 1;
        return next;
      });
    }, 22);

    return () => clearTimeout(timer);
  }, [started, charCounts, currentRow, allDone]);

  return (
    <div
      ref={ref}
      style={{
        background: T.surface,
        border: `1px solid ${T.border}`,
        borderRadius: 0,
        padding: '28px 30px',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ width: 7, height: 7, background: T.warn, display: 'inline-block' }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: T.sub, letterSpacing: '0.06em' }}>
            git log --oneline &middot; main
          </span>
        </div>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: T.dim }}>
          showing {GIT_ROWS.length} of {GIT_LOG_TOTAL}
        </span>
      </div>

      {/* Graph rail + rows */}
      <div className="gitlog-rows" style={{ position: 'relative', paddingLeft: 24 }}>
        {/* Vertical rail */}
        <div
          style={{
            position: 'absolute',
            left: 6,
            top: 6,
            bottom: allDone ? 36 : 6,
            width: 2,
            background: `linear-gradient(to bottom, ${T.accent}, ${T.purple})`,
          }}
        />

        {GIT_ROWS.map(([sha, msg, time, author, color], i) => {
          const typed = msg.slice(0, charCounts[i]);
          const isTyping = i === currentRow && !allDone;
          const showRow = started && (i < currentRow || i === currentRow);

          return (
            <div
              key={sha}
              className="git-row"
              style={{
                display: 'grid',
                gridTemplateColumns: '14px 84px 1fr 120px 60px',
                alignItems: 'center',
                gap: 8,
                minHeight: 32,
                opacity: showRow ? 1 : 0.2,
                transition: 'opacity 0.3s',
              }}
            >
              {/* Dot */}
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: color,
                  display: 'inline-block',
                  marginLeft: -1,
                }}
              />
              {/* SHA */}
              <span className="git-sha" style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: T.dim }}>
                {sha}
              </span>
              {/* Message */}
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: T.ink, whiteSpace: 'nowrap', overflow: 'hidden' }}>
                {typed}
                {isTyping && (
                  <span
                    style={{
                      display: 'inline-block',
                      width: 7,
                      height: 14,
                      background: T.accent,
                      marginLeft: 1,
                      verticalAlign: 'text-bottom',
                      animation: 'gitCursor 0.8s step-end infinite',
                    }}
                  />
                )}
              </span>
              {/* Author */}
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: T.dim, textAlign: 'right' }}>
                {author}
              </span>
              {/* Time */}
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: T.dim, textAlign: 'right' }}>
                {time}
              </span>
            </div>
          );
        })}

        {/* Prompt line */}
        {allDone && (
          <div style={{ minHeight: 32, display: 'flex', alignItems: 'center', paddingLeft: 14 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: T.accent }}>
              $&nbsp;
            </span>
            <span
              style={{
                display: 'inline-block',
                width: 7,
                height: 14,
                background: T.accent,
                animation: 'gitCursor 0.8s step-end infinite',
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
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
          &sect;04 &mdash; Tech distribution
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
          Languages &amp; Lighthouse.
        </h2>
        <p
          style={{
            fontSize: 14,
            color: T.sub,
            fontFamily: 'var(--font-mono)',
            margin: 0,
            maxWidth: 640,
          }}
        >
          公開リポジトリのコードベースを集計し、言語別の比率と Lighthouse の最新スコアを表示しています。
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
        &#x25CF; live
      </span>
    </div>
  );
}

/* ─── Main Section ─── */
export function LabSection() {
  return (
    <section id="lab" className="sect" style={{ padding: '180px 0' }}>
      <div className="studio-container" style={{ maxWidth: 1320, margin: '0 auto', padding: '0 56px' }}>
        <SectionHead />

        {/* 12-col grid */}
        <div className="bento-12" style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 20 }}>
          {/* Left: Language bars (span 6) */}
          <div
            style={{
              gridColumn: 'span 6',
              background: T.surface,
              border: `1px solid ${T.border}`,
              borderRadius: 0,
              padding: '28px 30px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 28 }}>
              <span style={{ width: 7, height: 7, background: T.accent, display: 'inline-block' }} />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: T.sub, letterSpacing: '0.06em' }}>
                Languages &middot; share of source
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {LANGUAGES.map((l) => (
                <LangBar key={l.name} name={l.name} pct={l.pct} color={l.color} />
              ))}
            </div>
          </div>

          {/* Right: Lighthouse (span 6) */}
          <div
            style={{
              gridColumn: 'span 6',
              background: T.surface,
              border: `1px solid ${T.border}`,
              borderRadius: 0,
              padding: '28px 30px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 7, height: 7, background: T.green, display: 'inline-block' }} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: T.sub, letterSpacing: '0.06em' }}>
                  Lighthouse &middot; production
                </span>
              </div>
              <span
                style={{
                  fontSize: 10,
                  fontFamily: 'var(--font-mono)',
                  padding: '2px 8px',
                  background: `${T.green}18`,
                  color: T.green,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                }}
              >
                live
              </span>
            </div>
            <div className="lh-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 16, marginBottom: 24 }}>
              {LIGHTHOUSE.map((lh) => (
                <RingGauge key={lh.label} label={lh.label} score={lh.score} color={lh.color} />
              ))}
            </div>
            <p
              style={{
                fontSize: 10,
                fontFamily: 'var(--font-mono)',
                color: T.dim,
                margin: 0,
                textAlign: 'center',
              }}
            >
              測定: {LIGHTHOUSE_TARGET}
            </p>
          </div>

          {/* Full width: Git Log (span 12) */}
          <div style={{ gridColumn: 'span 12', marginTop: 0 }}>
            <GitLog />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes studioBarFill {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
        @keyframes gitCursor {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes studioPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </section>
  );
}
