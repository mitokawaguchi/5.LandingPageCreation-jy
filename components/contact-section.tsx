"use client"

import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { Github, Twitter } from "lucide-react"
import { useState } from "react"

export function ContactSection() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.2 })
  const [isButtonHovered, setIsButtonHovered] = useState(false)

  return (
    <section ref={ref} id="contact" className="py-24 text-center bg-[#0f172a] border-t border-slate-800">
      <div className="container mx-auto px-6">
        <h2
          className={`text-4xl md:text-5xl font-bold text-white mb-8 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          Ready to{" "}
          <span className="text-[#00f0ff] inline-block hover:scale-110 transition-transform cursor-default">
            create?
          </span>
        </h2>

        <p
          className={`text-slate-400 text-lg mb-12 max-w-xl mx-auto transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          新規プロジェクトのご相談、技術的なパートナーシップなど、お気軽にお問い合わせください。
        </p>

        <a
          href="mailto:contact@mittechstudio.com"
          className={`inline-block px-10 py-4 bg-[#00f0ff] text-[#0f172a] font-bold text-lg rounded-full hover:bg-white transition-all duration-300 shadow-lg relative overflow-hidden group ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
          style={{ transitionDelay: "400ms" }}
          onMouseEnter={() => setIsButtonHovered(true)}
          onMouseLeave={() => setIsButtonHovered(false)}
        >
          <span className="relative z-10 group-hover:scale-105 inline-block transition-transform">
            Contact Us
          </span>
          <div
            className={`absolute inset-0 bg-white transition-transform duration-500 ${
              isButtonHovered ? "scale-100" : "scale-0"
            }`}
            style={{ borderRadius: "inherit", transformOrigin: "center" }}
          />
          {/* Pulse ring effect */}
          <span
            className={`absolute inset-0 rounded-full transition-all duration-1000 ${
              isVisible ? "animate-ping opacity-20" : "opacity-0"
            }`}
            style={{ background: "#00f0ff" }}
          />
        </a>

        <div
          className={`mt-12 flex justify-center space-x-8 transition-all duration-700 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <a
            href="#"
            className="text-slate-500 hover:text-white transition-all duration-300 hover:scale-125 hover:-translate-y-1"
          >
            <span className="sr-only">Twitter</span>
            <Twitter className="h-6 w-6" />
          </a>
          <a
            href="#"
            className="text-slate-500 hover:text-white transition-all duration-300 hover:scale-125 hover:-translate-y-1"
          >
            <span className="sr-only">GitHub</span>
            <Github className="h-6 w-6" />
          </a>
        </div>
      </div>
    </section>
  )
}
