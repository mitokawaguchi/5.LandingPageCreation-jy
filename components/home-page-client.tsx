'use client';

import dynamic from 'next/dynamic';
import { Header } from '@/components/header';
import { HeroSection } from '@/components/hero-section';

const ParticleCanvas = dynamic(
  () => import('@/components/particle-canvas').then((m) => ({ default: m.ParticleCanvas })),
  { ssr: false },
);

const AboutSection = dynamic(() =>
  import('@/components/about-section').then((m) => ({ default: m.AboutSection })),
);

const WorksSection = dynamic(() =>
  import('@/components/works-section').then((m) => ({ default: m.WorksSection })),
);

const LabSection = dynamic(() =>
  import('@/components/lab-section').then((m) => ({ default: m.LabSection })),
);

const ContactSection = dynamic(() =>
  import('@/components/contact-section').then((m) => ({ default: m.ContactSection })),
);

const Footer = dynamic(() =>
  import('@/components/footer').then((m) => ({ default: m.Footer })),
);

export function HomePageClient() {
  return (
    <main className="selection:bg-primary selection:text-primary-foreground">
      <ParticleCanvas />
      <Header />
      <HeroSection />
      <AboutSection />
      <WorksSection />
      <LabSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
