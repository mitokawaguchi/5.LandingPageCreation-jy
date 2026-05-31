'use client';

import { useState, useEffect, useRef } from 'react';
import { Reveal } from '@/components/reveal';
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

const monoFam = 'var(--font-mono)';
const sansFam = 'var(--font-sans)';
const jpFam = '"Noto Sans JP", "Hiragino Kaku Gothic ProN", sans-serif';

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
function PinnedHead({ num, kicker, title, sub }: { num: string; kicker: string; title: string; sub: string }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const charRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const subRef = useRef<HTMLDivElement>(null);
  const cueRef = useRef<HTMLDivElement>(null);

  const chars = [...title];
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
        <div className="studio-container" style={{
          maxWidth: 1320, margin: '0 auto', padding: '0 56px',
          width: '100%', boxSizing: 'border-box',
        }}>
          {/* Kicker */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 14,
            fontFamily: monoFam, fontSize: 12, color: T.accent,
            letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 32,
          }}>
            <span>§{num}</span>
            <span style={{ width: 28, height: 1, background: T.accent }} />
            <span>{kicker}</span>
          </div>

          {/* Title */}
          <div style={{
            fontFamily: "'Geist', 'Noto Sans JP', system-ui, 'Hiragino Kaku Gothic ProN', sans-serif",
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
          {sub && (
            <div
              ref={subRef}
              style={{
                marginTop: 30, fontFamily: sansFam, fontSize: 18,
                color: T.sub, lineHeight: 1.7, letterSpacing: '-0.004em', maxWidth: 680,
                opacity: 0,
              }}
            >
              {sub}
            </div>
          )}

          {/* Scroll indicator */}
          <div
            ref={cueRef}
            style={{
              marginTop: 44, fontFamily: monoFam, fontSize: 11,
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
function NowPlaying({ style }: { style?: React.CSSProperties }) {
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
      padding: '20px 24px', ...style,
    }}>
      {/* header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
        <span style={{
          width: 7, height: 7, borderRadius: '50%', background: T.green,
          boxShadow: `0 0 6px ${T.green}`,
          animation: 'studioPulse 2s infinite',
        }} />
        <span style={{
          fontFamily: monoFam, fontSize: 11, color: T.dim,
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
            <p style={{ fontSize: 11, color: T.dim, fontFamily: monoFam, marginTop: 2 }}>{act.src}</p>
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
          <span style={{ fontFamily: monoFam, fontSize: 12, color: T.ink, fontWeight: 500 }}>{MAP_LOCATION.label}</span>
        </div>
        <span style={{ fontFamily: monoFam, fontSize: 11, color: T.dim }}>{MAP_LOCATION.coord}</span>
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
        marginTop: 14, fontFamily: monoFam, fontSize: 11, color: T.dim,
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

/* ─── SkillCarousel ─── */
function SkillCarousel({ skills }: { skills: typeof SKILLS }) {
  const skillColor = [T.accent, T.warn, T.blue, T.purple];
  const skillScore = [92, 88, 81, 76];

  const Card = (s: typeof SKILLS[number], i: number, dupKey: string) => (
    <div key={dupKey} className="skill-flip">
      <div className="skill-flip-inner">
        {/* FRONT */}
        <div className="skill-face" style={{ padding: '28px 28px 26px', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: monoFam, fontSize: 10, color: T.sub, letterSpacing: 1.2, textTransform: 'uppercase' }}>
            <span style={{ width: 6, height: 6, background: skillColor[i] }} />SKILL · 0{i + 1}
            <span style={{ flex: 1, height: 1, background: T.border }} />
            <span style={{ color: skillColor[i], fontWeight: 600 }}>{skillScore[i]}</span>
          </div>
          <div style={{ fontFamily: sansFam, fontSize: 22, color: T.ink, fontWeight: 600, letterSpacing: '-0.018em', lineHeight: 1.25 }}>{s.label}</div>
          <div style={{ flex: 1 }} />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
            {s.stack.map((stk) => (
              <span key={stk} style={{
                fontFamily: monoFam, fontSize: 10.5, padding: '4px 9px',
                color: T.sub, border: `1px solid ${T.border}`, borderRadius: 2,
              }}>{stk}</span>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, fontFamily: monoFam, fontSize: 9.5, color: T.dim, letterSpacing: 1, textTransform: 'uppercase' }}>
            <span style={{ display: 'inline-flex', transform: 'rotate(90deg)', color: skillColor[i] }}>⟳</span>
            hover で全スタックを表示
          </div>
        </div>
        {/* BACK — full language / tool stack for this field */}
        <div className="skill-face skill-face-back" style={{ padding: '24px 26px', gap: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: monoFam, fontSize: 10, color: T.sub, letterSpacing: 1.2, textTransform: 'uppercase' }}>
            <span style={{ width: 6, height: 6, background: skillColor[i] }} />{s.label}
            <span style={{ flex: 1, height: 1, background: T.border }} />
            <span style={{ color: T.dim }}>{s.langs.length} stack</span>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, alignContent: 'flex-start', flex: 1 }}>
            {s.langs.map((lg) => (
              <span key={lg} style={{
                fontFamily: monoFam, fontSize: 11, padding: '5px 10px',
                color: T.ink, background: 'rgba(181,251,107,.04)',
                border: `1px solid ${skillColor[i]}40`, borderRadius: 2,
              }}>{lg}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // duration tuned to card-set width for a ticker-like glide (~45px/s)
  const setWidth = skills.length * (360 + 20);
  const dur = Math.round(setWidth / 42);

  return (
    <div style={{ marginTop: 40 }}>
      {/* header row */}
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 18, marginBottom: 20 }}>
        <div style={{ fontFamily: monoFam, fontSize: 11, color: T.accent, letterSpacing: 1.4, textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 12 }}>
          <span>—— Skills</span>
          <span style={{ color: T.dim }}>{skills.length} fields</span>
        </div>
        <span style={{ flex: 1 }} />
        <div style={{ fontFamily: monoFam, fontSize: 10, color: T.dim, letterSpacing: 1.2, textTransform: 'uppercase' }}>auto · hover で停止 + 反転</div>
      </div>

      {/* seamless marquee track (same motion as the top ticker) */}
      <div className="studio-marquee">
        <div className="studio-marquee-track" style={{ animationDuration: `${dur}s` }}>
          {skills.map((s, i) => Card(s, i, `a${i}`))}
          {skills.map((s, i) => Card(s, i, `b${i}`))}
        </div>
      </div>
    </div>
  );
}

/* ─── Main Export ─── */
export function AboutSection() {
  const [lang, setLang] = useState<'ja' | 'en'>('ja');
  const aboutBody = lang === 'ja' ? STUDIO_NOTE.jp : STUDIO_NOTE.en;

  return (
    <section id="about" className="sect" style={{ padding: '0 0 180px' }}>
      <style>{ABOUT_STYLES}</style>

      <PinnedHead num="02" kicker="Studio brief" title={ABOUT_HEADLINE} sub={ABOUT_SUBTITLE} />

      <div className="studio-container" style={{ maxWidth: 1320, margin: '0 auto', padding: '0 56px' }}>
        {/* feature row */}
        <div className="bento-12" style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 20 }}>
          <Reveal style={{ gridColumn: 'span 7' }}>
            <div style={{
              background: T.surface, border: `1px solid ${T.border}`,
              padding: '40px 44px 36px', minHeight: 380, display: 'flex', flexDirection: 'column',
              position: 'relative', overflow: 'hidden',
            }}>
              {/* meta strip */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: monoFam, fontSize: 10, color: T.sub, letterSpacing: 1.4, textTransform: 'uppercase' }}>
                <span style={{ color: T.accent }}>§01</span>
                <span style={{ width: 18, height: 1, background: T.accent }} />
                <span>Studio note</span>
                <span style={{ flex: 1, height: 1, background: T.border }} />
                <span style={{ color: T.dim }}>{STUDIO_NOTE.revision}</span>
              </div>

              {/* studio note */}
              <div style={{
                flex: 1, position: 'relative',
                padding: '52px 0 48px',
              }}>
                {/* JP / EN toggle */}
                <div style={{
                  position: 'absolute', top: 14, right: 0, display: 'flex',
                  border: `1px solid ${T.border}`, borderRadius: 999, overflow: 'hidden',
                  fontFamily: monoFam, fontSize: 10, letterSpacing: 0.6,
                }}>
                  {(['ja', 'en'] as const).map((l) => (
                    <button key={l} onClick={() => setLang(l)} style={{
                      appearance: 'none', border: 'none', cursor: 'pointer',
                      padding: '5px 12px', textTransform: 'uppercase', fontWeight: 600,
                      fontFamily: monoFam, fontSize: 10, letterSpacing: 0.8,
                      transition: 'background .25s, color .25s',
                      background: lang === l ? T.accent : 'transparent',
                      color: lang === l ? '#fff' : T.sub,
                    }}>{l === 'ja' ? '日本語' : 'EN'}</button>
                  ))}
                </div>

                <div key={lang} style={{
                  fontFamily: jpFam, color: T.ink,
                  fontSize: 'clamp(20px, 1.7vw, 26px)', lineHeight: 1.85,
                  letterSpacing: '0.01em', fontWeight: 500, maxWidth: '32em',
                  textWrap: 'balance',
                }}>
                  {[...aboutBody].map((ch, i) => ch === ' ' ? ' ' : (
                    <span key={i} style={{
                      display: 'inline-block',
                      animation: 'aboutChar .52s cubic-bezier(.16,1,.3,1) both',
                      animationDelay: `${i * 13}ms`,
                    }}>{ch}</span>
                  ))}
                </div>

                {/* attribution row */}
                <div style={{
                  marginTop: 32, display: 'flex', alignItems: 'center', gap: 14,
                  fontFamily: monoFam, fontSize: 11, color: T.sub, letterSpacing: 0.4,
                }}>
                  <span style={{ width: 24, height: 1, background: T.sub }} />
                  <span style={{ color: T.ink, fontWeight: 600 }}>Mito Kawaguchi</span>
                  <span style={{ color: T.dim }}>·</span>
                  <span>Founder, MIT Tech Studio</span>
                </div>
              </div>

              {/* meta strip footer */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18, borderTop: `1px solid ${T.border}`, paddingTop: 22 }}>
                {STUDIO_STATS.map((s) => (
                  <div key={s.label}>
                    <div style={{ fontFamily: monoFam, fontSize: 10, color: T.sub, letterSpacing: 1.1, textTransform: 'uppercase' }}>{s.label}</div>
                    <div style={{ fontFamily: sansFam, fontSize: 28, color: T.ink, fontWeight: 600, letterSpacing: '-0.025em', marginTop: 6 }}>{s.value}</div>
                    <div style={{ fontFamily: monoFam, fontSize: 10, color: T.dim, marginTop: 2 }}>{s.note ?? ''}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={80} style={{ gridColumn: 'span 5' }}>
            <NowPlaying style={{ marginBottom: 20 }} />
            <MapDot />
          </Reveal>
        </div>

        {/* skills carousel */}
        <Reveal delay={140}>
          <SkillCarousel skills={SKILLS} />
        </Reveal>
      </div>
    </section>
  );
}
