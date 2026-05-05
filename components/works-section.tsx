'use client';

import { useTranslations } from 'next-intl';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import { WorkCard, type WorkItemMsg } from '@/components/work-card';
import { LAB_REPOS } from '@/data/lab-github';

const workColors = ['#356A7C', '#5ba3b8', '#7ec8e3'] as const;

const workImages = [
  'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
] as const;

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

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((work, i) => (
            <WorkCard
              key={work.title}
              work={work}
              color={workColors[i % workColors.length]}
              image={workImages[i % workImages.length]}
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
