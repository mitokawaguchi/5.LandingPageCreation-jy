import { LANDING_ARTICLES } from '@/data/landing-content';
import { sans, mono, SECTION_IMAGES } from './tokens';

export function Writing() {
  return (
    <section id="writing" className="sect" style={{ position: 'relative', overflow: 'clip', padding: 'var(--sec-pad) clamp(20px,5vw,56px)' }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={SECTION_IMAGES.writing}
        alt=""
        aria-hidden
        className="parallax-img"
        decoding="async"
        loading="lazy"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', zIndex: 0, pointerEvents: 'none', opacity: 0.5 }}
      />
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
          background: 'linear-gradient(180deg, rgba(10,11,14,.72) 0%, rgba(10,11,14,.82) 45%, rgba(10,11,14,.95) 90%)',
        }}
      />
      <span
        className="orb"
        aria-hidden
        style={{ color: '#b48cff', width: '38vw', maxWidth: 480, height: '38vw', maxHeight: 480, left: '-6%', top: '-4%', opacity: 0.14, zIndex: 0, animation: 'orbA 25s ease-in-out infinite' }}
      />
      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1240, margin: '0 auto' }}>
        <h2
          className="split-head shine"
          data-split
          style={{ margin: '0 0 clamp(40px,7vh,64px)', fontFamily: sans, fontSize: 'clamp(32px,4.5vw,56px)', fontWeight: 700, letterSpacing: '-0.03em' }}
        >
          執筆記事
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 14 }}>
          {LANDING_ARTICLES.map((a) => (
            <div key={a.title} className="reveal flip-card writing-card" style={{ minHeight: 232 }}>
              <div className="flip-inner">
                {/* FRONT */}
                <a
                  href={a.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flip-face"
                  style={{
                    textDecoration: 'none',
                    color: 'inherit',
                    display: 'flex',
                    flexDirection: 'column',
                    background: '#0c0f14',
                    border: '1px solid #161b22',
                    borderRadius: 16,
                    padding: 24,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 6,
                        fontFamily: mono,
                        fontSize: 11,
                        letterSpacing: '.06em',
                        color: a.color,
                        border: '1px solid #232932',
                        borderRadius: 6,
                        padding: '3px 9px',
                      }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={a.icon} alt={a.source} width={13} height={13} style={{ display: 'block' }} />
                      {a.source}
                    </span>
                    <span style={{ fontFamily: mono, fontSize: 11, color: '#6b7480' }}>{a.date}</span>
                  </div>
                  <div style={{ fontSize: 16, fontWeight: 600, lineHeight: 1.5, letterSpacing: '-0.01em', flex: 1, marginBottom: 22 }}>
                    {a.title}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', fontFamily: mono, fontSize: 12, color: '#7b8593' }}>
                    <span style={{ display: 'flex', gap: 18 }}>
                      <span>♥ {a.likes}</span>
                      <span>◉ {a.impressions}</span>
                    </span>
                  </div>
                </a>
                {/* BACK */}
                <a
                  href={a.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flip-face"
                  style={{
                    transform: 'rotateY(180deg)',
                    textDecoration: 'none',
                    color: 'inherit',
                    display: 'flex',
                    flexDirection: 'column',
                    background: '#0e1218',
                    border: `1px solid ${a.color}`,
                    borderRadius: 16,
                    padding: 24,
                  }}
                >
                  <span style={{ fontFamily: mono, fontSize: 11, letterSpacing: '.06em', color: a.color, marginBottom: 14 }}>
                    SUMMARY — {a.source}
                  </span>
                  <p style={{ margin: 0, flex: 1, fontSize: 14, lineHeight: 1.7, color: '#aab2bd' }}>{a.summary}</p>
                  <span style={{ marginTop: 16, fontFamily: mono, fontSize: 12, color: a.color }}>記事を読む →</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
