"use client"

import { useScrollReveal } from "@/hooks/use-scroll-reveal"

const skills = [
  { label: "UI/UX Design" },
  { label: "Front-end Dev" },
  { label: "Web Applications" },
  { label: "Technical Support" },
]

export function AboutSection() {
  const { ref: sectionRef, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.2 })
  const { ref: imageRef, isVisible: imageVisible } = useScrollReveal<HTMLDivElement>({ threshold: 0.3 })

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-24 md:py-32 relative bg-[#0f172a] border-t border-slate-800"
    >
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <div ref={imageRef} className="md:w-1/2 relative">
            <div
              className={`relative z-10 rounded overflow-hidden shadow-2xl border border-slate-700 transition-all duration-1000 ${
                imageVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
              }`}
            >
              <img
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop"
                alt="Studio Space"
                className="w-full h-auto object-cover opacity-80 hover:scale-105 transition-transform duration-700"
              />
            </div>
            {/* Decorative Frame */}
            <div
              className={`absolute -bottom-6 -right-6 w-full h-full border-2 border-[#00f0ff]/30 -z-0 transition-all duration-1000 delay-300 ${
                imageVisible ? "opacity-100 translate-x-0 translate-y-0" : "opacity-0 translate-x-5 translate-y-5"
              }`}
            />
          </div>

          <div className="md:w-1/2">
            <h2
              className={`text-3xl md:text-4xl font-bold mb-6 flex items-center transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
              }`}
            >
              <span
                className={`h-[2px] bg-[#00f0ff] mr-4 transition-all duration-700 delay-200 ${
                  isVisible ? "w-12" : "w-0"
                }`}
              />
              <span className="text-white">About Us</span>
            </h2>

            <h3
              className={`text-xl md:text-2xl font-light text-slate-200 mb-6 leading-relaxed transition-all duration-700 delay-200 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
              }`}
            >
              デザインとエンジニアリングの境界をなくす。
            </h3>

            <p
              className={`text-slate-400 mb-6 leading-loose transition-all duration-700 delay-300 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
              }`}
            >
              Mit Tech Studioは、単に綺麗なサイトを作るだけではありません。
              ビジネスの課題を解決するための「機能美」と、ユーザーの心を動かす「体験」を両立させます。
              スタートアップの立ち上げから、企業のDX推進まで、確かな技術力でサポートします。
            </p>

            <ul className="grid grid-cols-2 gap-4 text-sm text-slate-300 font-tech">
              {skills.map((skill, i) => (
                <li
                  key={skill.label}
                  className={`flex items-center transition-all duration-500 group cursor-default ${
                    isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-5"
                  }`}
                  style={{ transitionDelay: `${400 + i * 100}ms` }}
                >
                  <span className="text-[#00f0ff] mr-2 group-hover:translate-x-1 transition-transform">/</span>
                  <span className="group-hover:text-[#00f0ff] transition-colors">{skill.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
