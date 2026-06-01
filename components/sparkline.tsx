'use client';

import React, { useEffect, useRef, useState } from 'react';

interface SparklineProps {
  values: number[];
  color?: string;
  fill?: string;
  width?: number;
  height?: number;
  stroke?: number;
}

export function Sparkline({
  values,
  color = '#b5fb6b',
  fill,
  width = 120,
  height = 32,
  stroke = 1.5,
}: SparklineProps) {
  const ref = useRef<SVGSVGElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (!values.length) return null;

  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const padding = stroke;

  const points = values.map((v, i) => {
    const x = (i / (values.length - 1)) * (width - padding * 2) + padding;
    const y = height - padding - ((v - min) / range) * (height - padding * 2);
    return { x, y };
  });

  const pathD = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x.toFixed(2)} ${p.y.toFixed(2)}`)
    .join(' ');

  // Approximate path length for stroke-dasharray animation
  let pathLength = 0;
  for (let i = 1; i < points.length; i++) {
    const dx = points[i].x - points[i - 1].x;
    const dy = points[i].y - points[i - 1].y;
    pathLength += Math.sqrt(dx * dx + dy * dy);
  }

  const fillD = fill
    ? `${pathD} L ${points[points.length - 1].x.toFixed(2)} ${height} L ${points[0].x.toFixed(2)} ${height} Z`
    : undefined;

  return (
    <svg
      ref={ref}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      style={{ overflow: 'visible', display: 'block', width: '100%', height: 'auto', maxWidth: width }}
    >
      {fill && fillD && (
        <path
          d={fillD}
          fill={fill}
          style={{
            opacity: revealed ? 0.15 : 0,
            transition: 'opacity 0.8s ease 0.4s',
          }}
        />
      )}
      <path
        d={pathD}
        fill="none"
        stroke={color}
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          strokeDasharray: pathLength,
          strokeDashoffset: revealed ? 0 : pathLength,
          transition: `stroke-dashoffset 1.4s cubic-bezier(.4,0,.2,1)`,
        }}
      />
    </svg>
  );
}
