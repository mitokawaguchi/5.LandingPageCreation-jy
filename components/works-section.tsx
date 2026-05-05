'use client';

import { useTranslations } from 'next-intl';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import { Github } from 'lucide-react';
import { WorkCard, type WorkItemMsg } from '@/components/work-card';
import { LAB_GITHUB_PROFILE, LAB_REPOS } from '@/data/lab-github';

const workColors = ['#356A7C', '#5ba3b8', '#7ec8e3'] as const;

export function WorksSection() {
  const t = useTranslations('works');
  const lab = useTranslations('lab');
  const { ref, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.1 });
  const labels = {
    viewRepo: lab('viewRepo'),
    viewDemo: lab('viewDemo'),
  };
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
    <section ref={ref} id="works" className="bg-background bg-grid py-24 md:py-32">
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
          className={`card-glow mb-10 rounded-2xl border border-border bg-secondary/70 p-6 transition-all delay-300 duration-700 md:p-8 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <img
                src={LAB_GITHUB_PROFILE.avatarUrl}
                alt={LAB_GITHUB_PROFILE.displayName}
                width={64}
                height={64}
                className="h-16 w-16 shrink-0 rounded-full border border-border bg-muted object-cover"
                loading="lazy"
                decoding="async"
              />
              <div>
                <p className="text-lg font-semibold text-foreground">
                  {LAB_GITHUB_PROFILE.displayName}
                </p>
                <p className="font-mono text-sm text-muted-foreground">
                  @{LAB_GITHUB_PROFILE.login}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-6 text-sm md:justify-end">
              <div>
                <p className="text-xs text-muted-foreground">{lab('statsRepos')}</p>
                <p className="text-xl font-semibold tabular-nums text-foreground">
                  {LAB_GITHUB_PROFILE.publicRepos}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{lab('statsFollowers')}</p>
                <p className="text-xl font-semibold tabular-nums text-foreground">
                  {LAB_GITHUB_PROFILE.followers}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{lab('statsFollowing')}</p>
                <p className="text-xl font-semibold tabular-nums text-foreground">
                  {LAB_GITHUB_PROFILE.following}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-[1.25fr_1fr]">
            <img
              src={LAB_GITHUB_PROFILE.statsCardUrl}
              alt={t('githubStatsAlt')}
              width={495}
              height={195}
              className="h-full w-full rounded-xl border border-border bg-background/80 p-3"
              loading="lazy"
              decoding="async"
            />
            <img
              src={LAB_GITHUB_PROFILE.languagesCardUrl}
              alt={t('githubLanguagesAlt')}
              width={360}
              height={195}
              className="h-full w-full rounded-xl border border-border bg-background/80 p-3"
              loading="lazy"
              decoding="async"
            />
          </div>

          <a
            href={LAB_GITHUB_PROFILE.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-background/80 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary md:w-auto md:px-8"
          >
            <Github className="h-4 w-4" aria-hidden />
            {lab('viewProfile')}
          </a>
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
