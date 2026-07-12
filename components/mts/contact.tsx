import { CHANNELS, CONTACT_EMAIL, OVERVIEW_ROWS, getMapDots } from '@/data/landing-content';
import { sans, mono, SECTION_IMAGES } from './tokens';

const MAIL_ICON =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23ffb648' d='M2 5a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5zm2 1.2V18h16V6.2l-8 5-8-5z'/%3E%3C/svg%3E";

function LocationCard() {
  const dots = getMapDots();
  return (
    <div className="reveal flip-card" style={{ flex: '0 0 auto', width: 340, maxWidth: '100%', height: 410 }}>
      <div className="flip-inner">
        {/* FRONT — map */}
        <div
          className="flip-face contact-card"
          style={{ background: '#0c0f14', border: '1px solid #161b22', borderRadius: 16, padding: '20px 24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', boxShadow: '0 0 8px var(--accent)' }} />
              <span style={{ fontFamily: mono, fontSize: 12, color: '#e9edf2', fontWeight: 500 }}>HQ · Tokyo, JP</span>
            </div>
            <span style={{ fontFamily: mono, fontSize: 11, color: '#6b7480' }}>35.68°N 139.69°E</span>
          </div>
          <svg viewBox="0 0 180 210" width="100%" style={{ display: 'block', width: '100%', maxWidth: 240, aspectRatio: '180 / 210', flex: 'none', alignSelf: 'center', margin: '6px auto' }}>
            {dots.map((d, i) => (
              <rect key={i} x={d.x} y={d.y} width={4.6} height={4.6} fill={d.fill} opacity={d.opacity} />
            ))}
            <circle cx={123} cy={135} r={4} style={{ fill: 'var(--accent)' }} />
            <circle className="radar-ping" cx={123} cy={135} r={5} style={{ fill: 'none', stroke: 'var(--accent)', strokeWidth: 0.6, opacity: 0.5 }} />
            <circle className="radar-ping d2" cx={123} cy={135} r={5} style={{ fill: 'none', stroke: 'var(--accent)', strokeWidth: 0.4, opacity: 0.4 }} />
          </svg>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 14, fontFamily: mono, fontSize: 11, color: '#6b7480' }}>
            <div style={{ display: 'flex', gap: 16 }}>
              <span>ping 18ms</span>
              <span>uptime 99.98%</span>
            </div>
            <span style={{ color: 'var(--accent)' }}>● live</span>
          </div>
        </div>
        {/* BACK — overview */}
        <div
          className="flip-face"
          style={{ transform: 'rotateY(180deg)', background: '#0c0f14', border: '1px solid #161b22', borderRadius: 16, padding: '22px 24px', display: 'flex', flexDirection: 'column' }}
        >
          <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: '.14em', color: 'var(--accent)', marginBottom: 20 }}>会社概要 / OVERVIEW</div>
          <dl style={{ margin: 0, display: 'flex', flexDirection: 'column', gap: 14, flex: 1 }}>
            {OVERVIEW_ROWS.map((row) => (
              <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', gap: 16, alignItems: 'baseline' }}>
                <dt style={{ fontFamily: mono, fontSize: 11, color: '#6b7480' }}>{row.label}</dt>
                <dd
                  style={{
                    margin: 0,
                    fontFamily: row.accent ? mono : sans,
                    fontSize: row.accent ? 11 : 13,
                    color: row.accent ? 'var(--accent)' : '#cfd5dd',
                    fontWeight: row.label === '屋号' ? 600 : 400,
                  }}
                >
                  {row.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}

export function Contact() {
  return (
    <section id="contact" className="sect" style={{ position: 'relative', overflow: 'clip', padding: 'var(--sec-pad) clamp(20px,5vw,56px)' }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={SECTION_IMAGES.contact}
        alt=""
        aria-hidden
        className="parallax-img"
        decoding="async"
        loading="lazy"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', zIndex: 0, pointerEvents: 'none' }}
      />
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
          background: 'linear-gradient(180deg, rgba(10,11,14,.34) 0%, rgba(10,11,14,.55) 50%, rgba(10,11,14,.9) 90%)',
        }}
      />
      <span
        className="orb"
        aria-hidden
        style={{ color: '#b5fb6b', width: '42vw', maxWidth: 540, height: '42vw', maxHeight: 540, right: '-8%', top: '6%', opacity: 0.14, zIndex: 0, animation: 'orbB 26s ease-in-out infinite' }}
      />
      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1240, margin: '0 auto' }}>
        <div style={{ display: 'flex', gap: 'clamp(32px,5vw,64px)', alignItems: 'stretch', justifyContent: 'space-between', flexWrap: 'wrap', margin: '0 0 clamp(34px,5vh,48px)' }}>
          <div style={{ flex: '1 1 340px', minWidth: 260, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: 'clamp(28px,4.5vh,48px)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(16px,2.5vh,24px)' }}>
              <h2
                className="split-head shine contact-h2"
                data-split
                style={{ margin: 0, fontFamily: sans, fontSize: 'clamp(40px,6vw,84px)', fontWeight: 800, lineHeight: 1.02, letterSpacing: '-0.04em' }}
              >
                一緒に
                <br />
                <span style={{ color: 'var(--accent)' }}>つくりませんか？</span>
              </h2>
              <p
                className="reveal contact-body"
                style={{ margin: 'clamp(12px,2vh,22px) 0 0', fontSize: 'clamp(16px,1.9vw,19px)', lineHeight: 1.7, color: '#9aa3b0', maxWidth: 560 }}
              >
                新規プロジェクトのご相談、技術的なパートナーシップなど、お気軽にお問い合わせください。
              </p>
            </div>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="sns-card reveal"
              data-brand="#ffb648"
              data-tilt
              style={{
                maxWidth: 420,
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                border: '1px solid #1b212a',
                borderRadius: 14,
                padding: '18px 20px',
                transition: 'border-color .3s, background .3s, transform .35s cubic-bezier(.22,1,.36,1), box-shadow .35s ease',
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={MAIL_ICON} alt="Email" width={24} height={24} className="sns-ico" style={{ display: 'block', flex: 'none' }} />
              <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.3, minWidth: 0 }}>
                <span style={{ fontSize: 15, fontWeight: 600, color: '#cfd5dd' }}>Email</span>
                <span style={{ fontFamily: mono, fontSize: 12, color: '#8b94a1', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{CONTACT_EMAIL}</span>
              </span>
              <span className="sns-go">メールする ↗</span>
            </a>
          </div>
          <LocationCard />
        </div>

        <div className="reveal grid-4" style={{ marginTop: 'clamp(44px,7vh,72px)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(210px,1fr))', gap: 10 }}>
          {CHANNELS.map((c) => (
            <a
              key={c.label}
              href={c.url}
              target="_blank"
              rel="noreferrer"
              className="sns-card"
              data-brand={c.brand}
              data-tilt
              style={{
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: 13,
                border: '1px solid #1b212a',
                borderRadius: 12,
                padding: '14px 16px',
                transition: 'border-color .3s, background .3s, transform .35s cubic-bezier(.22,1,.36,1), box-shadow .35s ease',
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={c.icon} alt={c.label} width={20} height={20} className="sns-ico" style={{ display: 'block', flex: 'none' }} />
              <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.3, minWidth: 0 }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: '#cfd5dd' }}>{c.label}</span>
                <span style={{ fontFamily: mono, fontSize: 11, color: '#6b7480', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{c.handle}</span>
              </span>
              <span className="sns-go">{c.cta}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
