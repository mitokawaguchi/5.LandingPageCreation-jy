"use client";

import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  size: number;
  opacity: number;
}

export function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const coarsePointer =
      typeof window !== "undefined" &&
      window.matchMedia &&
      (window.matchMedia("(pointer: coarse)").matches || window.matchMedia("(hover: none)").matches);

    const NODE_COUNT = coarsePointer ? 26 : 55;
    const CONNECTION_DIST = coarsePointer ? 130 : 160;

    const resizeAndDraw = () => {
      const rawDpr = window.devicePixelRatio || 1;
      const dpr = Math.min(1.5, rawDpr);
      const w = window.innerWidth;
      const h = window.innerHeight;

      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Clear
      ctx.clearRect(0, 0, w, h);

      // Generate nodes deterministically-ish (stable per resize)
      const nodes: Node[] = Array.from({ length: NODE_COUNT }, (_, i) => ({
        x: (w * ((i * 73) % 101)) / 100 + (Math.sin(i * 3.1) * 18),
        y: (h * ((i * 41) % 97)) / 100 + (Math.cos(i * 2.7) * 18),
        size: 2 + ((i * 7) % 3),
        opacity: 0.18 + (((i * 13) % 10) / 50),
      }));

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const dist = Math.hypot(dx, dy);
          if (dist > CONNECTION_DIST) continue;

          const alpha = 0.12 * (1 - dist / CONNECTION_DIST);
          ctx.strokeStyle = `rgba(53, 106, 124, ${alpha})`;
          ctx.lineWidth = 1;

          // Right-angle "circuit" line
          const elbowX = (a.x + b.x) / 2;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(elbowX, a.y);
          ctx.lineTo(elbowX, b.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      // Draw nodes
      for (const n of nodes) {
        ctx.fillStyle = `rgba(91, 163, 184, ${n.opacity})`;
        ctx.fillRect(n.x - n.size / 2, n.y - n.size / 2, n.size, n.size);
      }
    };

    resizeAndDraw();
    window.addEventListener("resize", resizeAndDraw);
    return () => window.removeEventListener("resize", resizeAndDraw);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: "transparent" }}
    />
  );
}
