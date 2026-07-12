import { WORKS, GITHUB } from '@/data/landing-content';
import { sans, mono, SECTION_IMAGES } from './tokens';

function GithubPopup() {
  return (
    <div className="gh-pop">
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="https://cdn.simpleicons.org/github/e9edf2" alt="GitHub" width={22} height={22} style={{ display: 'block', flex: 'none' }} />
        <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.25, minWidth: 0 }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: '#cfd5dd' }}>{GITHUB.handle}</span>
          <span style={{ fontFamily: mono, fontSize: 11, color: '#6b7480' }}>{GITHUB.domain}</span>
        </span>
        <span style={{ marginLeft: 'auto', fontFamily: mono, fontSize: 11, color: 'var(--accent)' }}>● active</span>
      </div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        {[
          [GITHUB.repos, 'REPOS'],
          [GITHUB.stars, 'STARS'],
          [GITHUB.followers, 'FOLLOWERS'],
        ].map(([value, label]) => (
          <div key={label} style={{ flex: 1, background: '#10141a', border: '1px solid #1b212a', borderRadius: 9, padding: '10px 11px' }}>
            <div style={{ fontFamily: mono, fontSize: 18, fontWeight: 600, color: '#cfd5dd' }}>{value}</div>
            <div style={{ fontFamily: mono, fontSize: 10, color: '#6b7480', letterSpacing: '.06em', marginTop: 3 }}>{label}</div>
          </div>
        ))}
      </div>
      <div style={{ fontFamily: mono, fontSize: 10, color: '#6b7480', letterSpacing: '.1em', marginBottom: 9 }}>LANGUAGES</div>
      <div style={{ display: 'flex', height: 7, borderRadius: 4, overflow: 'hidden', marginBottom: 11 }}>
        {GITHUB.languages.map((l) => (
          <span key={l.label} style={{ width: `${l.pct}%`, background: l.color }} />
        ))}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, fontFamily: mono, fontSize: 11, color: '#8b94a1' }}>
        {GITHUB.languages.map((l) => (
          <span key={l.label} style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: l.color }} />
            {l.label} {l.pct}%
          </span>
        ))}
      </div>
    </div>
  );
}

export function Works() {
  return (
    <section id="works" className="sect" style={{ position: 'relative', padding: 'var(--sec-pad) clamp(20px,5vw,56px)' }}>
      {/* 背景レイヤーだけを clip でクリップ（section は visible のまま＝ホバーポップアップを切らない） */}
      <div aria-hidden style={{ position: 'absolute', inset: 0, overflow: 'clip', zIndex: 0, pointerEvents: 'none' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={SECTION_IMAGES.works}
          alt=""
          className="parallax-img"
          decoding="async"
          loading="lazy"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(10,11,14,.34) 0%, rgba(10,11,14,.55) 50%, rgba(10,11,14,.9) 90%)',
          }}
        />
        <span
          className="orb"
          style={{ color: '#5ecfff', width: '44vw', maxWidth: 560, height: '44vw', maxHeight: 560, left: '-8%', bottom: '-6%', opacity: 0.13, animation: 'orbC 27s ease-in-out infinite' }}
        />
      </div>
      <div style={{ position: 'relative', zIndex: 1, maxWidth: 1240, margin: '0 auto' }}>
        <div
          className="reveal section-head"
          style={{ position: 'relative', zIndex: 20, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 'clamp(40px,7vh,64px)' }}
        >
          <h2
            className="split-head shine"
            data-split
            style={{ margin: 0, fontFamily: sans, fontSize: 'clamp(40px,5.5vw,76px)', fontWeight: 700, letterSpacing: '-0.03em' }}
          >
            Selected Works
          </h2>
          <div className="gh-wrap">
            <a
              href={GITHUB.url}
              target="_blank"
              rel="noreferrer"
              className="cta"
              data-magnetic
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                textDecoration: 'none',
                fontFamily: mono,
                fontSize: 13,
                color: '#cfd5dd',
                border: '1px solid #232932',
                borderRadius: 10,
                padding: '11px 18px',
                transition: 'border-color .25s, background .25s, transform .15s, color .25s, box-shadow .25s',
              }}
            >
              all on github <span className="ar">↗</span>
            </a>
            <GithubPopup />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {WORKS.map((w) => (
            <a
              key={w.idx}
              href={w.url}
              target="_blank"
              rel="noreferrer"
              className="reveal work-card"
              data-tilt
              style={{
                textDecoration: 'none',
                color: 'inherit',
                display: 'grid',
                gridTemplateColumns: 'auto 1fr auto auto',
                gap: 'clamp(16px,3vw,40px)',
                alignItems: 'center',
                background: '#0c0f14',
                border: '1px solid #161b22',
                borderRadius: 18,
                padding: 'clamp(22px,3vw,32px)',
                transition:
                  'opacity .8s cubic-bezier(.16,1,.3,1), transform .35s cubic-bezier(.22,1,.36,1), border-color .3s, background .3s, box-shadow .5s cubic-bezier(.22,1,.36,1)',
              }}
            >
              <span className="work-idx" style={{ fontFamily: mono, fontSize: 14, color: '#4a525f' }}>{w.idx}</span>
              <span style={{ minWidth: 0 }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 10 }}>
                  <span style={{ fontSize: 'clamp(19px,2.4vw,26px)', fontWeight: 600, letterSpacing: '-0.01em' }}>{w.name}</span>
                  <span style={{ fontFamily: mono, fontSize: 11, color: 'var(--accent)', border: '1px solid #232932', borderRadius: 20, padding: '3px 10px' }}>{w.lang}</span>
                </span>
                <span style={{ display: 'block', fontSize: 14, lineHeight: 1.6, color: '#8b94a1', maxWidth: 640 }}>{w.desc}</span>
              </span>
              <span className="hide-mobile" style={{ textAlign: 'right' }}>
                <span style={{ display: 'block', fontFamily: mono, fontSize: 22, fontWeight: 500, color: '#cfd5dd' }}>{w.commits}</span>
                <span style={{ display: 'block', fontFamily: mono, fontSize: 10, color: '#6b7480', letterSpacing: '.08em', marginTop: 4 }}>COMMITS</span>
              </span>
              <span className="work-go" aria-hidden>→</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
