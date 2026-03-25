'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { ChevronDown } from 'lucide-react';

export function HeroSection() {
  const t = useTranslations('hero');

  const handleScrollToWorks = (e: React.MouseEvent) => {
    e.preventDefault();
    document.querySelector('#works')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      className="relative flex min-h-screen flex-col overflow-hidden bg-background bg-grid"
      id="home"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="hero-orb hero-orb-1 absolute left-1/4 top-20 max-md:h-64 max-md:w-64 max-md:opacity-15 max-md:blur-[72px] h-96 w-96 rounded-full bg-primary opacity-20 blur-[120px] filter" />
        <div className="hero-orb hero-orb-2 absolute bottom-20 right-1/4 max-md:h-56 max-md:w-56 max-md:opacity-12 max-md:blur-[60px] h-80 w-80 rounded-full bg-accent opacity-15 blur-[100px] filter" />
      </div>

      <div className="flex flex-1 items-center justify-center">
        <div className="container relative z-10 mx-auto px-6 pt-14">
          <div className="mx-auto max-w-3xl text-center">
            <div className="hero-fade-in mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/80 px-4 py-2 backdrop-blur">
              <span className="h-2 w-2 animate-pulse rounded-full bg-accent" />
              <span className="text-sm font-medium text-muted-foreground">{t('badge')}</span>
            </div>

            <h1 className="hero-fade-in hero-delay-1 mb-6 text-5xl font-bold leading-tight tracking-tight md:text-7xl">
              <span className="text-foreground">{t('line1')}</span>
              <br />
              <span className="text-3xl font-light text-muted-foreground md:text-5xl">{t('line2')}</span>
              <br />
              <span className="text-shimmer">{t('line3')}</span>
            </h1>

            <p className="hero-fade-in hero-delay-2 mx-auto mb-10 max-w-xl text-lg font-light leading-relaxed text-muted-foreground md:text-xl">
              {t('subtitle')}
            </p>

            <div className="hero-fade-in hero-delay-3 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="#works"
                onClick={handleScrollToWorks}
                className="btn-primary rounded-lg bg-primary px-8 py-3.5 text-base font-semibold text-primary-foreground transition-all duration-200 pulse-glow hover:bg-primary/90 active:scale-95"
              >
                {t('viewWorks')}
              </a>
              <a
                href="#about"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="rounded-lg border border-border bg-secondary/80 px-8 py-3.5 text-base font-semibold text-foreground backdrop-blur transition-all duration-200 hover:bg-secondary active:scale-95"
              >
                {t('learnMore')}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-fade-in hero-delay-4 pointer-events-none z-20 flex flex-col items-center pb-10">
        <span className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {t('scroll')}
        </span>
        <div className="animate-float">
          <ChevronDown className="h-5 w-5 text-primary" />
        </div>
      </div>
    </section>
  );
}
