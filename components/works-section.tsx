"use client"

import React from "react"

import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { useRef, useState } from "react"

const works = [
  {
    title: "TaskFlow",
    category: "SaaS LP",
    description: "マイクロインタラクションを重視したタスク管理ツールのLP。スムーズな操作感を視覚的に表現。",
    tags: ["#Nuxt.js", "#GSAP"],
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop",
    color: "#2563eb",
    hoverColor: "#00f0ff",
  },
  {
    title: "LUMIÈRE",
    category: "EC Site",
    description: "オーガニックコスメのブランドサイト。余白を活かした高級感のあるレイアウト。",
    tags: ["#Shopify", "#Liquid"],
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=400&fit=crop",
    color: "#db2777",
    hoverColor: "#bd00ff",
  },
  {
    title: "Sales Insight",
    category: "Dashboard",
    description: "業務管理用ダッシュボードUI。Reactを用いたリアルタイムなデータ可視化を実現。",
    tags: ["#React", "#TypeScript", "#Recharts"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    color: "#4f46e5",
    hoverColor: "#00f0ff",
  },
]

function WorkCard({
  work,
  index,
  isVisible,
}: {
  work: (typeof works)[0]
  index: number
  isVisible: boolean
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) / 20
    const y = (e.clientY - rect.top - rect.height / 2) / 20
    setMousePosition({ x, y })
  }

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 })
    setIsHovered(false)
  }

  return (
    <article
      ref={cardRef}
      className={`group relative bg-[#1e293b] rounded-xl overflow-hidden shadow-lg border border-slate-700 transition-all duration-500 cursor-pointer ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{
        transitionDelay: `${index * 150}ms`,
        transform: isHovered
          ? `perspective(1000px) rotateX(${-mousePosition.y}deg) rotateY(${mousePosition.x}deg) translateY(-8px)`
          : "perspective(1000px) rotateX(0) rotateY(0) translateY(0)",
        borderColor: isHovered ? work.hoverColor : undefined,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <div className="aspect-video overflow-hidden relative">
        <img
          src={work.image || "/placeholder.svg"}
          alt={work.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#1e293b] to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-500"
        />
      </div>

      <div className="p-6 relative">
        <div className="flex justify-between items-start mb-3">
          <h3
            className="text-xl font-bold text-white transition-colors duration-300"
            style={{ color: isHovered ? work.hoverColor : undefined }}
          >
            {work.title}
          </h3>
          <span className="text-xs font-tech px-2 py-1 bg-slate-700 rounded text-slate-300 group-hover:bg-slate-600 transition-colors">
            {work.category}
          </span>
        </div>

        <p className="text-slate-400 text-sm mb-4 group-hover:text-slate-300 transition-colors">
          {work.description}
        </p>

        <div className="flex flex-wrap gap-2 text-xs text-slate-500 font-mono">
          {work.tags.map((tag) => (
            <span
              key={tag}
              className="transition-colors duration-300 group-hover:text-slate-400"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Animated border glow */}
        <div
          className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r transition-all duration-500"
          style={{
            width: isHovered ? "100%" : "0%",
            background: `linear-gradient(to right, transparent, ${work.hoverColor}, transparent)`,
          }}
        />
      </div>
    </article>
  )
}

export function WorksSection() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.1 })

  return (
    <section ref={ref} id="works" className="py-24 md:py-32 bg-slate-900 relative">
      <div className="container mx-auto px-6">
        <div className="mb-16 text-center">
          <h2
            className={`text-3xl md:text-4xl font-bold inline-block relative pb-2 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
          >
            <span className="text-white">Selected Works</span>
            <span
              className={`absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-[#bd00ff] to-transparent transition-all duration-1000 delay-300 ${
                isVisible ? "w-full" : "w-0"
              }`}
            />
          </h2>
          <p
            className={`mt-4 text-slate-400 transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
          >
            実績紹介（架空案件）
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {works.map((work, i) => (
            <WorkCard key={work.title} work={work} index={i} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  )
}
