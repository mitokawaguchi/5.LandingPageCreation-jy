'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations('locale');
  const tNav = useTranslations('nav');

  return (
    <div
      className="flex items-center gap-0.5 rounded-lg border border-border bg-secondary/40 p-0.5 text-xs"
      role="navigation"
      aria-label={tNav('language')}
    >
      <Link
        href={pathname}
        locale="ja"
        hrefLang="ja"
        className={`rounded-md px-2 py-1 font-medium transition-colors ${
          locale === 'ja'
            ? 'bg-primary text-primary-foreground'
            : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        {t('ja')}
      </Link>
      <Link
        href={pathname}
        locale="en"
        hrefLang="en"
        className={`rounded-md px-2 py-1 font-medium transition-colors ${
          locale === 'en'
            ? 'bg-primary text-primary-foreground'
            : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        {t('en')}
      </Link>
    </div>
  );
}
