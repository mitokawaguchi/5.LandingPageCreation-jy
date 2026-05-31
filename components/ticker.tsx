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

export function Ticker({ items, speed = 40 }: TickerProps) {
  // Calculate total width estimate for animation duration
  // Each item is roughly 200px wide; animation duration = totalWidth / speed
  const itemWidth = 200;
  const totalWidth = items.length * itemWidth;
  const animDuration = totalWidth / speed;

  const renderItems = (key: string) => (
    <div
      key={key}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '2rem',
        paddingRight: '2rem',
        flexShrink: 0,
      }}
    >
      {items.map((item, i) => (
        <div
          key={`${key}-${i}`}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.8125rem',
            whiteSpace: 'nowrap',
          }}
        >
          <span style={{ color: '#8a93a0' }}>{item.k}</span>
          <span style={{ color: item.c, fontWeight: 600 }}>{item.v}</span>
          {item.tag && (
            <span
              style={{
                fontSize: '0.625rem',
                padding: '1px 6px',
                borderRadius: '4px',
                background: '#13171e',
                border: '1px solid #1a1f28',
                color: '#8a93a0',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
              }}
            >
              {item.tag}
            </span>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div
      style={{
        overflow: 'hidden',
        width: '100%',
        position: 'relative',
      }}
    >
      {/* Fade masks */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          width: '60px',
          background: 'linear-gradient(to right, #06070a, transparent)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          width: '60px',
          background: 'linear-gradient(to left, #06070a, transparent)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          display: 'flex',
          width: 'max-content',
          animation: `ticker-scroll ${animDuration}s linear infinite`,
        }}
      >
        {renderItems('a')}
        {renderItems('b')}
      </div>

      <style>{`
        @keyframes ticker-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
