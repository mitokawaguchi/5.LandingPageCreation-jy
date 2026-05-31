'use client';

import React, { useEffect, useState } from 'react';

function formatTime(date: Date, tz: string): string {
  return date.toLocaleTimeString('en-GB', {
    timeZone: tz,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
}

export function StatusBar() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const jst = now ? formatTime(now, 'Asia/Tokyo') : '--:--:--';
  const utc = now ? formatTime(now, 'UTC') : '--:--:--';

  const barStyle: React.CSSProperties = {
    position: 'sticky',
    top: 0,
    zIndex: 110,
    height: 36,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 56px',
    background: 'rgba(6,7,10,.85)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    borderBottom: '1px solid #1a1f28',
    fontFamily: 'var(--font-mono)',
    fontSize: 11,
    color: '#8a93a0',
  };

  const dotStyle: React.CSSProperties = {
    width: 6,
    height: 6,
    borderRadius: '50%',
    background: '#69e6a6',
    boxShadow: '0 0 4px #69e6a6',
    animation: 'statusPulse 2s infinite',
  };

  return (
    <>
      <style>{`
        @keyframes statusPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
      <div style={barStyle}>
        {/* Left: deploy status */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={dotStyle} />
          <span>deployed</span>
          <span style={{ color: '#3d4654' }}>·</span>
          <span>vercel</span>
          <span style={{ color: '#3d4654' }}>·</span>
          <span>4m</span>
        </div>

        {/* Right: clocks + palette + status */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span>
            JST <span style={{ color: '#e9edf2' }}>{jst}</span>
          </span>
          <span style={{ color: '#3d4654' }}>|</span>
          <span>
            UTC <span style={{ color: '#e9edf2' }}>{utc}</span>
          </span>
          <span style={{ color: '#3d4654' }}>|</span>
          <button
            type="button"
            style={{
              background: 'none',
              border: '1px solid #252b35',
              borderRadius: 4,
              padding: '2px 8px',
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              color: '#8a93a0',
              cursor: 'pointer',
              transition: 'border-color .2s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#b5fb6b'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#252b35'; }}
          >
            ⌘ K palette
          </button>
          <span style={{ color: '#3d4654' }}>|</span>
          <span style={{ color: '#69e6a6' }}>● live</span>
        </div>
      </div>
    </>
  );
}
