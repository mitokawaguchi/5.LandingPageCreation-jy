"use client"

import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { Github, Instagram, Mail } from "lucide-react"

function ThreadsIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M7.25 3.5h4.65c4.6 0 7.35 2.53 7.35 6.95 0 4.35-2.62 7.05-7.05 7.05-1.28 0-2.4-.23-3.36-.7-.1 1.45-.86 2.7-2.28 3.75-.9.67-2.05 1.08-3.46 1.25v-2.2c2.3-.28 3.45-1.55 3.45-3.8V3.5Zm4.65 11.95c2.86 0 4.55-1.8 4.55-4.95 0-3.17-1.78-4.85-4.95-4.85H9.7v9.8c.7.0 1.37-.0 2.2 0Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  )
}

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
              href="https://www.instagram.com/mito_112_/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-muted-foreground hover:bg-primary/20 hover:text-primary border border-border active:scale-95 transition-all duration-200"
            >
              <span className="sr-only">Instagram</span>
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="https://www.threads.net/@mito_112_"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-muted-foreground hover:bg-primary/20 hover:text-primary border border-border active:scale-95 transition-all duration-200"
            >
              <span className="sr-only">Threads</span>
              <ThreadsIcon className="w-5 h-5" />
            </a>
            <a
              href="https://github.com/mitokawaguchi"
              target="_blank"
              rel="noopener noreferrer"
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
