'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import {
  ACTIVITIES,
  SKILLS,
  STUDIO_NOTE,
  STUDIO_STATS,
  MAP_LOCATION,
  ABOUT_HEADLINE,
  ABOUT_SUBTITLE,
} from '@/data/site-content';

/* ─── Design Tokens ─── */
const T = {
  bg: '#06070a', surface: '#0a0c10', surface2: '#0e1116', surface3: '#13171e',
  border: '#1a1f28', borderStrong: '#252b35', ink: '#e9edf2', sub: '#8a93a0',
  dim: '#3d4654', accent: '#b5fb6b', accentDim: '#7da848', warn: '#ffb648',
  pink: '#ff5da2', blue: '#5ecfff', green: '#69e6a6', red: '#ff5a64', purple: '#b48cff',
} as const;

/* セクションの実データ（Now Playing / Skills / Studio note / 統計 / 拠点）は
 * data/site-content.ts に集約。下記の land[] は地図の形状（演出）なのでここに残す。 */

const land = [
  '                       #      ',
  '                       #      ',
  '                       ##     ',
  '                       ###   #',
  '                    # ####### ',
  '                    ######### ',
  '                    ##########',
  '                   ########   ',
  '                   ##   ##    ',
  '                   #     #    ',
  '                   # ##       ',
  '                      #       ',
  '                    ####      ',
  '                    ####      ',
  '                   ####       ',
  '                    ###       ',
  '                   ####       ',
  '                   #####      ',
  '                 # ####       ',
  '                  #####       ',
  '              ## ######       ',
  '              # #######       ',
  '             ##########       ',
  '           ###########        ',
  '     ############## ##        ',
  '    ##############  #         ',
  '   ###     ###  #  ##         ',
  '       ###  ###               ',
  ' ##   #### ##                 ',
  '#### ###                      ',
  '####  #                       ',
  ' ###                          ',
  ' ##                           ',
  '  ##                          ',
  '  #                           ',
];
const TOKYO_X = 20, TOKYO_Y = 22;

/* ─── Styles (injected) ─── */
const ABOUT_STYLES = `
@keyframes aboutChar {
  0%   { opacity:0; filter:blur(6px); transform:translateY(8px); }
  100% { opacity:1; filter:blur(0);   transform:translateY(0); }
}
@keyframes studioPulse {
  0%   { transform:scale(1);   opacity:.7; }
  100% { transform:scale(2.6); opacity:0; }
}
@keyframes nowSwap {
  0%   { opacity:0; transform:translateY(10px); }
  15%  { opacity:1; transform:translateY(0); }
  85%  { opacity:1; transform:translateY(0); }
  100% { opacity:0; transform:translateY(-10px); }
}
@keyframes nowBar {
  0%   { transform:scaleX(0); }
  100% { transform:scaleX(1); }
}
@keyframes tickerScroll {
  0%   { transform:translateX(0); }
  100% { transform:translateX(-50%); }
}
`;

/* ─── PinnedHead ─── */
const PINNED_TITLE = ABOUT_HEADLINE;

function PinnedHead() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const charRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const subRef = useRef<HTMLDivElement>(null);
  const cueRef = useRef<HTMLDivElement>(null);

  const chars = [...PINNED_TITLE];
  const n = chars.length;

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const settle = () => {
      charRefs.current.forEach((c) => {
        if (c) { c.style.opacity = '1'; c.style.filter = 'none'; }
      });
      if (subRef.current) { subRef.current.style.opacity = '1'; subRef.current.style.transform = 'none'; }
      if (cueRef.current) cueRef.current.style.opacity = '0';
    };

    // Respect reduced-motion: resolve everything immediately, no scroll work.
    const reduced = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    if (reduced) { settle(); return; }

    let raf = 0;
    const apply = () => {
      raf = 0;
      const rect = section.getBoundingClientRect();
      const total = section.offsetHeight - window.innerHeight;
      const p = total > 0 ? Math.min(1, Math.max(0, -rect.top / total)) : 1;

      // A descending "front" sweeps through the glyphs; every character is
      // fully resolved (opacity 1 / no blur) by ~72% of the scroll.
      const front = (p / 0.72) * (n + 9);
      for (let i = 0; i < n; i++) {
        const c = charRefs.current[i];
        if (!c) continue;
        const cp = Math.min(1, Math.max(0, (front - i) / 9));
        c.style.opacity = String(0.13 + cp * 0.87);
        c.style.filter = cp > 0.96 ? 'none' : `blur(${(1 - cp) * 4}px)`;
      }

      // Subtitle fades in across p = 0.72 → 0.92.
      const sp = Math.min(1, Math.max(0, (p - 0.72) / 0.2));
      if (subRef.current) {
        subRef.current.style.opacity = String(sp);
        subRef.current.style.transform = `translateY(${(1 - sp) * 18}px)`;
      }
      if (cueRef.current) cueRef.current.style.opacity = String(Math.max(0, 1 - p * 3));
    };

    // Throttle scroll/resize work to one rAF per frame.
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(apply); };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    apply();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [n]);

  return (
    <div ref={sectionRef} style={{ height: '210vh', position: 'relative' }}>
      <div style={{
        position: 'sticky', top: 0, height: '100vh',
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
      }}>
        <div style={{
          maxWidth: 1320, margin: '0 auto', padding: '0 56px',
          width: '100%', boxSizing: 'border-box',
        }}>
          {/* Kicker */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 14,
            fontFamily: 'var(--font-mono)', fontSize: 12, color: T.accent,
            letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 32,
          }}>
            <span>§02</span>
            <span style={{ width: 28, height: 1, background: T.accent }} />
            <span>Studio brief</span>
          </div>

          {/* Title */}
          <div style={{
            fontFamily: '"Noto Sans JP", "Hiragino Kaku Gothic ProN", sans-serif',
            fontSize: 'clamp(44px, 6.2vw, 104px)', fontWeight: 600,
            color: T.ink, letterSpacing: '-0.03em', lineHeight: 1.18,
            fontFeatureSettings: '"palt"', maxWidth: '16ch',
          }}>
            {chars.map((ch, i) => (
              <span
                key={i}
                ref={(el) => { charRefs.current[i] = el; }}
                style={{
                  display: 'inline-block', whiteSpace: 'pre',
                  opacity: 0.13, willChange: 'opacity, filter',
                }}
              >{ch}</span>
            ))}
          </div>

          {/* Subtitle */}
          <div
            ref={subRef}
            style={{
              marginTop: 30, fontFamily: 'var(--font-sans)', fontSize: 18,
              color: T.sub, lineHeight: 1.7, letterSpacing: '-0.004em', maxWidth: 680,
              opacity: 0, transform: 'translateY(18px)',
            }}
          >
            {ABOUT_SUBTITLE}
          </div>

          {/* Scroll indicator */}
          <div
            ref={cueRef}
            style={{
              marginTop: 44, fontFamily: 'var(--font-mono)', fontSize: 11,
              color: T.dim, letterSpacing: '0.14em', textTransform: 'uppercase',
              display: 'flex', alignItems: 'center', gap: 10,
            }}
          >
            <span style={{ width: 7, height: 7, border: `1px solid ${T.dim}`, borderRadius: '50%' }} />
            scroll
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── NowPlaying ─── */
function NowPlaying() {
  const [idx, setIdx] = useState(0);
  const [key, setKey] = useState(0);

  useEffect(() => {
    const iv = setInterval(() => {
      setIdx(p => (p + 1) % ACTIVITIES.length);
      setKey(p => p + 1);
    }, 4800);
    return () => clearInterval(iv);
  }, []);

  const act = ACTIVITIES[idx];

  return (
    <div style={{
      background: T.surface, border: `1px solid ${T.border}`,
      padding: '20px 24px', marginBottom: 20,
    }}>
      {/* header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
        <span style={{
          width: 7, height: 7, borderRadius: '50%', background: T.green,
          boxShadow: `0 0 6px ${T.green}`,
          animation: 'studioPulse 2s infinite',
        }} />
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: 11, color: T.dim,
          textTransform: 'uppercase', letterSpacing: '0.1em',
        }}>NOW · {act.kind}</span>
      </div>

      {/* activity */}
      <div key={key} style={{ animation: 'nowSwap 4800ms ease both' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 42, height: 42, background: T.surface3,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 18, color: T.sub,
          }}>{act.icon}</div>
          <div>
            <p style={{ fontSize: 14, color: T.ink, fontWeight: 500 }}>{act.label}</p>
            <p style={{ fontSize: 11, color: T.dim, fontFamily: 'var(--font-mono)', marginTop: 2 }}>{act.src}</p>
          </div>
        </div>
      </div>

      {/* progress bar */}
      <div style={{ marginTop: 16, height: 2, background: T.border, position: 'relative' }}>
        <div key={key} style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          background: T.green, transformOrigin: 'left',
          animation: 'nowBar 4800ms linear both',
        }} />
      </div>
    </div>
  );
}

/* ─── MapDot ─── */
function MapDot() {
  const COLS = 30, ROWS = 35, CELL = 6, DOT = 4.6;
  const w = COLS * CELL, h = ROWS * CELL;

  return (
    <div style={{
      background: T.surface, border: `1px solid ${T.border}`,
      padding: '20px 24px',
    }}>
      {/* header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: T.accent }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: T.ink, fontWeight: 500 }}>{MAP_LOCATION.label}</span>
        </div>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: T.dim }}>{MAP_LOCATION.coord}</span>
      </div>

      {/* SVG map */}
      <svg viewBox={`0 0 ${w} ${h}`} width="100%" style={{ display: 'block' }}>
        {land.map((row, ry) =>
          row.split('').map((ch, cx) => {
            if (ch !== '#') return null;
            const isTokyo = cx === TOKYO_X && ry === TOKYO_Y;
            return (
              <g key={`${cx}-${ry}`}>
                <rect
                  x={cx * CELL + (CELL - DOT) / 2}
                  y={ry * CELL + (CELL - DOT) / 2}
                  width={DOT} height={DOT}
                  fill={isTokyo ? T.accent : T.dim}
                  opacity={isTokyo ? 1 : 0.45}
                />
                {isTokyo && (
                  <>
                    <circle cx={cx * CELL + CELL / 2} cy={ry * CELL + CELL / 2} r={4} fill={T.accent} />
                    <circle cx={cx * CELL + CELL / 2} cy={ry * CELL + CELL / 2} r={8} fill="none" stroke={T.accent} strokeWidth={0.6} opacity={0.6}>
                      <animate attributeName="r" from="4" to="14" dur="2s" repeatCount="indefinite" />
                      <animate attributeName="opacity" from="0.7" to="0" dur="2s" repeatCount="indefinite" />
                    </circle>
                    <circle cx={cx * CELL + CELL / 2} cy={ry * CELL + CELL / 2} r={8} fill="none" stroke={T.accent} strokeWidth={0.4} opacity={0.4}>
                      <animate attributeName="r" from="6" to="20" dur="2.5s" repeatCount="indefinite" />
                      <animate attributeName="opacity" from="0.5" to="0" dur="2.5s" repeatCount="indefinite" />
                    </circle>
                  </>
                )}
              </g>
            );
          })
        )}
      </svg>

      {/* footer */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        marginTop: 14, fontFamily: 'var(--font-mono)', fontSize: 11, color: T.dim,
      }}>
        <div style={{ display: 'flex', gap: 16 }}>
          <span>{MAP_LOCATION.ping}</span>
          <span>{MAP_LOCATION.uptime}</span>
        </div>
        <span style={{ color: T.accent }}>● live</span>
      </div>
    </div>
  );
}

/* ─── StudioNoteCard ─── */
function StudioNoteCard() {
  const [langMode, setLangMode] = useState<'jp' | 'en'>('jp');
  const [animKey, setAnimKey] = useState(0);
  const text = langMode === 'jp' ? STUDIO_NOTE.jp : STUDIO_NOTE.en;

  const toggleLang = useCallback((l: 'jp' | 'en') => {
    setLangMode(l);
    setAnimKey(p => p + 1);
  }, []);

  return (
    <div style={{
      background: T.surface, border: `1px solid ${T.border}`,
      padding: '40px 44px 36px', minHeight: 380,
    }}>
      {/* meta strip */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24,
      }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: T.accent, letterSpacing: '0.08em' }}>
          §01 — Studio note
        </span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: T.dim }}>
          {STUDIO_NOTE.revision}
        </span>
      </div>

      {/* lang toggle */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 32 }}>
        {(['jp', 'en'] as const).map(l => (
          <button key={l} onClick={() => toggleLang(l)} style={{
            padding: '5px 14px', border: 'none', cursor: 'pointer',
            fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.06em',
            background: langMode === l ? T.accent : 'transparent',
            color: langMode === l ? T.bg : T.sub,
            textTransform: 'uppercase',
          }}>{l}</button>
        ))}
      </div>

      {/* body text with char pop-in */}
      <div key={animKey} style={{ marginBottom: 36 }}>
        <p style={{
          fontSize: langMode === 'jp' ? 'clamp(18px, 2.2vw, 26px)' : 'clamp(16px, 1.8vw, 22px)',
          lineHeight: 1.9,
          color: T.ink,
          fontFamily: langMode === 'jp'
            ? '"Noto Sans JP", "Hiragino Kaku Gothic ProN", sans-serif'
            : 'var(--font-sans)',
          fontWeight: 400,
        }}>
          {text.split('').map((ch, i) => (
            <span key={i} style={{
              display: 'inline-block',
              animation: `aboutChar 0.45s ease both`,
              animationDelay: `${i * 13}ms`,
              whiteSpace: ch === ' ' ? 'pre' : undefined,
            }}>{ch}</span>
          ))}
        </p>
      </div>

      {/* attribution */}
      <p style={{
        fontFamily: 'var(--font-mono)', fontSize: 12, color: T.dim, marginBottom: 40,
      }}>
        {STUDIO_NOTE.attribution}
      </p>

      {/* stats grid */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0,
        borderTop: `1px solid ${T.border}`,
      }}>
        {STUDIO_STATS.map((s, i) => (
          <div key={s.label} style={{
            padding: '20px 0',
            borderRight: i < 2 ? `1px solid ${T.border}` : 'none',
            paddingLeft: i > 0 ? 20 : 0,
          }}>
            <span style={{
              display: 'block', fontFamily: 'var(--font-mono)', fontSize: 10,
              color: T.dim, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6,
            }}>{s.label}</span>
            <span style={{
              display: 'block', fontFamily: 'sans-serif', fontSize: 28, fontWeight: 600, color: T.ink,
            }}>{s.value}</span>
            {s.note && (
              <span style={{
                display: 'block', fontFamily: 'var(--font-mono)', fontSize: 11, color: T.dim, marginTop: 4,
              }}>{s.note}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── SkillCard (flip card) ─── */
function SkillCard({ skill, index }: { skill: typeof SKILLS[number]; index: number }) {
  const [flipped, setFlipped] = useState(false);
  const color = skill.color;
  const score = skill.score;

  return (
    <div
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      style={{
        width: 360, height: 252, flexShrink: 0,
        perspective: 1600, cursor: 'default',
      }}
    >
      <div style={{
        width: '100%', height: '100%', position: 'relative',
        transformStyle: 'preserve-3d',
        transition: 'transform 0.5s ease',
        transform: flipped ? 'rotateY(180deg)' : 'rotateY(0)',
      }}>
        {/* Front */}
        <div style={{
          position: 'absolute', inset: 0, backfaceVisibility: 'hidden',
          background: T.surface, border: `1px solid ${T.border}`,
          padding: '28px 28px 24px', display: 'flex', flexDirection: 'column',
        }}>
          {/* badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            marginBottom: 18,
          }}>
            <span style={{
              width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: `${color}18`, border: `1px solid ${color}44`,
              fontFamily: 'var(--font-mono)', fontSize: 13, color, fontWeight: 600,
            }}>{String(index + 1).padStart(2, '0')}</span>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: 11, color: T.dim,
              letterSpacing: '0.08em',
            }}>{score}/100</span>
          </div>

          <h4 style={{
            fontSize: 22, fontWeight: 600, color: T.ink, marginBottom: 14,
            fontFamily: '"Noto Sans JP", "Hiragino Kaku Gothic ProN", sans-serif',
          }}>{skill.label}</h4>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 'auto' }}>
            {skill.stack.map(tag => (
              <span key={tag} style={{
                fontSize: 11, padding: '3px 8px',
                background: T.surface3, border: `1px solid ${T.border}`,
                color: T.sub, fontFamily: 'var(--font-mono)',
              }}>{tag}</span>
            ))}
          </div>

          <span style={{ fontSize: 11, color: T.dim, fontFamily: 'var(--font-mono)', marginTop: 12 }}>
            hover で全スタックを表示
          </span>
        </div>

        {/* Back */}
        <div style={{
          position: 'absolute', inset: 0, backfaceVisibility: 'hidden',
          transform: 'rotateY(180deg)',
          background: T.surface, border: `1px solid ${color}44`,
          padding: '28px 28px 24px', display: 'flex', flexDirection: 'column',
          overflow: 'auto',
        }}>
          <h4 style={{
            fontSize: 14, fontWeight: 600, color, marginBottom: 16,
            fontFamily: 'var(--font-mono)', letterSpacing: '0.04em',
          }}>{skill.label}</h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {skill.langs.map(lang => (
              <span key={lang} style={{
                fontSize: 12, padding: '4px 10px',
                background: `${color}0a`, border: `1px solid ${color}33`,
                color: T.ink, fontFamily: 'var(--font-mono)',
              }}>{lang}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── SkillCarousel ─── */
function SkillCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);

  return (
    <div style={{ marginTop: 0 }}>
      {/* header */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        marginBottom: 28, padding: '0 56px', maxWidth: 1320, margin: '0 auto 28px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: T.dim }}>—— Skills</span>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: 11, padding: '2px 8px',
            background: T.surface2, color: T.sub,
          }}>4 fields</span>
        </div>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: T.dim }}>
          auto · hover で停止 + 反転
        </span>
      </div>

      {/* marquee */}
      <div className="studio-marquee" style={{
        overflow: 'hidden', width: '100%', position: 'relative',
      }}>
        {/* fade edges */}
        <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: 80, background: `linear-gradient(to right, ${T.bg}, transparent)`, zIndex: 1, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: 80, background: `linear-gradient(to left, ${T.bg}, transparent)`, zIndex: 1, pointerEvents: 'none' }} />

        <div ref={trackRef} className="studio-marquee-track" style={{
          display: 'flex', width: 'max-content', gap: 20,
          animation: 'tickerScroll 36s linear infinite',
        }}>
          {[...SKILLS, ...SKILLS, ...SKILLS, ...SKILLS].map((skill, i) => (
            <SkillCard key={`${skill.label}-${i}`} skill={skill} index={i % SKILLS.length} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Main Export ─── */
export function AboutSection() {
  return (
    <section id="about" style={{ background: T.bg }}>
      <style>{ABOUT_STYLES}{`
        .studio-marquee:hover .studio-marquee-track {
          animation-play-state: paused;
        }
      `}</style>

      {/* 1. PinnedHead */}
      <PinnedHead />

      {/* 2. Content Grid */}
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 56px 180px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '7fr 5fr', gap: 48 }}>
          {/* Left: studio note */}
          <StudioNoteCard />

          {/* Right: widgets */}
          <div>
            <NowPlaying />
            <MapDot />
          </div>
        </div>
      </div>

      {/* 3. SkillCarousel */}
      <div style={{ paddingBottom: 120 }}>
        <SkillCarousel />
      </div>
    </section>
  );
}
