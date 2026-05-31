'use client';

import { useCallback, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import type { WritingArticle } from '@/types/writing-article';
import { StatusBar } from '@/components/status-bar';
import { NavHeader } from '@/components/nav-header';
import { TickerStrip } from '@/components/ticker-strip';
import { HeroSection } from '@/components/hero-section';

const StudioIntro = dynamic(
  () => import('@/components/studio-intro').then((m) => ({ default: m.StudioIntro })),
  { ssr: false },
);

const AboutSection = dynamic(
  () => import('@/components/about-section').then((m) => ({ default: m.AboutSection })),
  { ssr: false },
);

const WorksSection = dynamic(
  () => import('@/components/works-section').then((m) => ({ default: m.WorksSection })),
  { ssr: false },
);

const LabSection = dynamic(
  () => import('@/components/lab-section').then((m) => ({ default: m.LabSection })),
  { ssr: false },
);

const WritingSection = dynamic(
  () => import('@/components/writing-section').then((m) => ({ default: m.WritingSection })),
  { ssr: false },
);

const ContactSection = dynamic(
  () => import('@/components/contact-section').then((m) => ({ default: m.ContactSection })),
  { ssr: false },
);

const Footer = dynamic(
  () => import('@/components/footer').then((m) => ({ default: m.Footer })),
  { ssr: false },
);

const CmdK = dynamic(
  () => import('@/components/cmdk').then((m) => ({ default: m.CmdK })),
  { ssr: false },
);

const Crosshair = dynamic(
  () => import('@/components/crosshair').then((m) => ({ default: m.Crosshair })),
  { ssr: false },
);

export function HomePageClient({ articles }: { articles?: WritingArticle[] }) {
  const [intro, setIntro] = useState(true);
  const [revealed, setRevealed] = useState(false);
  const [cmdkOpen, setCmdkOpen] = useState(false);

  const closeCmdk = useCallback(() => setCmdkOpen(false), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCmdkOpen((v) => !v);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <main style={{ background: '#06070a', minHeight: '100vh' }}>
      {intro && (
        <StudioIntro
          onExitStart={() => setRevealed(true)}
          onDone={() => setIntro(false)}
        />
      )}
      <div
        style={{
          opacity: (intro && !revealed) ? 0 : 1,
          filter: (intro && !revealed) ? 'blur(10px)' : 'none',
          transition: 'opacity .55s ease, filter .55s ease',
          pointerEvents: (intro && !revealed) ? 'none' : 'auto',
        }}
      >
        <StatusBar onCmdK={() => setCmdkOpen(true)} />
        <NavHeader />
        <TickerStrip />
        <HeroSection />
        <AboutSection />
        <WorksSection />
        <LabSection />
        <WritingSection articles={articles} />
        <ContactSection />
        <Footer />
      </div>
      <CmdK open={cmdkOpen} onClose={closeCmdk} />
      <Crosshair />
    </main>
  );
}
