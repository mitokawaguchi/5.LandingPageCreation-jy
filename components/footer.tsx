'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export function Footer() {
  const t = useTranslations('footer');
  const year = new Date().getFullYear();

  const legalLinks = [
    { href: '/terms' as const, label: t('terms') },
    { href: '/privacy' as const, label: t('privacy') },
    { href: '/disclaimer' as const, label: t('disclaimer') },
    { href: '/tokushoho' as const, label: t('tokushoho') },
    { href: '/contact' as const, label: t('contactLegal') },
    { href: '/about' as const, label: t('operator') },
  ];

  return (
    <footer className="border-t border-border bg-card py-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center gap-6">
          <nav
            className="flex max-w-2xl flex-wrap justify-center gap-x-5 gap-y-2 text-xs text-muted-foreground md:text-sm"
            aria-label={t('legalNav')}
          >
            {legalLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="underline-animate transition-colors hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <p className="text-center text-sm text-muted-foreground">
            &copy; {year} MIT Tech Studio. {t('rights')}
          </p>
        </div>
      </div>
    </footer>
  );
}
