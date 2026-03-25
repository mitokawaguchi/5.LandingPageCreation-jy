'use client';

import type { SVGProps } from 'react';
import { useTranslations } from 'next-intl';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import { Github, Instagram, Mail } from 'lucide-react';

function ThreadsIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 960 960" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M404.63 392.13c-11.92-7.93-51.53-35.49-51.53-35.49 33.4-47.88 77.46-66.52 138.36-66.52 43.07 0 79.64 14.52 105.75 42 26.12 27.49 41.02 66.8 44.41 117.07 14.48 6.07 27.85 13.22 39.99 21.4 48.96 33 75.92 82.34 75.92 138.91 0 120.23-98.34 224.67-276.35 224.67-152.84 0-311.63-89.11-311.63-354.45 0-263.83 153.81-353.92 311.2-353.92 72.68 0 243.16 10.76 307.27 222.94l-60.12 15.63C678.33 213.2 574.4 189.14 479.11 189.14c-157.52 0-246.62 96.13-246.62 300.65 0 183.38 99.59 280.8 248.71 280.8 122.68 0 214.15-63.9 214.15-157.44 0-63.66-53.37-94.14-56.1-94.14-10.42 54.62-38.36 146.5-161.01 146.5-71.46 0-133.07-49.47-133.07-114.29 0-92.56 87.61-126.06 156.8-126.06 25.91 0 57.18 1.75 73.46 5.07 0-28.21-23.81-76.49-83.96-76.49-55.15-.01-69.14 17.92-86.84 38.39zm105.8 96.25c-90.13 0-101.79 38.51-101.79 62.7 0 38.86 46.07 51.74 70.65 51.74 45.06 0 91.35-12.52 98.63-107.31-22.85-5.14-39.88-7.13-67.49-7.13z" />
    </svg>
  );
}

export function ContactSection() {
  const t = useTranslations('contact');
  const { ref, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.2 });

  return (
    <section ref={ref} id="contact" className="bg-background bg-grid py-24 md:py-32">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-2xl text-center">
          <div
            className={`mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/20 transition-all duration-700 ${
              isVisible ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
            }`}
          >
            <Mail className="h-8 w-8 text-primary" />
          </div>

          <h2
            className={`mb-4 text-4xl font-extrabold tracking-tight text-foreground transition-all delay-100 duration-700 md:text-5xl ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <span className="text-foreground">{t('title')}</span>{' '}
            <span className="text-shimmer">{t('titleAccent')}</span>
          </h2>

          <p
            className={`mb-10 text-lg leading-relaxed text-muted-foreground transition-all delay-200 duration-700 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            {t('body')}
          </p>

          <a
            href="mailto:contact@mittechstudio.com"
            className={`inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-4 text-lg font-semibold text-primary-foreground transition-all duration-300 pulse-glow hover:bg-primary/90 active:scale-95 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            <Mail className="h-5 w-5" />
            {t('cta')}
          </a>

          <div
            className={`mt-12 flex justify-center gap-4 transition-all delay-500 duration-700 ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <a
              href="https://www.instagram.com/mito_112_/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-secondary text-muted-foreground transition-all duration-200 hover:bg-primary/20 hover:text-primary active:scale-95"
            >
              <span className="sr-only">{t('instagram')}</span>
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href="https://www.threads.net/@mito_112_"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-secondary text-muted-foreground transition-all duration-200 hover:bg-primary/20 hover:text-primary active:scale-95"
            >
              <span className="sr-only">{t('threads')}</span>
              <ThreadsIcon className="h-5 w-5" />
            </a>
            <a
              href="https://github.com/mitokawaguchi"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-secondary text-muted-foreground transition-all duration-200 hover:bg-primary/20 hover:text-primary active:scale-95"
            >
              <span className="sr-only">{t('github')}</span>
              <Github className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
