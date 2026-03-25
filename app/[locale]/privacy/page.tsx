import { getTranslations } from 'next-intl/server';
import { LegalPageLayout } from '@/components/legal/legal-page-layout';
import { PrivacyContentEn } from '@/components/legal/privacy-content-en';
import { PrivacyContentJa } from '@/components/legal/privacy-content-ja';

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'legalMeta' });
  return { title: `${t('privacyTitle')} | MIT Tech Studio` };
}

export default async function PrivacyPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'legalMeta' });

  return (
    <LegalPageLayout locale={locale} title={t('privacyTitle')}>
      {locale === 'en' ? <PrivacyContentEn /> : <PrivacyContentJa />}
    </LegalPageLayout>
  );
}
