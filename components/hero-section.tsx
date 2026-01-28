"use client"

import React from "react"
import { useEffect, useState } from "react"
import { ChevronDown } from "lucide-react"

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
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-background bg-grid" id="home">
      {/* Animated Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className={`absolute top-20 left-1/4 w-96 h-96 bg-primary rounded-full filter blur-[120px] opacity-20 transition-all duration-1000 ${
            mounted ? 'translate-y-0 opacity-20' : 'translate-y-10 opacity-0'
          }`}
        />
        <div 
          className={`absolute bottom-20 right-1/4 w-80 h-80 bg-accent rounded-full filter blur-[100px] opacity-15 transition-all duration-1000 delay-300 ${
            mounted ? 'translate-y-0 opacity-15' : 'translate-y-10 opacity-0'
          }`}
        />
      </div>

      <div className="flex-1 flex items-center justify-center">
        <div className="container mx-auto px-6 relative z-10 pt-14">
          <div className="max-w-3xl mx-auto text-center">
            {/* Badge */}
            <div
              className={`inline-flex items-center gap-2 px-4 py-2 bg-secondary/80 backdrop-blur rounded-full border border-border mb-8 transition-all duration-700 ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
              }`}
            >
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              <span className="text-sm font-medium text-muted-foreground">Web Development & Design</span>
            </div>

            {/* Main Heading */}
            <h1
              className={`text-5xl md:text-7xl font-bold mb-6 leading-tight tracking-tight transition-all duration-700 delay-150 ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
              }`}
            >
              <span className="text-foreground">Engineering</span>
              <br />
              <span className="text-muted-foreground text-3xl md:text-5xl font-light">meets</span>
              <br />
              <span className="text-shimmer">Creativity</span>
            </h1>

            {/* Subtitle */}
            <p
              className={`text-muted-foreground text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed font-light transition-all duration-700 delay-300 ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
              }`}
            >
              技術力とデザインの融合。精密かつエレガントなWeb体験を創造し、ビジネスの未来を加速させます。
            </p>

            {/* CTA Buttons */}
            <div
              className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 delay-450 ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
              }`}
            >
              <a
                href="#works"
                onClick={handleScrollToWorks}
                className="btn-primary px-8 py-3.5 bg-primary text-primary-foreground rounded-lg font-semibold text-base hover:bg-primary/90 active:scale-95 transition-all duration-200 pulse-glow"
              >
                View Works
              </a>
              <a
                href="#about"
                onClick={(e) => {
                  e.preventDefault()
                  document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" })
                }}
                className="px-8 py-3.5 bg-secondary/80 backdrop-blur text-foreground rounded-lg font-semibold text-base hover:bg-secondary active:scale-95 transition-all duration-200 border border-border"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div 
        className={`pb-10 z-20 pointer-events-none flex flex-col items-center transition-all duration-700 delay-700 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
        }`}
      >
        <span className="text-xs text-muted-foreground font-medium mb-2 tracking-wider uppercase">Scroll</span>
        <div className="animate-float">
          <ChevronDown className="w-5 h-5 text-primary" />
        </div>
      </div>
    </section>
  )
}
