'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import { Palette, Code2, Smartphone, HeadphonesIcon } from 'lucide-react';
import { AboutSkillTile, type AboutSkillTileSkill } from '@/components/about-skill-tile';

const skillIcons = [Palette, Code2, Smartphone, HeadphonesIcon] as const;
const skillColors = ['#5ba3b8', '#356A7C', '#7ec8e3', '#4a8a9c'] as const;

type SkillMsg = { label: string; stack: string[] };

export function AboutSection() {
  const t = useTranslations('about');
  const { ref: sectionRef, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.2 });
  const [activeSkillLabel, setActiveSkillLabel] = useState<string | null>(null);

  const rawSkills = t.raw('skills') as SkillMsg[];
  const skills: AboutSkillTileSkill[] = rawSkills.map((s, i) => ({
    label: s.label,
    stack: s.stack,
    icon: skillIcons[i],
    color: skillColors[i],
  }));

  const toggleSkill = (label: string) => {
    if (typeof window !== 'undefined' && window.matchMedia('(min-width: 768px)').matches) {
      return;
    }
    setActiveSkillLabel((prev) => (prev === label ? null : label));
  };

  return (
    <section ref={sectionRef} id="about" className="relative bg-card py-24 md:py-32">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center gap-16 lg:flex-row">
          <div
            className={`transition-all duration-700 lg:w-1/2 ${
              isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
            }`}
          >
            <div className="relative">
              <div className="card-glow overflow-hidden rounded-2xl border border-border">
                <img
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop"
                  alt={t('imageAlt')}
                  className="h-auto w-full object-cover"
                  width={600}
                  height={400}
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <div
                className={`absolute -bottom-4 -right-4 rounded-2xl border border-border bg-secondary p-4 transition-all delay-300 duration-700 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20">
                    <span className="text-lg">✨</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{t('since')}</p>
                    <p className="text-xs text-muted-foreground">{t('sinceSub')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2">
            <div
              className={`transition-all delay-100 duration-700 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
              }`}
            >
              <span className="text-sm font-semibold uppercase tracking-wide text-primary">
                {t('kicker')}
              </span>
              <h2 className="mt-2 mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                {t('title')}
              </h2>
            </div>

            <p
              className={`mb-8 text-lg leading-relaxed text-muted-foreground transition-all delay-200 duration-700 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
              }`}
            >
              {t('body')}
            </p>

            <div className={`stagger-children grid grid-cols-2 gap-3 ${isVisible ? 'visible' : ''}`}>
              {skills.map((skill) => (
                <AboutSkillTile
                  key={skill.label}
                  skill={skill}
                  isActive={activeSkillLabel === skill.label}
                  onToggle={() => toggleSkill(skill.label)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
