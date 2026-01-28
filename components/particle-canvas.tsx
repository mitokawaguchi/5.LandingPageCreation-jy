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

interface Signal {
  from: number;
  to: number;
  progress: number; // 0..1
  speed: number; // px/sec
}

export function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const particlesRef = useRef<Particle[]>([]);
  const signalsRef = useRef<Signal[]>([]);
  const lastTimeRef = useRef<number>(0);

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

    const CONNECTION_DIST = 130;

    const pickNeighborIndex = (from: number) => {
      const particles = particlesRef.current;
      const p = particles[from];
      if (!p) return null;
      const candidates: number[] = [];
      for (let i = 0; i < particles.length; i++) {
        if (i === from) continue;
        const q = particles[i];
        const dx = q.x - p.x;
        const dy = q.y - p.y;
        if (Math.hypot(dx, dy) <= CONNECTION_DIST) candidates.push(i);
      }
      if (candidates.length === 0) return null;
      return candidates[Math.floor(Math.random() * candidates.length)];
    };

    // Initialize "electrical signals" that travel node-to-node
    const signalCount = 18;
    signalsRef.current = Array.from({ length: signalCount }, () => {
      const from = Math.floor(Math.random() * particleCount);
      const to = pickNeighborIndex(from) ?? ((from + 1) % particleCount);
      return {
        from,
        to,
        progress: Math.random(),
        speed: 140 + Math.random() * 90,
      };
    });

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", handleMouseMove);

    let animationId: number;

    const animate = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const now = performance.now();
      const t = now / 1000;
      const dt = Math.min(0.05, Math.max(0, (now - (lastTimeRef.current || now)) / 1000));
      lastTimeRef.current = now;

      // Trail / fade (faster decay to avoid dirty trails)
      ctx.fillStyle = "rgba(10, 17, 24, 0.32)";
      ctx.fillRect(0, 0, w, h);

      // Subtle scanning line
      const scan = (t * 120) % (w + h);
      ctx.beginPath();
      ctx.moveTo(-h + scan, 0);
      ctx.lineTo(scan, h);
      ctx.strokeStyle = "rgba(91, 163, 184, 0.06)";
      ctx.lineWidth = 2;
      ctx.stroke();

      const particles = particlesRef.current;

      particles.forEach((particle, i) => {
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
        particles.slice(i + 1).forEach((other) => {
          const dx2 = other.x - particle.x;
          const dy2 = other.y - particle.y;
          const dist = Math.sqrt(dx2 * dx2 + dy2 * dy2);

          if (dist < CONNECTION_DIST) {
            const a = 0.16 * (1 - dist / CONNECTION_DIST);
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = `rgba(53, 106, 124, ${a})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        });
      });

      // Update + draw electrical signals (traveling along existing connections)
      for (const s of signalsRef.current) {
        const fromP = particles[s.from];
        if (!fromP) continue;

        // Ensure we always have a valid destination
        if (s.to === s.from || !particles[s.to]) {
          s.to = pickNeighborIndex(s.from) ?? ((s.from + 1) % particles.length);
          s.progress = 0;
        }

        const toP = particles[s.to];
        const dx = toP.x - fromP.x;
        const dy = toP.y - fromP.y;
        const dist = Math.max(1, Math.hypot(dx, dy));

        // If disconnected, re-route
        if (dist > CONNECTION_DIST) {
          s.to = pickNeighborIndex(s.from) ?? s.to;
          s.progress = 0;
          continue;
        }

        // Move at roughly constant pixel speed
        s.progress += (s.speed * dt) / dist;
        if (s.progress >= 1) {
          s.from = s.to;
          s.to = pickNeighborIndex(s.from) ?? ((s.from + 1) % particles.length);
          s.progress = 0;
          continue;
        }

        const ux = dx / dist;
        const uy = dy / dist;
        const px = fromP.x + dx * s.progress;
        const py = fromP.y + dy * s.progress;

        const trail = 28;
        const sx = px - ux * trail;
        const sy = py - uy * trail;

        ctx.save();
        ctx.globalCompositeOperation = "lighter";

        const grad = ctx.createLinearGradient(sx, sy, px, py);
        grad.addColorStop(0, "rgba(240, 244, 248, 0)");
        grad.addColorStop(1, "rgba(240, 244, 248, 0.85)");

        ctx.strokeStyle = grad;
        ctx.lineWidth = 2.2;
        ctx.shadowColor = "rgba(91, 163, 184, 0.9)";
        ctx.shadowBlur = 16;
        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.lineTo(px, py);
        ctx.stroke();

        ctx.fillStyle = "rgba(240, 244, 248, 0.95)";
        ctx.fillRect(px - 1.6, py - 1.6, 3.2, 3.2);
        ctx.restore();
      }

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
