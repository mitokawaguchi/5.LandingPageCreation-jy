import { HERO_STATS, SKILLS } from '@/data/landing-content';
import { sans, mono, SECTION_IMAGES } from './tokens';

export function About() {
  return (
    <section
      id="about"
      className="sect"
      style={{
        position: 'relative',
        overflow: 'hidden',
        padding: 'clamp(28px,4vh,56px) clamp(20px,5vw,56px) var(--sec-pad)',
        marginTop: 'clamp(-90px,-11vh,-56px)',
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={SECTION_IMAGES.about}
        alt=""
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center 62%',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
          background:
            'linear-gradient(90deg, rgba(8,9,12,.96) 0%, rgba(8,9,12,.9) 50%, rgba(8,9,12,.62) 100%)',
        }}
      />
      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1240, margin: '0 auto' }}>
        <div
          className="reveal grid-feat"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))',
            gap: 'clamp(28px,4vw,56px)',
            alignItems: 'stretch',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <h2
              className="reveal wipe"
              style={{
                margin: '0 0 clamp(30px,5vh,46px)',
                fontFamily: sans,
                color: '#f5f7fa',
                fontSize: 'clamp(32px,4.5vw,58px)',
                fontWeight: 700,
                lineHeight: 1.12,
                letterSpacing: '-0.03em',
              }}
            >
              デザインと
              <br />
              エンジニアリングの
              <br />
              境界をなくす。
            </h2>
            <p
              style={{
                margin: 'clamp(24px,4vh,44px) 0 32px',
                fontFamily: sans,
                fontSize: 'clamp(15px,1.7vw,18px)',
                lineHeight: 1.85,
                color: '#c3cad3',
                maxWidth: 560,
              }}
            >
              私たちは、単に美しいだけのサイトはつくりません。課題を解決する「機能美」と、人の心を動かす「体験」を、ひとつに両立させます。
            </p>
            <div style={{ display: 'flex', gap: 'clamp(24px,4vw,48px)', flexWrap: 'wrap', marginTop: 'auto' }}>
              {HERO_STATS.map((s) => (
                <div key={s.label}>
                  <div style={{ fontSize: 'clamp(24px,3vw,34px)', fontWeight: 700, letterSpacing: '-0.02em' }}>
                    {s.value}
                  </div>
                  <div style={{ fontFamily: mono, fontSize: 11, color: '#6b7480', letterSpacing: '.06em', marginTop: 6 }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 12, alignContent: 'start' }}>
            {SKILLS.map((sk) => (
              <div
                key={sk.label}
                className="reveal skill-card"
                data-c={sk.color}
                style={{
                  background: 'rgba(12,15,20,.62)',
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255,255,255,.08)',
                  borderRadius: 16,
                  padding: 26,
                  transition:
                    'opacity .8s cubic-bezier(.16,1,.3,1), transform .4s cubic-bezier(.22,1,.36,1), border-color .3s, box-shadow .5s cubic-bezier(.22,1,.36,1)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 18 }}>
                  <span style={{ fontWeight: 600, fontSize: 16 }}>{sk.label}</span>
                  <span className="skill-score" style={{ fontFamily: mono, fontSize: 13, color: sk.color }}>
                    <span data-countup={sk.score}>0</span>
                  </span>
                </div>
                <div style={{ height: 5, borderRadius: 3, background: '#181d25', overflow: 'hidden', marginBottom: 18 }}>
                  <div
                    data-bar={sk.score}
                    className="skill-bar"
                    style={{
                      height: '100%',
                      width: 0,
                      borderRadius: 3,
                      background: sk.color,
                      transition: 'width 1.2s cubic-bezier(.16,1,.3,1), box-shadow .4s ease',
                    }}
                  />
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                  {sk.stack.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontFamily: mono,
                        fontSize: 11,
                        color: '#7b8593',
                        padding: '4px 9px',
                        background: '#10141a',
                        borderRadius: 6,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
