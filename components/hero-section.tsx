"use client"

import React from "react"

import { useEffect, useState } from "react"
import { ParticleCanvas } from "./particle-canvas"

export function HeroSection() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleScrollToWorks = (e: React.MouseEvent) => {
    e.preventDefault()
    document.querySelector("#works")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-[#0f172a]" id="home">
      <ParticleCanvas />

      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0f172a]/90 z-0 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 pt-20 pointer-events-none">
        <div className="max-w-4xl mx-auto text-center pointer-events-auto">
          <h2
            className={`text-[#00f0ff] font-tech tracking-[0.2em] mb-4 text-sm md:text-base transition-all duration-700 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
          >
            WEB DEVELOPMENT & DESIGN
          </h2>

          <h1
            className={`text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight transition-all duration-700 delay-200 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
          >
            <span className="text-white inline-block hover:scale-105 transition-transform duration-300">Engineering</span>
            <br />
            <span className="text-slate-400 text-3xl md:text-5xl italic font-light">meets</span>
            <br />
            <span className="text-shimmer text-glow-blue">Creativity</span>
          </h1>

          <p
            className={`text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 transition-all duration-700 delay-400 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
          >
            技術力とデザインの融合。精密かつエレガントなWeb体験を創造し、
            <br className="hidden md:inline" />
            ビジネスの未来を加速させます。
          </p>

          <div
            className={`transition-all duration-700 delay-600 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
          >
            <a
              href="#works"
              onClick={handleScrollToWorks}
              className="group relative px-8 py-3 bg-transparent overflow-hidden rounded-none border border-slate-600 inline-block magnetic-btn"
            >
              <div className="absolute inset-0 w-0 bg-white transition-all duration-300 ease-out group-hover:w-full opacity-10" />
              <span className="relative text-white font-tech tracking-wider group-hover:text-[#00f0ff] transition-colors">
                VIEW WORKS
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce z-10">
        <span className="text-xs text-slate-500 font-tech tracking-widest mb-2">SCROLL</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-[#00f0ff] to-transparent" />
      </div>
    </section>
  )
}
