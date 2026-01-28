"use client"

import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { Palette, Code2, Smartphone, HeadphonesIcon } from "lucide-react"

const skills = [
  { label: "UI/UX Design", stack: ["Figma", "Design System", "Prototyping"], icon: Palette, color: "#5ba3b8" },
  { label: "Front-end Dev", stack: ["HTML", "CSS", "JavaScript", "TypeScript", "React"], icon: Code2, color: "#356A7C" },
  { label: "Web Applications", stack: ["Next.js", "API", "Auth", "DB"], icon: Smartphone, color: "#7ec8e3" },
  { label: "Technical Support", stack: ["Git", "CI/CD", "Performance", "Accessibility"], icon: HeadphonesIcon, color: "#4a8a9c" },
]

export function AboutSection() {
  const { ref: sectionRef, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.2 })

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-24 md:py-32 relative bg-card"
    >
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Image Card */}
          <div className={`lg:w-1/2 transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="relative">
              <div className="rounded-2xl overflow-hidden border border-border card-glow">
                <img
                  src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop"
                  alt="Studio Space"
                  className="w-full h-auto object-cover"
                />
              </div>

              {/* Floating Badge */}
              <div 
                className={`absolute -bottom-4 -right-4 bg-secondary rounded-2xl p-4 border border-border transition-all duration-700 delay-300 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center">
                    <span className="text-lg">✨</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Since 2020</p>
                    <p className="text-xs text-muted-foreground">Building the web</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="lg:w-1/2">
            <div
              className={`transition-all duration-700 delay-100 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
              }`}
            >
              <span className="text-primary text-sm font-semibold tracking-wide uppercase">About Us</span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2 mb-4 tracking-tight">
                デザインとエンジニアリングの境界をなくす。
              </h2>
            </div>

            <p
              className={`text-muted-foreground text-lg leading-relaxed mb-8 transition-all duration-700 delay-200 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
              }`}
            >
              Mit Tech Studioは、単に綺麗なサイトを作るだけではありません。
              ビジネスの課題を解決するための「機能美」と、ユーザーの心を動かす「体験」を両立させます。
            </p>

            {/* Skills Grid */}
            <div className={`grid grid-cols-2 gap-3 stagger-children ${isVisible ? 'visible' : ''}`}>
              {skills.map((skill) => (
                <div
                  key={skill.label}
                  className="bg-secondary p-4 rounded-xl group cursor-default border border-border card-glow relative"
                >
                  {/* Desktop: show stack on hover */}
                  <div className="hidden md:flex absolute inset-0 rounded-xl bg-background/90 backdrop-blur border border-border opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none p-3 items-center justify-center">
                    <div className="flex flex-wrap gap-1.5 justify-center max-w-[95%]">
                      {skill.stack.map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] px-2 py-0.5 bg-secondary/80 text-foreground rounded-md font-medium border border-border"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                      style={{ background: `${skill.color}20` }}
                    >
                      <skill.icon className="w-5 h-5" style={{ color: skill.color }} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors leading-snug">
                        {skill.label}
                      </span>
                      {/* Mobile: always show stack */}
                      <div className="md:hidden mt-1 flex flex-wrap gap-1.5">
                        {skill.stack.map((tag) => (
                          <span
                            key={tag}
                            className="text-[11px] px-2 py-0.5 bg-secondary text-muted-foreground rounded-md font-medium border border-border"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
