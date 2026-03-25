'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { HomeSectionLink } from '@/components/home-section-link';

const sectionIds = ['about', 'works', 'lab', 'contact'] as const;

const linkClass =
  'underline-animate text-xs text-muted-foreground transition-colors hover:text-primary md:text-sm';

export function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');
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
    <footer className="border-t border-border bg-card py-10">
      <div className="container mx-auto max-w-4xl px-6">
        <div className="flex flex-col items-center gap-8">
          <nav
            className="flex flex-wrap justify-center gap-x-4 gap-y-2 md:gap-x-6"
            aria-label={t('siteNav')}
          >
            <Link href="/" className={linkClass}>
              {t('home')}
            </Link>
            {sectionIds.map((id) => (
              <HomeSectionLink key={id} sectionId={id} className={linkClass}>
                {tNav(id)}
              </HomeSectionLink>
            ))}
          </nav>

          <div className="h-px w-full max-w-md bg-border" aria-hidden="true" />

          <nav
            className="flex max-w-2xl flex-wrap justify-center gap-x-4 gap-y-2 md:gap-x-5"
            aria-label={t('legalNav')}
          >
            {legalLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`${linkClass} text-[11px] md:text-xs`}
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
