'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
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

export function HomePageClient() {
  const [intro, setIntro] = useState(true);
  const [revealed, setRevealed] = useState(false);

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
        <StatusBar />
        <NavHeader />
        <TickerStrip />
        <HeroSection />
        <AboutSection />
        <WorksSection />
        <LabSection />
        <WritingSection />
        <ContactSection />
        <Footer />
      </div>
    </main>
  );
}
