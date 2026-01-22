"use client"

import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { Github } from "lucide-react"
import { useEffect, useState } from "react"

function AnimatedCounter({ target, isVisible }: { target: string; isVisible: boolean }) {
  const [count, setCount] = useState(0)
  const isNumber = !Number.isNaN(Number(target))

  useEffect(() => {
    if (!isVisible || !isNumber) return

    const targetNum = Number(target)
    const duration = 2000
    const steps = 60
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
        className={`text-3xl font-bold text-[#00f0ff] font-tech transition-all duration-700 ${
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-50"
        }`}
      >
        {target}
      </span>
    )
  }

  return (
    <span
      className={`text-3xl font-bold text-[#00f0ff] font-tech transition-all duration-700 ${
        isVisible ? "opacity-100 scale-100" : "opacity-0 scale-50"
      }`}
    >
      {count}
    </span>
  )
}

export function LabSection() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.2 })

  return (
    <section ref={ref} id="lab" className="py-20 relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] to-slate-900" />
      <div
        className={`absolute top-0 right-0 w-1/3 h-full bg-slate-800 opacity-20 skew-x-12 transform transition-transform duration-1000 ${
          isVisible ? "translate-x-20" : "translate-x-full"
        }`}
      />

      <div className="container mx-auto px-6 relative z-10">
        <h2
          className={`text-3xl font-bold mb-10 flex items-center transition-all duration-700 ${
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
          }`}
        >
          <span className="text-[#bd00ff] font-tech mr-4 text-4xl text-glow-purple">LAB</span>
          <span className="text-sm text-slate-400 font-normal tracking-wider uppercase">
            Experimental & Open Source
          </span>
        </h2>

        <div
          className={`bg-slate-800/50 backdrop-blur border border-slate-600 rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 clip-tech transition-all duration-700 delay-200 hover:border-slate-500 group ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[#00f0ff] transition-colors">
              Tech Blog Template
            </h3>
            <p className="text-slate-400 mb-6 group-hover:text-slate-300 transition-colors">
              Next.js + Tailwind CSSで構築された、開発者向けの高速ブログテンプレート。
              SEO最適化済み、ダークモード対応。
            </p>
            <div className="flex items-center gap-6">
              <div className="flex flex-col items-center">
                <AnimatedCounter target="100" isVisible={isVisible} />
                <span className="text-[10px] text-slate-500 uppercase tracking-widest">Lighthouse</span>
              </div>
              <div
                className={`w-px h-10 bg-slate-600 transition-all duration-700 delay-500 ${
                  isVisible ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0"
                }`}
              />
              <div className="flex flex-col items-center">
                <AnimatedCounter target="A+" isVisible={isVisible} />
                <span className="text-[10px] text-slate-500 uppercase tracking-widest">Accessibility</span>
              </div>
            </div>
          </div>
          <div>
            <a
              href="#"
              className="flex items-center gap-3 px-6 py-4 bg-slate-900 border border-slate-600 hover:border-white text-white rounded transition-all group/btn hover:scale-105 hover:shadow-lg hover:shadow-[#00f0ff]/10"
            >
              <Github className="w-6 h-6 group-hover/btn:rotate-12 transition-transform" />
              <span className="font-tech tracking-wide group-hover/btn:underline">View on GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
