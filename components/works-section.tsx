'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import { ArrowUpRight } from 'lucide-react';

type WorkItemMsg = {
  title: string;
  category: string;
  categoryAlt: string;
  description: string;
  tags: string[];
};

const workColors = ['#356A7C', '#5ba3b8', '#7ec8e3'] as const;

const workImages = [
  'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
] as const;

type WorkCardProps = {
  work: WorkItemMsg;
  color: string;
  image: string;
  index: number;
  isVisible: boolean;
};

function WorkCard({ work, color, image, index, isVisible }: WorkCardProps) {
  return (
    <article
      className={`group card-glow overflow-hidden rounded-2xl border border-border bg-card transition-all duration-500 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt={work.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          width={600}
          height={450}
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <div className="absolute inset-0 hidden opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:block">
          <div className="gradient-animate absolute inset-0 opacity-35" />
          <div className="absolute inset-0 bg-black/35" />
          <div className="relative flex h-full w-full items-center justify-center p-4">
            <div className="flex max-w-[90%] flex-wrap justify-center gap-2">
              {work.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md border border-border bg-secondary/80 px-2.5 py-1 text-xs font-medium text-foreground backdrop-blur"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute right-4 top-4 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full bg-primary/90 opacity-0 backdrop-blur transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpRight className="h-5 w-5 text-primary-foreground" />
        </div>
      </div>

      <div className="p-5">
        <div className="mb-2 flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
              {work.title}
            </h3>
            <div className="relative inline-block">
              <span className="absolute -top-3 left-1/2 hidden -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-md border border-border bg-background/90 px-2 py-1 text-xs text-muted-foreground opacity-0 backdrop-blur transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100 md:block">
                {work.categoryAlt}
              </span>
              <div className="flex flex-col">
                <span
                  className="rounded-full px-2 py-0.5 text-xs font-medium"
                  style={{ background: `${color}20`, color }}
                >
                  {work.category}
                </span>
              </div>
            </div>
          </div>
        </div>

        <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">{work.description}</p>

        <div className="flex flex-wrap gap-2 md:hidden">
          {work.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-border bg-secondary px-2.5 py-1 text-xs font-medium text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

export function WorksSection() {
  const t = useTranslations('works');
  const { ref, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.1 });
  const items = t.raw('items') as WorkItemMsg[];

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
            />
          ))}
        </div>
      </div>
    </section>
  );
}
