import { sans, SECTION_IMAGES } from './tokens';

export function Hero() {
  return (
    <section
      id="home"
      className="hero-section"
      style={{
        position: 'relative',
        minHeight: 'clamp(620px, 90vh, 1000px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 'clamp(96px,12vh,132px) clamp(20px,5vw,56px) clamp(60px,9vh,120px)',
      }}
    >
      <div
        aria-hidden
        data-parallax="0.18"
        style={{
          position: 'absolute',
          inset: '-12% 0',
          backgroundImage:
            'linear-gradient(#10141a 1px,transparent 1px),linear-gradient(90deg,#10141a 1px,transparent 1px)',
          backgroundSize: '44px 44px',
          maskImage: 'radial-gradient(ellipse 90% 60% at 50% 0%, #000 0%, transparent 72%)',
          WebkitMaskImage: 'radial-gradient(ellipse 90% 60% at 50% 0%, #000 0%, transparent 72%)',
          opacity: 0.6,
          pointerEvents: 'none',
          animation: 'floatGrid 7s linear infinite',
        }}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={SECTION_IMAGES.hero}
        alt=""
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center 35%',
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
            'linear-gradient(90deg, rgba(10,11,14,.72) 0%, rgba(10,11,14,.42) 36%, rgba(10,11,14,.08) 70%, transparent 100%), linear-gradient(180deg, transparent 38%, rgba(10,11,14,.55) 70%, #0a0b0e 100%)',
        }}
      />

      <div
        style={{
          position: 'relative',
          maxWidth: 1240,
          margin: 0,
          display: 'flex',
          alignItems: 'center',
          gap: 'clamp(32px,5vw,72px)',
          flexWrap: 'wrap',
        }}
      >
        <div style={{ flex: '1 1 520px', minWidth: 300 }}>
          <div style={{ position: 'relative', paddingBottom: '.1em' }}>
            <div
              aria-hidden
              style={{
                position: 'absolute',
                left: '-2%',
                width: '104%',
                height: 2,
                top: 0,
                background:
                  'linear-gradient(90deg, transparent, var(--accent) 30%, #f0ffd0 50%, var(--accent) 70%, transparent)',
                boxShadow: '0 0 26px 3px var(--accent)',
                opacity: 0,
                mixBlendMode: 'screen',
                pointerEvents: 'none',
                animation: 'beamSweep 1.5s cubic-bezier(.45,.05,.35,1) .1s forwards',
              }}
            />
            <h1
              className="hero-line hero-title"
              style={{
                margin: 0,
                fontFamily: sans,
                fontWeight: 800,
                fontSize: 'clamp(46px,8vw,132px)',
                lineHeight: 1.0,
                letterSpacing: '-0.045em',
                color: '#cfd5dd',
              }}
            >
              <span className="rise" style={{ display: 'block' }}>
                Engineering
              </span>
              <span
                className="rise"
                style={{
                  display: 'block',
                  fontWeight: 500,
                  color: '#6b7480',
                  fontSize: '.42em',
                  letterSpacing: '-0.01em',
                  margin: '.08em 0 .04em',
                }}
              >
                meets
              </span>
              <span className="rise" style={{ display: 'block', color: 'var(--accent)' }}>
                Creativity<span style={{ color: '#5b6471' }}>.</span>
              </span>
            </h1>
          </div>

          <div className="rise" style={{ marginTop: 'clamp(30px,5.25vh,54px)' }}>
            <p
              className="hero-subtitle"
              style={{
                margin: 0,
                fontSize: 'clamp(16px,2vw,20px)',
                lineHeight: 1.7,
                color: '#9aa3b0',
                maxWidth: 560,
              }}
            >
              技術力とデザインの融合。精密かつエレガントなWeb体験を創造し、ビジネスの未来を加速させます。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
