import type { ReactNode } from 'react';
import { Link } from '@/i18n/navigation';
import { getTranslations } from 'next-intl/server';

type LegalShellProps = {
  locale: string;
  title: string;
  children: ReactNode;
};

export async function LegalShell({ locale, title, children }: LegalShellProps) {
  const t = await getTranslations({ locale, namespace: 'legalMeta' });

  return (
    <article className="mx-auto max-w-[800px] px-4 pb-20 pt-8 md:px-6">
      <Link
        href="/"
        className="mb-8 inline-block text-sm text-muted-foreground transition-colors hover:text-primary"
      >
        {t('backToHome')}
      </Link>
      <p className="mb-2 text-sm text-muted-foreground">
        {t('lastUpdatedPrefix')} {t('dateValue')}
      </p>
      <h1 className="mb-10 text-2xl font-bold tracking-tight text-foreground md:text-3xl">{title}</h1>
      <div className="legal-prose">{children}</div>
    </article>
  );
}
