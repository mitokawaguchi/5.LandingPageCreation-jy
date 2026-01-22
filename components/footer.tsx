"use client"

import { useScrollReveal } from "@/hooks/use-scroll-reveal"

export function Footer() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.5 })

  return (
    <footer
      ref={ref}
      className="bg-slate-950 py-8 border-t border-slate-900 text-center text-slate-500 text-sm"
    >
      <div className="container mx-auto px-6">
        <p
          className={`transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          &copy; {new Date().getFullYear()} Mit Tech Studio. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
