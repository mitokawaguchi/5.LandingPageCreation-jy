'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/navigation';

export function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations('locale');
  const tNav = useTranslations('nav');

  const path = pathname && pathname.length > 0 ? pathname : '/';

  const handleSwitch = (next: 'ja' | 'en') => {
    if (next === locale) {
      return;
    }
    router.push(path, { locale: next });
  };

  return (
    <div
      className="flex items-center gap-0.5 rounded-lg border border-border bg-secondary/40 p-0.5 text-xs"
      role="navigation"
      aria-label={tNav('language')}
    >
      <button
        type="button"
        onClick={() => handleSwitch('ja')}
        aria-pressed={locale === 'ja'}
        className={`rounded-md px-2 py-1 font-medium transition-colors ${
          locale === 'ja'
            ? 'bg-primary text-primary-foreground'
            : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        {t('ja')}
      </button>
      <button
        type="button"
        onClick={() => handleSwitch('en')}
        aria-pressed={locale === 'en'}
        className={`rounded-md px-2 py-1 font-medium transition-colors ${
          locale === 'en'
            ? 'bg-primary text-primary-foreground'
            : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        {t('en')}
      </button>
    </div>
  );
}
