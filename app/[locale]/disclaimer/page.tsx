import { getTranslations } from 'next-intl/server';
import { LegalPageLayout } from '@/components/legal/legal-page-layout';
import { DisclaimerContentEn } from '@/components/legal/disclaimer-content-en';
import { DisclaimerContentJa } from '@/components/legal/disclaimer-content-ja';

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'legalMeta' });
  return { title: `${t('disclaimerTitle')} | MIT Tech Studio` };
}

export default async function DisclaimerPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'legalMeta' });

  return (
    <LegalPageLayout locale={locale} title={t('disclaimerTitle')}>
      {locale === 'en' ? <DisclaimerContentEn /> : <DisclaimerContentJa />}
    </LegalPageLayout>
  );
}
