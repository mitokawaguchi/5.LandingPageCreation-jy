'use client';

import { useEffect, useRef } from 'react';

const T = { accent: '#b5fb6b' };

export function Crosshair() {
  const vRef = useRef<HTMLDivElement>(null);
  const hRef = useRef<HTMLDivElement>(null);
  const coordRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 820px)');
    if (mq.matches || 'ontouchstart' in window) return;

    let raf = 0;
    let lastX = 0, lastY = 0;
    const onMove = (e: PointerEvent) => {
      lastX = e.clientX; lastY = e.clientY;
      if (!raf) raf = requestAnimationFrame(() => {
        raf = 0;
        const v = vRef.current, h = hRef.current, c = coordRef.current, d = dotRef.current;
        if (v) v.style.transform = `translate3d(${lastX}px,0,0)`;
        if (h) h.style.transform = `translate3d(0,${lastY}px,0)`;
        if (d) d.style.transform = `translate3d(${lastX - 4}px,${lastY - 4}px,0)`;
        if (c) {
          c.style.transform = `translate3d(${lastX + 14}px,${lastY + 14}px,0)`;
          c.textContent = `x:${String(lastX).padStart(4, '0')} y:${String(lastY).padStart(4, '0')}`;
        }
      });
    };
    const onLeave = () => {
      [vRef.current, hRef.current, coordRef.current, dotRef.current].forEach((el) => {
        if (el) el.style.opacity = '0';
      });
    };
    const onEnter = () => {
      if (vRef.current) vRef.current.style.opacity = '0.10';
      if (hRef.current) hRef.current.style.opacity = '0.10';
      if (dotRef.current) dotRef.current.style.opacity = '0.45';
      if (coordRef.current) coordRef.current.style.opacity = '0.35';
    };
    window.addEventListener('pointermove', onMove);
    document.documentElement.addEventListener('pointerleave', onLeave);
    document.documentElement.addEventListener('pointerenter', onEnter);
    return () => {
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('pointerleave', onLeave);
      document.documentElement.removeEventListener('pointerenter', onEnter);
      cancelAnimationFrame(raf);
    };
  }, []);

  const lineStyle: React.CSSProperties = {
    position: 'fixed', background: T.accent, pointerEvents: 'none',
    zIndex: 99, opacity: 0, transition: 'opacity .25s', mixBlendMode: 'screen',
  };

  return (
    <>
      <div ref={vRef} style={{ ...lineStyle, top: 0, bottom: 0, width: 1, left: 0, transform: 'translate3d(-100px,0,0)' }} />
      <div ref={hRef} style={{ ...lineStyle, left: 0, right: 0, height: 1, top: 0, transform: 'translate3d(0,-100px,0)' }} />
      <div ref={dotRef} style={{
        position: 'fixed', top: 0, left: 0, width: 7, height: 7,
        border: `1px solid ${T.accent}`, background: 'transparent',
        pointerEvents: 'none', zIndex: 100, opacity: 0, transition: 'opacity .25s',
        mixBlendMode: 'screen',
      }} />
      <div ref={coordRef} style={{
        position: 'fixed', top: 0, left: 0, zIndex: 100, opacity: 0,
        pointerEvents: 'none', fontFamily: 'var(--font-mono)',
        fontSize: 9.5, color: T.accent, letterSpacing: 0.6, fontWeight: 500,
        transition: 'opacity .25s', mixBlendMode: 'screen',
      }}>x:0000 y:0000</div>
    </>
  );
}
