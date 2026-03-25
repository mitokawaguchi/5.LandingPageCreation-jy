import type { Metadata } from 'next';
import { Inter, Noto_Sans_JP } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';
import { routing } from '@/i18n/routing';
import '../globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '600', '700', '800'],
  display: 'swap',
});

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  variable: '--font-noto',
  weight: ['400', '600', '700', '800'],
  display: 'swap',
});

export function generateStaticParams(): { locale: string }[] {
  return routing.locales.map((locale) => ({ locale }));
}

type LayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  return {
    title: t('title'),
    description: t('description'),
    generator: 'v0.app',
    icons: {
      icon: [
        { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
        { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
        { url: '/icon.svg', type: 'image/svg+xml' },
      ],
      apple: '/apple-icon.png',
    },
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as 'ja' | 'en')) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} className="scroll-smooth">
      <body className={`${inter.variable} ${notoSansJP.variable} font-sans antialiased`}>
        <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
