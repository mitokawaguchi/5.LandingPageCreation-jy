"use client"

import React from "react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { ArrowUpRight } from "lucide-react"

const works = [
  {
    title: "TaskFlow",
    category: "SaaS Landing Page",
    jaCategory: "SaaSランディングページ",
    description: "マイクロインタラクションを重視したタスク管理ツールのLP。スムーズな操作感を視覚的に表現。",
    tags: ["Nuxt.js", "GSAP"],
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop",
    color: "#356A7C",
  },
  {
    title: "LUMIÈRE",
    category: "EC Site",
    jaCategory: "ECサイト",
    description: "オーガニックコスメのブランドサイト。余白を活かした高級感のあるレイアウト。",
    tags: ["Shopify", "Liquid"],
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=400&fit=crop",
    color: "#5ba3b8",
  },
  {
    title: "Sales Insight",
    category: "Dashboard",
    jaCategory: "ダッシュボード",
    description: "業務管理用ダッシュボードUI。Reactを用いたリアルタイムなデータ可視化を実現。",
    tags: ["React", "TypeScript", "Recharts"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    color: "#7ec8e3",
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
  return (
    <article
      className={`bg-card rounded-2xl overflow-hidden group transition-all duration-500 border border-border card-glow ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Image */}
      <div className="aspect-[4/3] overflow-hidden relative">
        <img
          src={work.image || "/placeholder.svg"}
          alt={work.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Hover Arrow */}
        <div className="absolute top-4 right-4 w-10 h-10 bg-primary/90 backdrop-blur rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <ArrowUpRight className="w-5 h-5 text-primary-foreground" />
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
              {work.title}
            </h3>
            <div className="relative inline-block">
              {/* Desktop: show Japanese label on hover */}
              <span className="hidden md:block absolute -top-3 left-1/2 -translate-x-1/2 px-2 py-1 rounded-md bg-background/90 backdrop-blur border border-border text-xs text-muted-foreground opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 whitespace-nowrap">
                {work.jaCategory}
              </span>
              <div className="flex flex-col">
                <span 
                  className="text-xs font-medium px-2 py-0.5 rounded-full"
                  style={{ 
                    background: `${work.color}20`,
                    color: work.color 
                  }}
                >
                  {work.category}
                </span>
                {/* Mobile: always show Japanese label */}
                <span className="md:hidden text-xs text-muted-foreground mt-1">
                  {work.jaCategory}
                </span>
              </div>
            </div>
          </div>
        </div>

        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {work.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {work.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2.5 py-1 bg-secondary text-muted-foreground rounded-md font-medium border border-border"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  )
}

export function WorksSection() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.1 })

  return (
    <section ref={ref} id="works" className="py-24 md:py-32 bg-background bg-grid">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span
            className={`text-primary text-sm font-semibold tracking-wide uppercase transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
          >
            Portfolio
          </span>
          <h2
            className={`text-3xl md:text-4xl font-bold text-foreground mt-2 tracking-tight transition-all duration-700 delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
          >
            Selected Works
          </h2>
          <p
            className={`mt-4 text-muted-foreground transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            }`}
          >
            実績紹介（架空案件）
          </p>
        </div>

        {/* Works Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {works.map((work, i) => (
            <WorkCard key={work.title} work={work} index={i} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  )
}
