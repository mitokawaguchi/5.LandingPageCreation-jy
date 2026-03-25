'use client';

import { useTranslations } from 'next-intl';
import { Github } from 'lucide-react';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import { LabRepoCard } from '@/components/lab-repo-card';
import { LAB_GITHUB_PROFILE, LAB_REPOS } from '@/data/lab-github';

export function LabSection() {
  const t = useTranslations('lab');
  const { ref, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.15 });

  const labelPack = {
    viewRepo: t('viewRepo'),
    viewDemo: t('viewDemo'),
    language: t('language'),
    openIssues: t('openIssues'),
  };

  return (
    <section ref={ref} id="lab" className="bg-card py-24 md:py-32">
      <div className="container mx-auto px-6">
        <div className="mb-10">
          <span
            className={`text-sm font-semibold uppercase tracking-wide text-accent transition-all duration-700 ${
              isVisible ? 'translate-x-0 opacity-100' : '-translate-x-5 opacity-0'
            }`}
          >
            {t('kicker')}
          </span>
          <h2
            className={`mt-2 text-3xl font-bold tracking-tight text-foreground transition-all delay-100 duration-700 md:text-4xl ${
              isVisible ? 'translate-x-0 opacity-100' : '-translate-x-5 opacity-0'
            }`}
          >
            {t('title')}
          </h2>
          <p
            className={`mt-4 max-w-2xl text-muted-foreground transition-all delay-150 duration-700 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
            }`}
          >
            {t('intro')}
          </p>
        </div>

        <div
          className={`card-glow mb-10 rounded-2xl border border-border bg-secondary p-6 transition-all delay-200 duration-700 md:p-8 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <img
                src={LAB_GITHUB_PROFILE.avatarUrl}
                alt={LAB_GITHUB_PROFILE.displayName}
                width={72}
                height={72}
                className="h-[72px] w-[72px] shrink-0 rounded-full border border-border bg-muted object-cover"
                loading="lazy"
                decoding="async"
              />
              <div>
                <p className="text-lg font-semibold text-foreground">{LAB_GITHUB_PROFILE.displayName}</p>
                <p className="font-mono text-sm text-muted-foreground">@{LAB_GITHUB_PROFILE.login}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-6 text-sm md:justify-end">
              <div>
                <p className="text-xs text-muted-foreground">{t('statsRepos')}</p>
                <p className="text-xl font-semibold tabular-nums text-foreground">
                  {LAB_GITHUB_PROFILE.publicRepos}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{t('statsFollowers')}</p>
                <p className="text-xl font-semibold tabular-nums text-foreground">
                  {LAB_GITHUB_PROFILE.followers}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{t('statsFollowing')}</p>
                <p className="text-xl font-semibold tabular-nums text-foreground">
                  {LAB_GITHUB_PROFILE.following}
                </p>
              </div>
            </div>
          </div>

          <a
            href={LAB_GITHUB_PROFILE.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-background/80 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary md:w-auto md:px-8"
          >
            <Github className="h-5 w-5" aria-hidden />
            {t('viewProfile')}
          </a>
        </div>

        <div
          className={`grid gap-5 transition-all delay-300 duration-700 md:grid-cols-2 lg:grid-cols-3 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          {LAB_REPOS.map((repo) => (
            <LabRepoCard
              key={repo.id}
              repo={repo}
              description={t(`repos.${repo.id}.desc`)}
              labels={labelPack}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
