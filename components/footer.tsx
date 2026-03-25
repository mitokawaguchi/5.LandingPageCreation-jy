'use client';

import { useTranslations } from 'next-intl';

export function Footer() {
  const t = useTranslations('footer');
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card py-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {year} Mit Tech Studio. {t('rights')}
          </p>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#" className="underline-animate transition-colors hover:text-primary">
              {t('privacy')}
            </a>
            <a href="#" className="underline-animate transition-colors hover:text-primary">
              {t('terms')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
