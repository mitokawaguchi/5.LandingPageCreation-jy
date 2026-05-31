'use client';

import { useState } from 'react';

/* ─── Design Tokens ─── */
const t = {
  bg: '#06070a',
  surface: '#0a0c10',
  surface2: '#0e1116',
  surface3: '#13171e',
  border: '#1a1f28',
  ink: '#e9edf2',
  sub: '#8a93a0',
  dim: '#3d4654',
  accent: '#b5fb6b',
  warn: '#ffb648',
  pink: '#ff5da2',
  blue: '#5ecfff',
  green: '#69e6a6',
  purple: '#b48cff',
} as const;

/* ─── Skills Data ─── */
const SKILLS = [
  {
    label: 'UI/UXデザイン',
    stack: ['Figma', 'デザインシステム', 'プロトタイプ'],
    langs: ['Figma', 'Adobe XD', 'Photoshop', 'Illustrator', 'Framer', 'デザインシステム', 'プロトタイピング', 'Auto Layout', 'Design Tokens', 'アクセシビリティ'],
    color: t.accent,
  },
  {
    label: 'フロントエンド開発',
    stack: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React'],
    langs: ['HTML', 'CSS', 'Sass', 'JavaScript', 'TypeScript', 'React', 'Vue', 'Tailwind CSS', 'Framer Motion', 'GSAP', 'Three.js'],
    color: t.warn,
  },
  {
    label: 'Webアプリケーション',
    stack: ['Next.js', 'API', '認証', 'DB'],
    langs: ['Next.js', 'Node.js', 'Express', 'REST API', 'GraphQL', 'Prisma', 'PostgreSQL', 'Supabase', 'Auth.js', 'Stripe'],
    color: t.blue,
  },
  {
    label: 'テクニカルサポート',
    stack: ['Git', 'CI/CD', 'パフォーマンス', 'アクセシビリティ'],
    langs: ['Git', 'GitHub Actions', 'Docker', 'Vercel', 'CI/CD', 'Vitest', 'Playwright', 'Lighthouse', 'Web Vitals', 'Sentry'],
    color: t.purple,
  },
];

/* ─── Skill Card ─── */
function SkillCard({ skill, index }: { skill: typeof SKILLS[number]; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        minWidth: 320,
        padding: '28px 24px',
        background: t.surface,
        border: `1px solid ${t.border}`,
        borderRadius: 12,
        flexShrink: 0,
        cursor: 'default',
        transition: 'border-color 0.2s',
        borderTopColor: hovered ? skill.color : t.border,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: skill.color,
            boxShadow: `0 0 6px ${skill.color}44`,
          }}
        />
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: t.dim, letterSpacing: '0.08em' }}>
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      <h4 style={{ fontSize: 18, fontWeight: 700, color: t.ink, marginBottom: 12, fontFamily: '"Noto Sans JP", "Hiragino Kaku Gothic ProN", sans-serif' }}>
        {skill.label}
      </h4>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
        {(hovered ? skill.langs : skill.stack).map((tag) => (
          <span
            key={tag}
            style={{
              fontSize: 11,
              padding: '3px 8px',
              borderRadius: 4,
              background: t.surface3,
              border: `1px solid ${t.border}`,
              color: t.sub,
              fontFamily: 'var(--font-mono)',
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {!hovered && (
        <span style={{ fontSize: 11, color: t.dim, fontFamily: 'var(--font-mono)' }}>
          hover で全スタックを表示
        </span>
      )}
    </div>
  );
}

/* ─── Marquee ─── */
function SkillsMarquee() {
  return (
    <div style={{ overflow: 'hidden', width: '100%', position: 'relative', marginTop: 80 }}>
      {/* Fade masks */}
      <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: 80, background: `linear-gradient(to right, ${t.bg}, transparent)`, zIndex: 1, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: 80, background: `linear-gradient(to left, ${t.bg}, transparent)`, zIndex: 1, pointerEvents: 'none' }} />

      <div
        style={{
          display: 'flex',
          width: 'max-content',
          gap: 24,
          animation: 'skills-marquee 40s linear infinite',
        }}
      >
        {[...SKILLS, ...SKILLS, ...SKILLS].map((skill, i) => (
          <SkillCard key={`${skill.label}-${i}`} skill={skill} index={i % SKILLS.length} />
        ))}
      </div>

      <style>{`
        @keyframes skills-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-320px * 4 - 24px * 4)); }
        }
      `}</style>
    </div>
  );
}

/* ─── Main Section ─── */
export function AboutSection() {
  const [langMode, setLangMode] = useState<'jp' | 'en'>('jp');

  return (
    <section
      id="about"
      style={{ background: t.bg, padding: '180px 0' }}
    >
      <div style={{ maxWidth: 1320, margin: '0 auto', padding: '0 56px' }}>
        {/* Section header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: t.dim, letterSpacing: '0.08em' }}>§02</span>
          <span style={{ width: 24, height: 1, background: t.dim, display: 'inline-block' }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: t.sub, letterSpacing: '0.04em' }}>Studio brief</span>
        </div>

        <h2
          style={{
            fontSize: 'clamp(32px, 4vw, 52px)',
            fontWeight: 800,
            color: t.ink,
            lineHeight: 1.3,
            marginBottom: 64,
            fontFamily: '"Noto Sans JP", "Hiragino Kaku Gothic ProN", sans-serif',
          }}
        >
          デザインとエンジニアリングの境界をなくす。
        </h2>

        {/* Two-column layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '7fr 5fr', gap: 48 }}>
          {/* Left: main content */}
          <div>
            {/* Meta strip */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: t.dim }}>§01 · Studio note · 2026 · rev.06</span>
            </div>

            {/* Lang toggle */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 32 }}>
              <button
                onClick={() => setLangMode('jp')}
                style={{
                  padding: '4px 12px',
                  borderRadius: 4,
                  border: `1px solid ${langMode === 'jp' ? t.accent : t.border}`,
                  background: langMode === 'jp' ? `${t.accent}15` : 'transparent',
                  color: langMode === 'jp' ? t.accent : t.sub,
                  fontSize: 12,
                  fontFamily: 'var(--font-mono)',
                  cursor: 'pointer',
                }}
              >
                JP
              </button>
              <button
                onClick={() => setLangMode('en')}
                style={{
                  padding: '4px 12px',
                  borderRadius: 4,
                  border: `1px solid ${langMode === 'en' ? t.accent : t.border}`,
                  background: langMode === 'en' ? `${t.accent}15` : 'transparent',
                  color: langMode === 'en' ? t.accent : t.sub,
                  fontSize: 12,
                  fontFamily: 'var(--font-mono)',
                  cursor: 'pointer',
                }}
              >
                EN
              </button>
            </div>

            {/* Body text */}
            <div style={{ marginBottom: 40 }}>
              {langMode === 'jp' ? (
                <p
                  style={{
                    fontSize: 'clamp(18px, 2.2vw, 26px)',
                    lineHeight: 1.9,
                    color: t.ink,
                    fontFamily: '"Noto Sans JP", "Hiragino Kaku Gothic ProN", sans-serif',
                    fontWeight: 400,
                  }}
                >
                  デザインとエンジニアリングの垣根を取り払い、ユーザーにとって本当に価値のある体験を構築する。
                  細部へのこだわりと技術的な正確さを両立させ、プロダクトの品質を一段引き上げることを目指しています。
                  スタートアップから大規模プロジェクトまで、デザインシステムの構築からフロントエンド実装、
                  パフォーマンス最適化まで一貫して対応します。
                </p>
              ) : (
                <p
                  style={{
                    fontSize: 'clamp(16px, 1.8vw, 22px)',
                    lineHeight: 1.8,
                    color: t.ink,
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 400,
                  }}
                >
                  I bridge the gap between design and engineering to build experiences that truly matter.
                  Combining meticulous attention to detail with technical precision, I aim to elevate product quality.
                  From startups to large-scale projects — design systems, frontend implementation, and performance optimization — delivered end to end.
                </p>
              )}
            </div>

            {/* Attribution */}
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: t.dim, marginBottom: 48 }}>
              Mito Kawaguchi · Founder, MIT Tech Studio
            </p>

            {/* Footer stats */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 1,
                background: t.border,
                borderRadius: 8,
                overflow: 'hidden',
              }}
            >
              {[
                { label: 'Since', value: '2025.08.18' },
                { label: 'Engineers', value: '1 (+collaborators)' },
                { label: 'Tools', value: '12+ (TS · React · Next)' },
              ].map((stat) => (
                <div key={stat.label} style={{ background: t.surface, padding: '16px 20px' }}>
                  <span style={{ display: 'block', fontSize: 10, color: t.dim, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>
                    {stat.label}
                  </span>
                  <span style={{ fontSize: 13, color: t.sub, fontFamily: 'var(--font-mono)' }}>
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: side panel */}
          <div>
            {/* Now Playing placeholder */}
            <div
              style={{
                background: t.surface,
                border: `1px solid ${t.border}`,
                borderRadius: 12,
                padding: 24,
                marginBottom: 24,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: t.green, animation: 'pulse-dot 2s infinite' }} />
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: t.dim, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Now Playing</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 48, height: 48, borderRadius: 6, background: t.surface3, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: 20 }}>&#9835;</span>
                </div>
                <div>
                  <p style={{ fontSize: 13, color: t.ink, fontWeight: 500 }}>---</p>
                  <p style={{ fontSize: 11, color: t.dim }}>No track playing</p>
                </div>
              </div>
            </div>

            {/* Map dot */}
            <div
              style={{
                background: t.surface,
                border: `1px solid ${t.border}`,
                borderRadius: 12,
                padding: 24,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: t.dim, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Location</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ position: 'relative' }}>
                  <span style={{ width: 10, height: 10, borderRadius: '50%', background: t.accent, display: 'block' }} />
                  <span style={{ position: 'absolute', top: -3, left: -3, width: 16, height: 16, borderRadius: '50%', border: `1px solid ${t.accent}44`, animation: 'pulse-ring 2s infinite' }} />
                </div>
                <div>
                  <p style={{ fontSize: 13, color: t.ink, fontWeight: 500 }}>Tokyo, Japan</p>
                  <p style={{ fontSize: 11, color: t.dim, fontFamily: 'var(--font-mono)' }}>35.68°N / 139.69°E</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Skills Marquee */}
        <SkillsMarquee />
      </div>

      <style>{`
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        @keyframes pulse-ring {
          0% { transform: scale(1); opacity: 1; }
          100% { transform: scale(2.2); opacity: 0; }
        }
      `}</style>
    </section>
  );
}
