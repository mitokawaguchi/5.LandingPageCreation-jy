"use client"

import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { Github, Zap, Shield } from "lucide-react"
import { useEffect, useState } from "react"

function AnimatedCounter({ target, isVisible }: { target: string; isVisible: boolean }) {
  const [count, setCount] = useState(0)
  const isNumber = !Number.isNaN(Number(target))

  useEffect(() => {
    if (!isVisible || !isNumber) return

    const targetNum = Number(target)
    const duration = 1500
    const steps = 40
    const stepDuration = duration / steps
    const increment = targetNum / steps

    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= targetNum) {
        setCount(targetNum)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, stepDuration)

    return () => clearInterval(timer)
  }, [isVisible, target, isNumber])

  if (!isNumber) {
    return (
      <span
        className={`text-2xl font-bold text-primary transition-all duration-500 ${
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75"
        }`}
      >
        {target}
      </span>
    )
  }

  return (
    <span
      className={`text-2xl font-bold text-primary transition-all duration-500 ${
        isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75"
      }`}
    >
      {count}
    </span>
  )
}

export function LabSection() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.2 })

  return (
    <section ref={ref} id="lab" className="py-24 md:py-32 bg-card">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="mb-12">
          <span
            className={`text-accent text-sm font-semibold tracking-wide uppercase transition-all duration-700 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-5"
            }`}
          >
            Lab
          </span>
          <h2
            className={`text-3xl md:text-4xl font-bold text-foreground mt-2 tracking-tight transition-all duration-700 delay-100 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-5"
            }`}
          >
            Experimental & Open Source
          </h2>
        </div>

        {/* Featured Project Card */}
        <div
          className={`bg-secondary rounded-2xl p-6 md:p-8 border border-border card-glow transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-accent/20 rounded-2xl flex items-center justify-center">
                  <Github className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground">
                    Tech Blog Template
                  </h3>
                  <p className="text-sm text-muted-foreground">Next.js + Tailwind CSS</p>
                </div>
              </div>
              
              <p className="text-muted-foreground mb-6 leading-relaxed">
                開発者向けの高速ブログテンプレート。SEO最適化済み、ダークモード対応。
                パフォーマンスとアクセシビリティに優れたモダンな設計。
              </p>

              {/* Stats */}
              <div className="flex items-center gap-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center">
                    <Zap className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <AnimatedCounter target="100" isVisible={isVisible} />
                    <p className="text-xs text-muted-foreground">Lighthouse</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-accent/20 rounded-xl flex items-center justify-center">
                    <Shield className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <AnimatedCounter target="A+" isVisible={isVisible} />
                    <p className="text-xs text-muted-foreground">Accessibility</p>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <a
              href="https://github.com/mitokawaguchi/5.LandingPageCreation-jy"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 active:scale-95 transition-all duration-200"
            >
              <Github className="w-5 h-5" />
              View on GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
