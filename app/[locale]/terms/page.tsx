import { getTranslations } from 'next-intl/server';
import { LegalPageLayout } from '@/components/legal/legal-page-layout';
import { TermsContentEn } from '@/components/legal/terms-content-en';
import { TermsContentJa } from '@/components/legal/terms-content-ja';

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'legalMeta' });
  return { title: `${t('termsTitle')} | MIT Tech Studio` };
}

export default async function TermsPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'legalMeta' });

  return (
    <LegalPageLayout locale={locale} title={t('termsTitle')}>
      {locale === 'en' ? <TermsContentEn /> : <TermsContentJa />}
    </LegalPageLayout>
  );
}
