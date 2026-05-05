'use client';

import { useTranslations } from 'next-intl';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import { GithubActivityCard } from '@/components/github-activity-card';
import { WorkCard, type WorkItemMsg } from '@/components/work-card';
import { LAB_REPOS } from '@/data/lab-github';

const workColors = ['#356A7C', '#5ba3b8', '#7ec8e3'] as const;

export function WorksSection() {
  const t = useTranslations('works');
  const lab = useTranslations('lab');
  const { ref, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.1 });
  const labels = {
    viewRepo: lab('viewRepo'),
    viewDemo: lab('viewDemo'),
  };
  const activityLabels = {
    statsRepos: lab('statsRepos'),
    statsFollowers: lab('statsFollowers'),
    statsFollowing: lab('statsFollowing'),
    commits: lab('commits'),
    viewProfile: lab('viewProfile'),
    title: t('githubStatsTitle'),
    body: t('githubStatsBody'),
    languagesTitle: t('githubLanguagesTitle'),
    timelineTitle: t('timelineTitle'),
    monthlyUpdate: t('monthlyUpdate'),
    build: t('build'),
    deploy: t('deploy'),
    projectUnit: t('projectUnit'),
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

        <GithubActivityCard labels={activityLabels} isVisible={isVisible} />

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
