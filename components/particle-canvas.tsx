"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
}

export function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Initialize particles
    const particleCount = 80;
    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.2,
    }));

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", handleMouseMove);

    let animationId: number;

    const animate = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const t = performance.now() / 1000;

      // Trail / fade (techy "HUD" feel)
      ctx.fillStyle = "rgba(10, 17, 24, 0.14)";
      ctx.fillRect(0, 0, w, h);

      // Subtle scanning line
      const scan = (t * 120) % (w + h);
      ctx.beginPath();
      ctx.moveTo(-h + scan, 0);
      ctx.lineTo(scan, h);
      ctx.strokeStyle = "rgba(91, 163, 184, 0.06)";
      ctx.lineWidth = 2;
      ctx.stroke();

      particlesRef.current.forEach((particle, i) => {
        // Mouse interaction
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 150) {
          const force = (150 - distance) / 150;
          particle.vx -= (dx / distance) * force * 0.02;
          particle.vy -= (dy / distance) * force * 0.02;
        }

        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Boundary check
        if (particle.x < 0 || particle.x > w) particle.vx *= -1;
        if (particle.y < 0 || particle.y > h) particle.vy *= -1;

        // Draw node (square = more "engineering" than stars)
        const nodeSize = particle.size + 1;
        ctx.fillStyle = `rgba(91, 163, 184, ${Math.min(0.55, particle.opacity + 0.1)})`;
        ctx.fillRect(particle.x - nodeSize / 2, particle.y - nodeSize / 2, nodeSize, nodeSize);

        // Draw connections
        particlesRef.current.slice(i + 1).forEach((other) => {
          const dx2 = other.x - particle.x;
          const dy2 = other.y - particle.y;
          const dist = Math.sqrt(dx2 * dx2 + dy2 * dy2);

          if (dist < 120) {
            const a = 0.16 * (1 - dist / 120);
            const elbowFirst = ((i * 31 + (i + 1)) + (Math.round(other.x) ^ Math.round(other.y))) % 2 === 0;
            const ex = elbowFirst ? particle.x : other.x;
            const ey = elbowFirst ? other.y : particle.y;

            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(ex, ey);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(53, 106, 124, ${a})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();

            // "Data packet" moving along the circuit line (limited frequency)
            if ((i + (particlesRef.current.length - 1)) % 12 === 0) {
              const seg1 = Math.abs(ey - particle.y) + Math.abs(ex - particle.x);
              const seg2 = Math.abs(other.x - ex) + Math.abs(other.y - ey);
              const total = Math.max(1, seg1 + seg2);
              const speed = 60;
              const phase = ((t * speed) + i * 7) % total;
              let px = particle.x;
              let py = particle.y;
              if (phase <= seg1) {
                const p = phase / Math.max(1, seg1);
                px = particle.x + (ex - particle.x) * p;
                py = particle.y + (ey - particle.y) * p;
              } else {
                const p = (phase - seg1) / Math.max(1, seg2);
                px = ex + (other.x - ex) * p;
                py = ey + (other.y - ey) * p;
              }
              ctx.fillStyle = "rgba(240, 244, 248, 0.55)";
              ctx.fillRect(px - 1, py - 1, 2, 2);
            }
          }
        });
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: "transparent" }}
    />
  );
}
