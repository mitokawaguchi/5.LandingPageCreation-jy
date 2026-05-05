'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import { LAB_GITHUB_PROFILE } from '@/data/lab-github';
import { WorkCard, type WorkItemMsg } from '@/components/work-card';
import { LAB_REPOS } from '@/data/lab-github';

const workColors = ['#356A7C', '#5ba3b8', '#7ec8e3'] as const;

type AnimatedStatProps = {
  label: string;
  value: number;
  isVisible: boolean;
};

function AnimatedStat({ label, value, isVisible }: AnimatedStatProps) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isVisible) {
      return;
    }
    let frameId = 0;
    const durationMs = 700;
    const startTime = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / durationMs, 1);
      setDisplayValue(Math.round(value * progress));
      if (progress < 1) {
        frameId = window.requestAnimationFrame(tick);
      }
    };

    frameId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frameId);
  }, [isVisible, value]);

  return (
    <div className="rounded-lg border border-border bg-background px-3 py-2 text-left">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-lg font-semibold tabular-nums text-foreground">{displayValue}</p>
    </div>
  );
}

export function WorksSection() {
  const t = useTranslations('works');
  const lab = useTranslations('lab');
  const { ref, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.1 });
  const labels = {
    viewRepo: lab('viewRepo'),
    viewDemo: lab('viewDemo'),
  };
  const totalCommits = LAB_REPOS.reduce((sum, repo) => sum + repo.commitsCount, 0);
  const stats: ReadonlyArray<{ label: string; value: number }> = [
    { label: lab('statsRepos'), value: LAB_GITHUB_PROFILE.publicRepos },
    { label: lab('commits'), value: totalCommits },
    { label: lab('statsFollowers'), value: LAB_GITHUB_PROFILE.followers },
    { label: lab('statsFollowing'), value: LAB_GITHUB_PROFILE.following },
  ];
  const items: WorkItemMsg[] = LAB_REPOS.map((repo) => ({
    title: repo.name,
    category: repo.language ?? 'Profile',
    categoryAlt: `${repo.commitsCount} ${lab('commits')}`,
    description: lab(`repos.${repo.id}.desc`),
    tags: [
      repo.language ?? 'GitHub',
      `${repo.commitsCount} ${lab('commits')}`,
    ],
    repoUrl: repo.htmlUrl,
    demoUrl: repo.homepage,
    imageUrl: repo.imageUrl,
  }));

  return (
    <section ref={ref} id="works" className="bg-background bg-grid bg-grid-motion py-24 md:py-32">
      <div className="container mx-auto px-6">
        <div className="mb-16 text-center">
          <span
            className={`text-sm font-semibold uppercase tracking-wide text-primary transition-all duration-700 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
            }`}
          >
            {t('kicker')}
          </span>
          <h2
            className={`mt-2 text-3xl font-bold tracking-tight text-foreground transition-all delay-100 duration-700 md:text-4xl ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
            }`}
          >
            {t('title')}
          </h2>
          <p
            className={`mt-4 text-muted-foreground transition-all delay-200 duration-700 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
            }`}
          >
            {t('disclaimer')}
          </p>
        </div>

        <div
          className={`mb-10 grid grid-cols-2 gap-3 rounded-2xl border border-border bg-card p-4 transition-all delay-300 duration-700 md:grid-cols-4 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          {stats.map((stat) => (
            <AnimatedStat
              key={stat.label}
              label={stat.label}
              value={stat.value}
              isVisible={isVisible}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((work, i) => (
            <WorkCard
              key={work.title}
              work={work}
              color={workColors[i % workColors.length]}
              index={i}
              isVisible={isVisible}
              labels={labels}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
