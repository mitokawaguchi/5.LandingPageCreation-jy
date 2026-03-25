'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import { Github, Zap, Shield } from 'lucide-react';

function AnimatedCounter({ target, isVisible }: { target: string; isVisible: boolean }) {
  const [count, setCount] = useState(0);
  const isNumber = !Number.isNaN(Number(target));

  useEffect(() => {
    if (!isVisible || !isNumber) {
      return;
    }

    const targetNum = Number(target);
    const duration = 1500;
    const steps = 40;
    const stepDuration = duration / steps;
    const increment = targetNum / steps;

    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= targetNum) {
        setCount(targetNum);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isVisible, target, isNumber]);

  if (!isNumber) {
    return (
      <span
        className={`text-2xl font-bold text-primary transition-all duration-500 ${
          isVisible ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
        }`}
      >
        {target}
      </span>
    );
  }

  return (
    <span
      className={`text-2xl font-bold text-primary transition-all duration-500 ${
        isVisible ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
      }`}
    >
      {count}
    </span>
  );
}

export function LabSection() {
  const t = useTranslations('lab');
  const { ref, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.2 });

  return (
    <section ref={ref} id="lab" className="bg-card py-24 md:py-32">
      <div className="container mx-auto px-6">
        <div className="mb-12">
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
        </div>

        <div
          className={`card-glow rounded-2xl border border-border bg-secondary p-6 transition-all delay-200 duration-700 md:p-8 ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
        >
          <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div className="flex-1">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/20">
                  <Github className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground">{t('projectTitle')}</h3>
                  <p className="text-sm text-muted-foreground">{t('projectStack')}</p>
                </div>
              </div>

              <p className="mb-6 leading-relaxed text-muted-foreground">{t('body')}</p>

              <div className="flex items-center gap-8">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20">
                    <Zap className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <AnimatedCounter target="100" isVisible={isVisible} />
                    <p className="text-xs text-muted-foreground">{t('lighthouse')}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/20">
                    <Shield className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <AnimatedCounter target="A+" isVisible={isVisible} />
                    <p className="text-xs text-muted-foreground">{t('accessibility')}</p>
                  </div>
                </div>
              </div>
            </div>

            <a
              href="https://github.com/mitokawaguchi/5.LandingPageCreation-jy"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground transition-all duration-200 hover:bg-primary/90 active:scale-95"
            >
              <Github className="h-5 w-5" />
              {t('viewGithub')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
