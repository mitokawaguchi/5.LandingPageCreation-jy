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
      <div style={{ position: 'relative', width: 96, height: 96 }}>
        <svg
          ref={ref}
          width={96}
          height={96}
          viewBox="0 0 96 96"
          style={{
            display: 'block',
            transform: visible ? 'rotate(0deg)' : 'rotate(-140deg)',
            transition: 'transform 1.5s cubic-bezier(0.2,0.7,0.2,1)',
          }}
        >
          <circle cx={48} cy={48} r={R} fill="none" stroke={T.surface3} strokeWidth={5} />
          <circle
            cx={48}
            cy={48}
            r={R}
            fill="none"
            stroke={color}
            strokeWidth={5}
            strokeLinecap="round"
            strokeDasharray={C}
            strokeDashoffset={visible ? offset : C}
            transform="rotate(-90 48 48)"
            style={{ transition: 'stroke-dashoffset 1.5s cubic-bezier(0.2,0.7,0.2,1)' }}
          />
        </svg>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'var(--font-sans)',
            fontSize: 22,
            fontWeight: 600,
            color: T.ink,
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {visible ? <CountUp to={score} /> : '0'}
        </div>
      </div>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: T.sub, letterSpacing: 0.8 }}>{label}</span>
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
    <div ref={ref} style={{ display: 'grid', gridTemplateColumns: '140px 1fr 60px', gap: 18, alignItems: 'center', padding: '12px 0' }}>
      <span style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: T.ink, display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ width: 9, height: 9, background: color, display: 'inline-block' }} />
        {name}
      </span>
      <span style={{ position: 'relative', height: 8, background: T.surface3, display: 'block' }}>
        <span
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: visible ? `${pct}%` : '0%',
            background: color,
            transition: 'width 1.4s cubic-bezier(0.2,0.7,0.2,1)',
            display: 'block',
          }}
        />
      </span>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: T.sub, textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>
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
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          fontFamily: 'var(--font-mono)',
          fontSize: 10,
          color: T.sub,
          letterSpacing: 1.2,
          textTransform: 'uppercase',
          marginBottom: 18,
        }}
      >
        <span style={{ width: 6, height: 6, background: T.warn, display: 'inline-block' }} />
        git log --oneline &middot; main
        <span style={{ flex: 1, height: 1, background: T.border }} />
        <span>showing {GIT_ROWS.length} of {GIT_LOG_TOTAL}</span>
      </div>

      {/* Graph rail + rows */}
      <div className="gitlog-rows" style={{ position: 'relative' }}>

        {GIT_ROWS.map(([sha, msg, time, author, color], i) => {
          const typed = msg.slice(0, charCounts[i]);
          const rowDone = charCounts[i] >= msg.length;
          const isTyping = i === currentRow && !rowDone;
          const showRow = started && (i < currentRow || (i === currentRow && charCounts[i] > 0) || allDone);

          return (
            <div
              key={sha}
              className="git-row"
              style={{
                display: 'grid',
                gridTemplateColumns: '14px 84px 1fr 120px 60px',
                alignItems: 'center',
                gap: 16,
                padding: '12px 0',
                borderTop: i === 0 ? 'none' : `1px solid ${T.border}`,
                fontFamily: 'var(--font-mono)',
                fontSize: 12.5,
                color: T.ink,
                opacity: showRow ? 1 : 0.18,
                transition: 'opacity 0.3s ease',
              }}
            >
              {/* Dot */}
              <span
                style={{
                  color,
                  position: 'relative',
                  zIndex: 1,
                  textShadow: showRow ? `0 0 6px ${color}` : 'none',
                }}
              >
                &#x25CF;
              </span>
              {/* SHA */}
              <span className="git-sha" style={{ color: T.warn, fontVariantNumeric: 'tabular-nums' }}>
                {sha}
              </span>
              {/* Message */}
              <span style={{ color: T.ink }}>
                {typed}
                {isTyping && (
                  <span
                    style={{
                      display: 'inline-block',
                      width: 7,
                      height: 13,
                      marginLeft: 1,
                      verticalAlign: 'text-bottom',
                      background: T.accent,
                      animation: 'gitCursor 1.05s steps(1) infinite',
                    }}
                  />
                )}
              </span>
              {/* Author */}
              <span style={{ color: T.sub, fontSize: 11 }}>@{author}</span>
              {/* Time */}
              <span style={{ color: T.dim, fontSize: 11, textAlign: 'right' }}>{time}</span>
            </div>
          );
        })}
      </div>

      {/* Prompt line */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          paddingTop: 14,
          fontFamily: 'var(--font-mono)',
          fontSize: 12.5,
          color: T.sub,
          opacity: allDone ? 1 : 0,
          transition: 'opacity 0.4s ease',
        }}
      >
        <span style={{ color: T.green }}>$</span>
        <span
          style={{
            width: 8,
            height: 14,
            background: T.accent,
            animation: 'gitCursor 1.05s steps(1) infinite',
          }}
        />
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
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            color: T.accent,
            letterSpacing: 1.4,
            textTransform: 'uppercase',
            marginBottom: 14,
          }}
        >
          <span>&sect;04</span>
          <span style={{ width: 24, height: 1, background: T.accent }} />
          <span>Tech distribution</span>
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
          Languages &amp; Lighthouse.
        </div>
        <div
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 16,
            color: T.sub,
            marginTop: 14,
            maxWidth: 720,
            lineHeight: 1.65,
          }}
        >
          公開リポジトリのコードベースを集計し、言語別の比率と Lighthouse の最新スコアを表示しています。
        </div>
      </div>
      <div
        style={{
          flexShrink: 0,
          paddingBottom: 6,
          fontFamily: 'var(--font-mono)',
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
              minHeight: 340,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                fontFamily: 'var(--font-mono)',
                fontSize: 10,
                color: T.sub,
                letterSpacing: 1.2,
                textTransform: 'uppercase',
                marginBottom: 20,
              }}
            >
              <span style={{ width: 6, height: 6, background: T.accent, display: 'inline-block' }} />
              Languages &middot; share of source
              <span style={{ flex: 1, height: 1, background: T.border }} />
            </div>
            <div>
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
              minHeight: 340,
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                fontFamily: 'var(--font-mono)',
                fontSize: 10,
                color: T.sub,
                letterSpacing: 1.2,
                textTransform: 'uppercase',
                marginBottom: 20,
              }}
            >
              <span style={{ width: 6, height: 6, background: T.green, display: 'inline-block' }} />
              Lighthouse &middot; production
              <span style={{ flex: 1, height: 1, background: T.border }} />
              <span style={{ color: T.green }}>live</span>
            </div>
            <div className="lh-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 16, marginTop: 8 }}>
              {LIGHTHOUSE.map((lh) => (
                <RingGauge key={lh.label} label={lh.label} score={lh.score} color={lh.color} />
              ))}
            </div>
            <div
              style={{
                marginTop: 22,
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                color: T.sub,
                lineHeight: 1.7,
              }}
            >
              測定: <span style={{ color: T.ink }}>{LIGHTHOUSE_TARGET.split(' · ')[0]}</span> · {LIGHTHOUSE_TARGET.split(' · ').slice(1).join(' · ')}
            </div>
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
