'use client';

import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { LanguageSwitcher } from '@/components/language-switcher';
import type { WritingArticle } from '@/types/writing-article';
import {
  REPOS,
  GITHUB_PROFILE,
  WRITING_PROFILES,
  CONTACT_CHANNELS,
  CONTACT_EMAIL,
  CONTACT_STATUS,
  FOOTER_META,
} from '@/data/site-content';

/* ─── Design Tokens (shared studio palette) ─── */
const T = {
  bg: '#06070a', surface: '#0a0c10', surface2: '#0e1116', surface3: '#13171e',
  border: '#1a1f28', borderStrong: '#252b35', ink: '#e9edf2', sub: '#8a93a0',
  dim: '#3d4654', accent: '#b5fb6b', warn: '#ffb648', pink: '#ff5da2',
  blue: '#5ecfff', green: '#69e6a6', purple: '#b48cff',
};

const sans = 'var(--font-sans)';
const mono = 'var(--font-mono)';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Works', href: '#works' },
  { label: 'Writing', href: '#writing' },
  { label: 'Contact', href: '#contact' },
];

type SkillItem = { label: string; stack: string[] };

const REPO_ACCENTS: Record<string, string> = {
  landing: T.accent,
  taskflow: T.blue,
  profileReadme: T.purple,
};

const PLATFORM_META: Record<WritingArticle['platform'], { label: string; color: string; url: string }> = {
  zenn: { label: 'Zenn', color: T.blue, url: WRITING_PROFILES.zenn.url },
  qiita: { label: 'Qiita', color: T.green, url: WRITING_PROFILES.qiita.url },
};

/* ─── Section shell with full-bleed background image ─── */
function Section({
  id,
  bg,
  children,
  style,
}: {
  id: string;
  bg: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <section
      id={id}
      className="mts-section"
      style={{
        position: 'relative',
        backgroundImage: `linear-gradient(180deg, rgba(6,7,10,0.55) 0%, rgba(6,7,10,0.78) 100%), url('${bg}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        borderTop: `1px solid ${T.border}`,
        ...style,
      }}
    >
      <div
        className="mts-container"
        style={{ maxWidth: 1320, margin: '0 auto', padding: '120px 56px' }}
      >
        {children}
      </div>
    </section>
  );
}

function Kicker({ children, color = T.accent }: { children: React.ReactNode; color?: string }) {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 10,
        fontFamily: mono,
        fontSize: 11,
        letterSpacing: 2,
        textTransform: 'uppercase',
        color,
        marginBottom: 24,
      }}
    >
      <span style={{ width: 18, height: 1, background: color, opacity: 0.7 }} />
      {children}
    </div>
  );
}

export function MtsLanding({ articles = [] }: { articles?: WritingArticle[] }) {
  const tHero = useTranslations('hero');
  const tAbout = useTranslations('about');
  const tWorks = useTranslations('works');
  const tLab = useTranslations('lab');
  const tWriting = useTranslations('writing');
  const tContact = useTranslations('contact');
  const tFooter = useTranslations('footer');

  const skills = tAbout.raw('skills') as SkillItem[];
  const rootRef = useRef<HTMLDivElement>(null);

  /* Lightweight scroll-reveal for [data-reveal] elements. */
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const targets = Array.from(root.querySelectorAll<HTMLElement>('[data-reveal]'));
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      targets.forEach((el) => el.classList.add('is-in'));
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add('is-in');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 },
    );
    targets.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <main ref={rootRef} style={{ background: T.bg, color: T.ink, minHeight: '100vh' }}>
      {/* ───────────── Nav ───────────── */}
      <header
        className="mts-nav"
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          background: 'rgba(6,7,10,0.72)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: `1px solid ${T.border}`,
        }}
      >
        <div
          className="mts-container"
          style={{
            maxWidth: 1320,
            margin: '0 auto',
            padding: '0 56px',
            height: 68,
            display: 'flex',
            alignItems: 'center',
            gap: 20,
          }}
        >
          <a href="#home" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
            <span
              style={{
                width: 34,
                height: 34,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: T.accent,
                color: '#0a0c10',
                fontFamily: sans,
                fontWeight: 800,
                fontSize: 17,
              }}
            >
              M
            </span>
            <span style={{ fontFamily: sans, fontSize: 15, fontWeight: 600, color: T.ink, letterSpacing: '-0.01em' }}>
              MIT Tech Studio
            </span>
          </a>

          <div style={{ flex: 1 }} />

          <nav className="mts-nav-links" style={{ display: 'flex', gap: 4 }}>
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="mts-nav-link"
                style={{
                  padding: '8px 14px',
                  fontFamily: sans,
                  fontSize: 14,
                  color: T.sub,
                  textDecoration: 'none',
                  borderRadius: 4,
                  transition: 'color .15s, background .15s',
                }}
              >
                {l.label}
              </a>
            ))}
          </nav>

          <LanguageSwitcher />

          <a
            href="#contact"
            className="mts-cta"
            style={{
              padding: '9px 18px',
              background: T.accent,
              color: '#0a0c10',
              fontFamily: sans,
              fontSize: 13,
              fontWeight: 600,
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            ↗ {tContact('cta')}
          </a>
        </div>
      </header>

      {/* ───────────── Hero ───────────── */}
      <Section id="home" bg="/mts/hero.svg" style={{ borderTop: 'none', minHeight: 'calc(100vh - 68px)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: 'calc(100vh - 308px)' }}>
          <div
            data-reveal
            className="mts-reveal"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              alignSelf: 'flex-start',
              padding: '7px 14px',
              border: `1px solid ${T.border}`,
              borderRadius: 999,
              background: T.surface,
              marginBottom: 36,
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: 4,
                background: T.accent,
                boxShadow: `0 0 10px ${T.accent}`,
                animation: 'mtsPulse 1.6s ease-in-out infinite',
              }}
            />
            <span style={{ fontFamily: sans, fontSize: 13, fontWeight: 600, color: T.accent }}>
              {tHero('badge')}
            </span>
          </div>

          <h1
            data-reveal
            className="mts-reveal mts-hero-title"
            style={{
              margin: 0,
              fontFamily: sans,
              fontWeight: 700,
              letterSpacing: '-0.05em',
              lineHeight: 0.92,
              fontSize: 'clamp(64px, 9vw, 148px)',
              color: T.ink,
              transitionDelay: '80ms',
            }}
          >
            <span style={{ display: 'block' }}>{tHero('line1')}</span>
            <span
              style={{
                display: 'block',
                fontStyle: 'italic',
                fontWeight: 400,
                fontSize: '0.5em',
                opacity: 0.6,
                margin: '0.12em 0',
              }}
            >
              {tHero('line2')}
            </span>
            <span style={{ display: 'block', color: T.accent }}>
              {tHero('line3')}
              <span style={{ color: T.sub }}>.</span>
            </span>
          </h1>

          <p
            data-reveal
            className="mts-reveal"
            style={{
              margin: '48px 0 0',
              maxWidth: 600,
              fontFamily: sans,
              fontSize: 19,
              lineHeight: 1.7,
              color: T.sub,
              transitionDelay: '160ms',
            }}
          >
            {tHero('subtitle')}
          </p>

          <div
            data-reveal
            className="mts-reveal"
            style={{ display: 'flex', gap: 12, marginTop: 40, flexWrap: 'wrap', transitionDelay: '240ms' }}
          >
            <a
              href="#works"
              className="mts-cta"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                padding: '15px 26px',
                background: T.accent,
                color: '#0a0c10',
                fontFamily: sans,
                fontSize: 14,
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              <span style={{ fontFamily: mono, fontSize: 13, opacity: 0.65 }}>▸</span>
              {tHero('viewWorks')}
            </a>
            <a
              href="#about"
              className="mts-ghost"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                padding: '15px 26px',
                border: `1px solid ${T.borderStrong}`,
                color: T.ink,
                fontFamily: sans,
                fontSize: 14,
                fontWeight: 500,
                textDecoration: 'none',
              }}
            >
              {tHero('learnMore')}
            </a>
          </div>
        </div>
      </Section>

      {/* ───────────── About ───────────── */}
      <Section id="about" bg="/mts/about.svg">
        <div data-reveal className="mts-reveal">
          <Kicker color={T.blue}>{tAbout('kicker')}</Kicker>
        </div>
        <div className="mts-about-grid" style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 64, alignItems: 'start' }}>
          <h2
            data-reveal
            className="mts-reveal mts-h2"
            style={{
              margin: 0,
              fontFamily: sans,
              fontSize: 'clamp(34px, 4.4vw, 60px)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              lineHeight: 1.08,
              color: T.ink,
            }}
          >
            {tAbout('title')}
          </h2>
          <p
            data-reveal
            className="mts-reveal"
            style={{
              margin: 0,
              fontFamily: sans,
              fontSize: 17,
              lineHeight: 1.85,
              color: T.sub,
              transitionDelay: '80ms',
            }}
          >
            {tAbout('body')}
          </p>
        </div>

        <div
          className="mts-skill-grid"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginTop: 56 }}
        >
          {skills.map((s, i) => (
            <div
              key={s.label}
              data-reveal
              className="mts-reveal mts-card"
              style={{
                padding: '24px 22px',
                background: T.surface,
                border: `1px solid ${T.border}`,
                transitionDelay: `${i * 70}ms`,
              }}
            >
              <div style={{ fontFamily: mono, fontSize: 11, color: T.dim, marginBottom: 14 }}>
                0{i + 1}
              </div>
              <div style={{ fontFamily: sans, fontSize: 16, fontWeight: 600, color: T.ink, marginBottom: 14 }}>
                {s.label}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {s.stack.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontFamily: mono,
                      fontSize: 11,
                      color: T.sub,
                      padding: '3px 8px',
                      border: `1px solid ${T.border}`,
                      borderRadius: 4,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ───────────── Works ───────────── */}
      <Section id="works" bg="/mts/works.svg">
        <div data-reveal className="mts-reveal" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <Kicker color={T.purple}>{tWorks('kicker')}</Kicker>
            <h2
              className="mts-h2"
              style={{
                margin: 0,
                fontFamily: sans,
                fontSize: 'clamp(34px, 4.4vw, 60px)',
                fontWeight: 700,
                letterSpacing: '-0.03em',
                color: T.ink,
              }}
            >
              {tWorks('title')}
            </h2>
          </div>
          <p style={{ margin: 0, maxWidth: 360, fontFamily: sans, fontSize: 13, lineHeight: 1.7, color: T.sub }}>
            {tWorks('disclaimer')}
          </p>
        </div>

        <div
          className="mts-works-grid"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginTop: 48 }}
        >
          {REPOS.map((repo, i) => {
            const accent = REPO_ACCENTS[repo.id] ?? T.accent;
            return (
              <a
                key={repo.id}
                href={repo.htmlUrl}
                target="_blank"
                rel="noreferrer"
                data-reveal
                className="mts-reveal mts-card mts-work-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  padding: 24,
                  background: T.surface,
                  border: `1px solid ${T.border}`,
                  textDecoration: 'none',
                  transitionDelay: `${i * 80}ms`,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
                  <span style={{ width: 9, height: 9, borderRadius: 5, background: accent, boxShadow: `0 0 10px ${accent}` }} />
                  <span style={{ fontFamily: mono, fontSize: 11, color: T.dim }}>{repo.language ?? 'Markdown'}</span>
                </div>
                <div style={{ fontFamily: mono, fontSize: 15, fontWeight: 600, color: T.ink, marginBottom: 12, wordBreak: 'break-word' }}>
                  {repo.name}
                </div>
                <p style={{ margin: 0, fontFamily: sans, fontSize: 13.5, lineHeight: 1.7, color: T.sub, flex: 1 }}>
                  {tLab(`repos.${repo.id}.desc`)}
                </p>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    marginTop: 20,
                    paddingTop: 16,
                    borderTop: `1px solid ${T.border}`,
                    fontFamily: mono,
                    fontSize: 11,
                    color: T.sub,
                  }}
                >
                  <span>{repo.commitsCount} {tLab('commits')}</span>
                  <span style={{ flex: 1 }} />
                  <span style={{ color: accent }}>{tLab('viewRepo')} ↗</span>
                </div>
              </a>
            );
          })}
        </div>

        <div
          data-reveal
          className="mts-reveal"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            marginTop: 28,
            flexWrap: 'wrap',
            fontFamily: mono,
            fontSize: 12,
            color: T.sub,
          }}
        >
          <span style={{ color: T.green }}>● {GITHUB_PROFILE.publicRepos} {tWorks('projectUnit')}</span>
          <span style={{ color: T.dim }}>/</span>
          <span>@{GITHUB_PROFILE.login}</span>
          <span style={{ flex: 1 }} />
          <a href={GITHUB_PROFILE.profileUrl} target="_blank" rel="noreferrer" className="mts-inline-link" style={{ color: T.accent, textDecoration: 'none' }}>
            {tLab('viewProfile')} ↗
          </a>
        </div>
      </Section>

      {/* ───────────── Writing ───────────── */}
      <Section id="writing" bg="/mts/writing.svg">
        <div data-reveal className="mts-reveal" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <Kicker color={T.warn}>{tWriting('kicker')}</Kicker>
            <h2
              className="mts-h2"
              style={{
                margin: 0,
                fontFamily: sans,
                fontSize: 'clamp(34px, 4.4vw, 60px)',
                fontWeight: 700,
                letterSpacing: '-0.03em',
                color: T.ink,
              }}
            >
              {tWriting('title')}
            </h2>
          </div>
          <Link href="/articles" className="mts-inline-link" style={{ fontFamily: sans, fontSize: 14, color: T.accent, textDecoration: 'none' }}>
            {tWriting('more')} →
          </Link>
        </div>

        <p data-reveal className="mts-reveal" style={{ margin: '20px 0 0', maxWidth: 620, fontFamily: sans, fontSize: 15, lineHeight: 1.75, color: T.sub }}>
          {tWriting('intro')}
        </p>

        {articles.length === 0 ? (
          <div
            data-reveal
            className="mts-reveal"
            style={{
              marginTop: 40,
              padding: '40px 24px',
              textAlign: 'center',
              border: `1px dashed ${T.border}`,
              fontFamily: sans,
              fontSize: 14,
              color: T.sub,
            }}
          >
            {tWriting('empty')}
          </div>
        ) : (
          <div
            className="mts-works-grid"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginTop: 40 }}
          >
            {articles.slice(0, 3).map((a, i) => {
              const meta = PLATFORM_META[a.platform];
              return (
                <a
                  key={a.id}
                  href={a.url}
                  target="_blank"
                  rel="noreferrer"
                  data-reveal
                  className="mts-reveal mts-card mts-work-card"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    padding: 24,
                    background: T.surface,
                    border: `1px solid ${T.border}`,
                    textDecoration: 'none',
                    transitionDelay: `${i * 80}ms`,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                    <span style={{ width: 8, height: 8, borderRadius: 4, background: meta.color }} />
                    <span style={{ fontFamily: mono, fontSize: 11, color: meta.color, letterSpacing: 0.5 }}>{meta.label}</span>
                    <span style={{ flex: 1 }} />
                    <span style={{ fontFamily: mono, fontSize: 11, color: T.dim }}>{a.publishedAt.slice(0, 10)}</span>
                  </div>
                  <div style={{ fontFamily: sans, fontSize: 16, fontWeight: 600, lineHeight: 1.5, color: T.ink, flex: 1 }}>
                    {a.title}
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 14,
                      marginTop: 20,
                      paddingTop: 16,
                      borderTop: `1px solid ${T.border}`,
                      fontFamily: mono,
                      fontSize: 11,
                      color: T.sub,
                    }}
                  >
                    <span>♥ {a.likesCount} {tWriting('likes')}</span>
                    {a.bookmarksCount != null && <span>◈ {a.bookmarksCount} {tWriting('bookmarks')}</span>}
                    {a.impressionsCount != null && <span>◎ {a.impressionsCount} {tWriting('impressions')}</span>}
                    <span style={{ flex: 1 }} />
                    <span style={{ color: meta.color }}>↗</span>
                  </div>
                </a>
              );
            })}
          </div>
        )}
      </Section>

      {/* ───────────── Contact ───────────── */}
      <Section id="contact" bg="/mts/contact.svg">
        <div className="mts-contact-grid" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 64, alignItems: 'center' }}>
          <div data-reveal className="mts-reveal">
            <Kicker color={T.pink}>Contact</Kicker>
            <h2
              className="mts-h2"
              style={{
                margin: 0,
                fontFamily: sans,
                fontSize: 'clamp(40px, 5.2vw, 76px)',
                fontWeight: 700,
                letterSpacing: '-0.035em',
                lineHeight: 1.04,
                color: T.ink,
              }}
            >
              {tContact('title')}
              <br />
              <span style={{ color: T.accent }}>{tContact('titleAccent')}</span>
            </h2>
            <p style={{ margin: '28px 0 0', maxWidth: 520, fontFamily: sans, fontSize: 17, lineHeight: 1.75, color: T.sub }}>
              {tContact('body')}
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="mts-cta"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                marginTop: 36,
                padding: '16px 28px',
                background: T.accent,
                color: '#0a0c10',
                fontFamily: sans,
                fontSize: 15,
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              ✉ {CONTACT_EMAIL}
            </a>
          </div>

          <div
            data-reveal
            className="mts-reveal"
            style={{
              padding: 28,
              background: T.surface,
              border: `1px solid ${T.border}`,
              transitionDelay: '80ms',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: mono, fontSize: 11, color: T.green, marginBottom: 22 }}>
              <span style={{ width: 7, height: 7, borderRadius: 4, background: T.green, boxShadow: `0 0 10px ${T.green}` }} />
              {CONTACT_STATUS}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {CONTACT_CHANNELS.map(([label, color], i) => (
                <div
                  key={label}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '12px 0',
                    borderTop: i === 0 ? 'none' : `1px solid ${T.border}`,
                    fontFamily: mono,
                    fontSize: 13,
                    color: T.sub,
                  }}
                >
                  <span style={{ width: 7, height: 7, borderRadius: 4, background: color }} />
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ───────────── Footer (i18n legal links preserved) ───────────── */}
      <footer style={{ background: T.surface2, borderTop: `1px solid ${T.border}`, padding: '56px 0 32px' }}>
        <div className="mts-container" style={{ maxWidth: 1320, margin: '0 auto', padding: '0 56px' }}>
          <div
            className="mts-footer-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: '1.4fr 1fr 1fr',
              gap: 40,
              paddingBottom: 36,
              borderBottom: `1px solid ${T.border}`,
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <span
                  style={{
                    width: 32,
                    height: 32,
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: T.accent,
                    color: '#0a0c10',
                    fontFamily: sans,
                    fontWeight: 800,
                    fontSize: 16,
                  }}
                >
                  M
                </span>
                <span style={{ fontFamily: sans, fontSize: 16, fontWeight: 600, color: T.ink }}>MIT Tech Studio</span>
              </div>
              <p style={{ margin: 0, maxWidth: 320, fontFamily: sans, fontSize: 13, lineHeight: 1.7, color: T.sub }}>
                {tHero('subtitle')}
              </p>
            </div>

            <div>
              <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: 1.4, textTransform: 'uppercase', color: T.dim, marginBottom: 14 }}>
                {tFooter('siteNav')}
              </div>
              {NAV_LINKS.map((l) => (
                <a key={l.href} href={l.href} className="mts-foot-link" style={{ display: 'block', fontFamily: sans, fontSize: 14, color: T.sub, padding: '5px 0', textDecoration: 'none' }}>
                  {l.label}
                </a>
              ))}
            </div>

            <div>
              <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: 1.4, textTransform: 'uppercase', color: T.dim, marginBottom: 14 }}>
                {tFooter('legalNav')}
              </div>
              {([
                ['/privacy', tFooter('privacy')],
                ['/terms', tFooter('terms')],
                ['/disclaimer', tFooter('disclaimer')],
                ['/tokushoho', tFooter('tokushoho')],
                ['/contact', tFooter('contactLegal')],
              ] as const).map(([href, label]) => (
                <Link key={href} href={href} className="mts-foot-link" style={{ display: 'block', fontFamily: sans, fontSize: 13, color: T.sub, padding: '5px 0', textDecoration: 'none' }}>
                  {label}
                </Link>
              ))}
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              gap: 18,
              paddingTop: 24,
              flexWrap: 'wrap',
              fontFamily: mono,
              fontSize: 11,
              color: T.sub,
            }}
          >
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 6, height: 6, borderRadius: 3, background: T.green }} />
              all systems normal
            </span>
            <span>{FOOTER_META.build}</span>
            <span style={{ flex: 1 }} />
            <span style={{ color: T.ink }}>{FOOTER_META.copyright}</span>
            <span>{tFooter('rights')}</span>
          </div>
        </div>
      </footer>

      {/* ───────────── Scoped styles ───────────── */}
      <style>{`
        html { scroll-behavior: smooth; }
        .mts-reveal {
          opacity: 0;
          transform: translateY(22px);
          transition: opacity .7s cubic-bezier(.16,1,.3,1), transform .7s cubic-bezier(.16,1,.3,1);
          will-change: opacity, transform;
        }
        .mts-reveal.is-in { opacity: 1; transform: none; }
        .mts-nav-link:hover { color: ${T.ink}; background: ${T.surface2}; }
        .mts-cta:hover { box-shadow: 0 0 0 1px ${T.accent}, 0 10px 30px -12px ${T.accent}; }
        .mts-ghost:hover { border-color: ${T.accent}; color: ${T.accent}; }
        .mts-card { transition: border-color .18s ease, transform .18s ease; }
        .mts-work-card:hover { border-color: ${T.borderStrong}; transform: translateY(-3px); }
        .mts-inline-link:hover { text-decoration: underline; }
        .mts-foot-link:hover { color: ${T.ink}; }
        @keyframes mtsPulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.5); opacity: 0.55; }
        }
        @media (max-width: 960px) {
          .mts-container { padding-left: 28px !important; padding-right: 28px !important; }
          .mts-about-grid, .mts-contact-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .mts-skill-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .mts-works-grid { grid-template-columns: 1fr !important; }
          .mts-footer-grid { grid-template-columns: 1fr !important; gap: 28px !important; }
        }
        @media (max-width: 680px) {
          .mts-nav-links { display: none !important; }
          .mts-skill-grid { grid-template-columns: 1fr !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          html { scroll-behavior: auto; }
          .mts-reveal { transition: none; }
        }
      `}</style>
    </main>
  );
}
