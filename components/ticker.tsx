'use client';

import React from 'react';

interface TickerItem {
  k: string;
  v: string;
  c: string;
  tag?: string;
}

interface TickerProps {
  items: TickerItem[];
  speed?: number;
}

export function Ticker({ items, speed = 32 }: TickerProps) {
  return (
    <div style={{ overflow: 'hidden', position: 'relative' }}>
      <div
        style={{
          display: 'inline-flex',
          gap: 36,
          padding: '10px 0',
          animation: `tickerScroll ${speed}s linear infinite`,
          whiteSpace: 'nowrap',
        }}
      >
        {[...items, ...items].map((it, i) => (
          <span
            key={i}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              color: '#8a93a0',
              letterSpacing: 0.4,
            }}
          >
            <span style={{ color: '#3d4654' }}>▸</span>
            <span>{it.k}</span>
            <span style={{ color: it.c, fontWeight: 600 }}>{it.v}</span>
            {it.tag && (
              <span
                style={{
                  color: '#3d4654',
                  fontSize: 9,
                  padding: '1px 5px',
                  border: '1px solid #1a1f28',
                }}
              >
                {it.tag}
              </span>
            )}
          </span>
        ))}
      </div>

      <style>{`
        @keyframes tickerScroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
