"use client"

import { useEffect, useRef } from "react"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  color: string
}

export function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const particlesRef = useRef<Particle[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createParticle = (): Particle => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 2 + 1,
      color: Math.random() > 0.5 ? "#00f0ff" : "#bd00ff",
    })

    const initParticles = () => {
      const count = Math.min(window.innerWidth / 10, 100)
      particlesRef.current = Array.from({ length: count }, createParticle)
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const particles = particlesRef.current
      const mouse = mouseRef.current

      // Draw connections
      ctx.lineWidth = 1
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - distance / 150)})`
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }

        // Mouse interaction - particles move away from cursor
        const dxMouse = particles[i].x - mouse.x
        const dyMouse = particles[i].y - mouse.y
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse)

        if (distMouse < 150) {
          const force = (150 - distMouse) / 150
          particles[i].vx += (dxMouse / distMouse) * force * 0.2
          particles[i].vy += (dyMouse / distMouse) * force * 0.2
        }

        // Apply friction
        particles[i].vx *= 0.99
        particles[i].vy *= 0.99

        // Update position
        particles[i].x += particles[i].vx
        particles[i].y += particles[i].vy

        // Bounce off walls
        if (particles[i].x < 0 || particles[i].x > canvas.width) particles[i].vx *= -1
        if (particles[i].y < 0 || particles[i].y > canvas.height) particles[i].vy *= -1

        // Draw particle
        ctx.beginPath()
        ctx.arc(particles[i].x, particles[i].y, particles[i].size, 0, Math.PI * 2)
        ctx.fillStyle = particles[i].color
        ctx.globalAlpha = 0.6
        ctx.fill()
        ctx.globalAlpha = 1
      }

      animationId = requestAnimationFrame(animate)
    }

    resize()
    initParticles()
    animate()

    window.addEventListener("resize", resize)
    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 z-0" />
}
