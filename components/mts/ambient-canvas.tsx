'use client';

import { useEffect, useRef } from 'react';

/**
 * 軽量アンビエント・キャンバス（ヒーロー背景の粒子コンステレーション）。
 *
 * Apple / Google のティザー映像のような「浮遊する光の粒」を表現しつつ、
 * サイトを重くしないための徹底したガードを持つ:
 *  - prefers-reduced-motion を尊重（静止 1 フレームのみ描画してループしない）
 *  - devicePixelRatio を最大 1.5 に制限
 *  - 粒子数はビューポート面積でスケール（モバイルは自動的に少なく）
 *  - IntersectionObserver でヒーローが画面外なら rAF を停止
 *  - document.hidden（タブ非表示）で停止
 *  - 描画は transform を伴わず compositor 負荷が低い canvas のみ
 *
 * すべて transform/opacity のみで完結し、レイアウトを一切触らない。
 */
type AmbientCanvasProps = {
  /** アクセントカラー（粒子・線）。既定はテーマの lime。 */
  color?: string;
  /** 全体の不透明度。 */
  opacity?: number;
};

export function AmbientCanvas({ color = '181,251,107', opacity = 0.55 }: AmbientCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || typeof window === 'undefined') return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
    const coarse = window.matchMedia?.('(pointer: coarse)').matches ?? false;

    type P = { x: number; y: number; vx: number; vy: number; r: number };
    let particles: P[] = [];
    let w = 0;
    let h = 0;
    let dpr = 1;
    let raf = 0;
    let running = false;
    let visible = true;
    // ポインタは client 座標で保持し、キャンバス相対への変換は 1 フレーム 1 回だけ行う
    const pointer = { cx: -9999, cy: -9999, active: false };

    const LINK = coarse ? 118 : 150; // 線を結ぶ距離
    const LINK2 = LINK * LINK;

    const setup = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      w = Math.max(1, Math.round(rect?.width ?? window.innerWidth));
      h = Math.max(1, Math.round(rect?.height ?? window.innerHeight));
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // 面積ベースで粒子数を決定し、上限で頭打ちにする（モバイルほど少なくなる）
      const target = Math.round((w * h) / 26000);
      const count = Math.max(14, Math.min(coarse ? 30 : 70, target));
      particles = new Array(count).fill(0).map(() => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        r: Math.random() * 1.6 + 0.7,
      }));
    };

    const step = () => {
      ctx.clearRect(0, 0, w, h);

      // ポインタのキャンバス相対座標はフレーム毎に 1 回だけ算出（毎ムーブの getBoundingClientRect を回避）
      let pmx = -99999;
      let pmy = -99999;
      if (pointer.active) {
        const rect = canvas.getBoundingClientRect();
        pmx = pointer.cx - rect.left;
        pmy = pointer.cy - rect.top;
      }

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        // 画面端でラップ（跳ね返りより滑らか）
        if (p.x < -20) p.x = w + 20;
        else if (p.x > w + 20) p.x = -20;
        if (p.y < -20) p.y = h + 20;
        else if (p.y > h + 20) p.y = -20;

        // ポインタからの緩やかな斥力（fine ポインタのみ）
        if (pointer.active) {
          const dx = p.x - pmx;
          const dy = p.y - pmy;
          const d2 = dx * dx + dy * dy;
          if (d2 < 15000 && d2 > 0.1) {
            const f = (1 - d2 / 15000) * 0.6;
            const d = Math.sqrt(d2);
            p.x += (dx / d) * f;
            p.y += (dy / d) * f;
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color},${0.5})`;
        ctx.fill();
      }

      // 近接する粒子どうしを線で結ぶ（n が小さいので O(n^2) でも軽い）
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < LINK2) {
            const alpha = (1 - d2 / LINK2) * 0.32;
            ctx.strokeStyle = `rgba(${color},${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
    };

    const loop = () => {
      if (!running) return;
      step();
      raf = requestAnimationFrame(loop);
    };

    const start = () => {
      if (running || reduced || !visible || document.hidden) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    };

    setup();
    step(); // 最初のフレームを即描画（reduced-motion でもここで静止画を出す）

    if (reduced) {
      // ループしない。リサイズだけ追随。
      const onResize = () => {
        setup();
        step();
      };
      window.addEventListener('resize', onResize);
      return () => window.removeEventListener('resize', onResize);
    }

    // ヒーローが画面内にあるときだけ動かす（IO 非対応環境では常時稼働にフォールバック）
    let io: IntersectionObserver | null = null;
    if ('IntersectionObserver' in window) {
      io = new IntersectionObserver(
        (entries) => {
          visible = entries[0]?.isIntersecting ?? true;
          if (visible) start();
          else stop();
        },
        { threshold: 0 },
      );
      io.observe(canvas);
    }

    const onVisibility = () => {
      if (document.hidden) stop();
      else start();
    };
    let resizeRaf = 0;
    const onResize = () => {
      if (resizeRaf) cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(() => {
        setup();
        if (!running) step();
      });
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      pointer.cx = e.clientX;
      pointer.cy = e.clientY;
      pointer.active = true;
    };
    const onLeave = () => {
      pointer.active = false;
      pointer.cx = -99999;
      pointer.cy = -99999;
    };

    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('resize', onResize, { passive: true });
    if (!coarse) {
      window.addEventListener('pointermove', onMove, { passive: true });
      window.addEventListener('pointerout', onLeave, { passive: true });
    }
    start();

    return () => {
      stop();
      io?.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerout', onLeave);
      if (resizeRaf) cancelAnimationFrame(resizeRaf);
    };
  }, [color]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
        opacity,
        mixBlendMode: 'screen',
      }}
    />
  );
}
