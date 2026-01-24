"use client"

import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { Github, Twitter, Mail } from "lucide-react"

export function ContactSection() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.2 })

  return (
    <section ref={ref} id="contact" className="py-24 md:py-32 bg-background bg-grid">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center">
          {/* Icon */}
          <div
            className={`inline-flex items-center justify-center w-16 h-16 bg-primary/20 rounded-2xl mb-6 transition-all duration-700 ${
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75"
            }`}
          >
            <Mail className="w-8 h-8 text-primary" />
          </div>

          {/* Heading */}
          <h2
            className={`text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight transition-all duration-700 delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            Ready to{" "}
            <span className="text-shimmer">create?</span>
          </h2>

          <p
            className={`text-muted-foreground text-lg mb-10 leading-relaxed transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            新規プロジェクトのご相談、技術的なパートナーシップなど、お気軽にお問い合わせください。
          </p>

          {/* CTA Button */}
          <a
            href="mailto:contact@mittechstudio.com"
            className={`inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold text-lg hover:bg-primary/90 active:scale-95 transition-all duration-300 pulse-glow ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
            style={{ transitionDelay: "300ms" }}
          >
            <Mail className="w-5 h-5" />
            Contact Us
          </a>

          {/* Social Links */}
          <div
            className={`mt-12 flex justify-center gap-4 transition-all duration-700 delay-500 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <a
              href="#"
              className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-muted-foreground hover:bg-primary/20 hover:text-primary border border-border active:scale-95 transition-all duration-200"
            >
              <span className="sr-only">Twitter</span>
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-muted-foreground hover:bg-primary/20 hover:text-primary border border-border active:scale-95 transition-all duration-200"
            >
              <span className="sr-only">GitHub</span>
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
