import type { ReactNode } from 'react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { LegalShell } from '@/components/legal/legal-shell';

type LegalPageLayoutProps = {
  locale: string;
  title: string;
  children: ReactNode;
};

export async function LegalPageLayout({ locale, title, children }: LegalPageLayoutProps) {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background pt-20 selection:bg-primary selection:text-primary-foreground">
        <LegalShell locale={locale} title={title}>
          {children}
        </LegalShell>
      </main>
      <Footer />
    </>
  );
}
