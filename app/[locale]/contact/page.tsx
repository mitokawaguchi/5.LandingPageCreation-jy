import { getTranslations } from 'next-intl/server';
import { LegalPageLayout } from '@/components/legal/legal-page-layout';
import { ContactLegalContentEn } from '@/components/legal/contact-legal-content-en';
import { ContactLegalContentJa } from '@/components/legal/contact-legal-content-ja';

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'legalMeta' });
  return { title: `${t('contactLegalTitle')} | MIT Tech Studio` };
}

export default async function ContactLegalPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'legalMeta' });

  return (
    <LegalPageLayout locale={locale} title={t('contactLegalTitle')}>
      {locale === 'en' ? <ContactLegalContentEn /> : <ContactLegalContentJa />}
    </LegalPageLayout>
  );
}
