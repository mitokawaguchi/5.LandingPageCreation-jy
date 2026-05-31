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
  const [introComplete, setIntroComplete] = useState(false);

  return (
    <main style={{ background: '#06070a', minHeight: '100vh' }}>
      {!introComplete && <StudioIntro onDone={() => setIntroComplete(true)} />}
      <div
        style={{
          opacity: introComplete ? 1 : 0,
          filter: introComplete ? 'none' : 'blur(8px)',
          transition: 'opacity .6s ease, filter .6s ease',
        }}
      >
        <StatusBar />
        <NavHeader />
        <TickerStrip />
        <HeroSection />
        <AboutSection />
        <WorksSection />
        <WritingSection />
        <ContactSection />
        <Footer />
      </div>
    </main>
  );
}
