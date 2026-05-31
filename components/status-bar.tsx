'use client';

import { useEffect, useState } from 'react';
import { EDITING_STATES, DEPLOY_INFO } from '@/data/site-content';

/* ─── Design Tokens ─── */
const T = { bg:'#06070a', surface:'#0a0c10', surface2:'#0e1116', surface3:'#13171e', border:'#1a1f28', borderStrong:'#252b35', ink:'#e9edf2', sub:'#8a93a0', dim:'#3d4654', accent:'#b5fb6b', accentDim:'#7da848', warn:'#ffb648', pink:'#ff5da2', blue:'#5ecfff', green:'#69e6a6', red:'#ff5a64', purple:'#b48cff' };

function formatTime(date: Date, tz: string): string {
  return date.toLocaleTimeString('en-GB', {
    timeZone: tz,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
}

/* ─── EditingStatus ─── */
function EditingStatus() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIdx((prev) => (prev + 1) % EDITING_STATES.length);
    }, 4200);
    return () => clearInterval(id);
  }, []);

  const state = EDITING_STATES[idx];

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <span style={{
        width: 6,
        height: 6,
        borderRadius: '50%',
        background: T.accent,
        animation: 'statusPulse 2s infinite',
        display: 'inline-block',
      }} />
      <span style={{ color: T.ink, fontFamily: 'var(--font-mono)', fontSize: 11 }}>{state.action}</span>
      <span style={{ color: T.dim }}>·</span>
      <span style={{ color: T.sub, fontFamily: 'var(--font-mono)', fontSize: 11 }}>{state.file}</span>
      <span style={{ color: T.dim }}>·</span>
      <span style={{ color: T.sub, fontFamily: 'var(--font-mono)', fontSize: 11 }}>{state.time}</span>
    </div>
  );
}

/* ─── Main StatusBar ─── */
export function StatusBar() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const jst = now ? formatTime(now, 'Asia/Tokyo') : '--:--:--';
  const utc = now ? formatTime(now, 'UTC') : '--:--:--';

  return (
    <>
      <style>{`
        @keyframes statusPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
      <div style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'rgba(6,7,10,.85)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        borderBottom: `1px solid ${T.border}`,
      }}>
        <div style={{
          maxWidth: 1320,
          margin: '0 auto',
          padding: '0 56px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 36,
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          color: T.sub,
        }}>
          {/* Left: EditingStatus */}
          <EditingStatus />

          {/* Right side */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            {/* Clocks */}
            <span>
              JST <span style={{ color: T.ink }}>{jst}</span>
            </span>
            <span style={{ color: T.dim }}>·</span>
            <span>
              UTC <span style={{ color: T.ink }}>{utc}</span>
            </span>

            {/* Separator */}
            <span style={{ width: 1, height: 14, background: T.border, display: 'inline-block' }} />

            {/* Command palette */}
            <button
              type="button"
              style={{
                background: 'none',
                border: `1px solid ${T.border}`,
                borderRadius: 4,
                padding: '2px 8px',
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                color: T.sub,
                cursor: 'pointer',
                transition: 'border-color .2s',
              }}
            >
              ⌘ K palette
            </button>

            {/* Separator */}
            <span style={{ width: 1, height: 14, background: T.border, display: 'inline-block' }} />

            {/* Deploy status */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: T.green, display: 'inline-block' }} />
              <span style={{ color: T.ink }}>{DEPLOY_INFO.status}</span>
              <span style={{ color: T.dim }}>· {DEPLOY_INFO.platform} · {DEPLOY_INFO.when}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
