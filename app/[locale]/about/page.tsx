import { getTranslations } from 'next-intl/server';
import { LegalPageLayout } from '@/components/legal/legal-page-layout';
import { OperatorContentEn } from '@/components/legal/operator-content-en';
import { OperatorContentJa } from '@/components/legal/operator-content-ja';

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'legalMeta' });
  return { title: `${t('operatorTitle')} | MIT Tech Studio` };
}

export default async function OperatorInfoPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'legalMeta' });

  return (
    <LegalPageLayout locale={locale} title={t('operatorTitle')}>
      {locale === 'en' ? <OperatorContentEn /> : <OperatorContentJa />}
    </LegalPageLayout>
  );
}
