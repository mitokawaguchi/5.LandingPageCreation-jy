import { getTranslations } from 'next-intl/server';
import { LegalPageLayout } from '@/components/legal/legal-page-layout';
import { TokushohoContentEn } from '@/components/legal/tokushoho-content-en';
import { TokushohoContentJa } from '@/components/legal/tokushoho-content-ja';

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'legalMeta' });
  return { title: `${t('tokushohoTitle')} | MIT Tech Studio` };
}

export default async function TokushohoPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'legalMeta' });

  return (
    <LegalPageLayout locale={locale} title={t('tokushohoTitle')}>
      {locale === 'en' ? <TokushohoContentEn /> : <TokushohoContentJa />}
    </LegalPageLayout>
  );
}
