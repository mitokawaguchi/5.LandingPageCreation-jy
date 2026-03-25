'use client';

import { useEffect, useRef } from 'react';

interface Node {
  x: number;
  y: number;
  size: number;
  opacity: number;
}

function getConnectionSaveData(): boolean {
  if (typeof navigator === 'undefined') {
    return false;
  }
  const c = navigator.connection;
  return Boolean(c && 'saveData' in c && c.saveData);
}

export function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion || getConnectionSaveData()) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) {
      return;
    }

    const coarsePointer =
      window.matchMedia('(pointer: coarse)').matches || window.matchMedia('(hover: none)').matches;

    const NODE_COUNT = coarsePointer ? 12 : 42;
    const CONNECTION_DIST = coarsePointer ? 95 : 155;

    const resizeAndDraw = () => {
      const rawDpr = window.devicePixelRatio || 1;
      const dpr = Math.min(coarsePointer ? 1.25 : 1.5, rawDpr);
      const w = window.innerWidth;
      const h = window.innerHeight;

      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      ctx.clearRect(0, 0, w, h);

      const nodes: Node[] = Array.from({ length: NODE_COUNT }, (_, i) => ({
        x: (w * ((i * 73) % 101)) / 100 + Math.sin(i * 3.1) * 18,
        y: (h * ((i * 41) % 97)) / 100 + Math.cos(i * 2.7) * 18,
        size: 2 + ((i * 7) % 3),
        opacity: 0.18 + (((i * 13) % 10) / 50),
      }));

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const dist = Math.hypot(dx, dy);
          if (dist > CONNECTION_DIST) {
            continue;
          }

          const alpha = 0.12 * (1 - dist / CONNECTION_DIST);
          ctx.strokeStyle = `rgba(53, 106, 124, ${alpha})`;
          ctx.lineWidth = 1;

          const elbowX = (a.x + b.x) / 2;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(elbowX, a.y);
          ctx.lineTo(elbowX, b.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      for (const n of nodes) {
        ctx.fillStyle = `rgba(91, 163, 184, ${n.opacity})`;
        ctx.fillRect(n.x - n.size / 2, n.y - n.size / 2, n.size, n.size);
      }
    };

    let idleId: number | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const run = () => {
      resizeAndDraw();
      window.addEventListener('resize', resizeAndDraw);
    };

    if ('requestIdleCallback' in window) {
      idleId = window.requestIdleCallback(() => run(), { timeout: 2200 });
    } else {
      timeoutId = setTimeout(run, 280);
    }

    return () => {
      if (idleId !== undefined && 'cancelIdleCallback' in window) {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId !== undefined) {
        clearTimeout(timeoutId);
      }
      window.removeEventListener('resize', resizeAndDraw);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      style={{ background: 'transparent' }}
    />
  );
}
