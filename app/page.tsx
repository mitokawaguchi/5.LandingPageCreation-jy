import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { WorksSection } from "@/components/works-section"
import { LabSection } from "@/components/lab-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { ParticleCanvas } from "@/components/particle-canvas"

export default function Home() {
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
  )
}
