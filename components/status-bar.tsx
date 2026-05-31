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

/* ─── Clock (JST + UTC, ticking seconds) ─── */
function Clock({ zone, tz }: { zone: string; tz: string }) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const time = now ? formatTime(now, tz) : '--:--:--';

  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      color: T.sub,
      fontVariantNumeric: 'tabular-nums',
    }}>
      <span style={{ color: T.dim }}>{zone}</span>
      <span style={{ color: T.ink }}>{time}</span>
    </span>
  );
}

/* ─── EditingStatus (rotates) ─── */
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
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      color: T.sub,
    }}>
      <span style={{
        width: 6,
        height: 6,
        borderRadius: 3,
        background: T.accent,
        boxShadow: `0 0 8px ${T.accent}`,
        animation: 'studioPulse 1.6s ease-in-out infinite',
      }} />
      <span style={{ color: T.ink }}>{state.action}</span>
      <span style={{ color: T.dim }}>·</span>
      <span style={{ color: T.sub, fontFamily: 'inherit' }}>{state.file}</span>
      <span style={{ color: T.dim }}>·</span>
      <span style={{ color: T.sub }}>{state.time}</span>
    </span>
  );
}

/* ─── Main StatusBar ─── */
export function StatusBar({ onCmdK }: { onCmdK?: () => void } = {}) {
  return (
    <>
      <style>{`
        @keyframes studioPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.85); }
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
        <div className="studio-container" style={{
          maxWidth: 1320,
          margin: '0 auto',
          padding: '0 56px',
          display: 'flex',
          alignItems: 'center',
          gap: 18,
          height: 36,
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          color: T.sub,
        }}>
          <EditingStatus />

          <span style={{ flex: 1 }} />

          {/* Clocks */}
          <span className="sb-clocks" style={{ display: 'inline-flex', alignItems: 'center', gap: 18 }}>
            <Clock zone="JST" tz="Asia/Tokyo" />
            <span style={{ color: T.dim, fontFamily: 'var(--font-mono)', fontSize: 11 }}>·</span>
            <Clock zone="UTC" tz="UTC" />
            <span style={{ width: 1, height: 12, background: T.border }} />
          </span>

          {/* Command palette */}
          <button
            type="button"
            className="cmdk-btn"
            onClick={onCmdK}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: 'transparent',
              border: `1px solid ${T.border}`,
              padding: '4px 10px',
              cursor: 'pointer',
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              color: T.sub,
              transition: 'border-color .15s, color .15s',
            }}
          >
            <span>⌘ K</span>
            <span style={{ color: T.dim }}>palette</span>
          </button>

          {/* Deploy status */}
          <span className="sb-deploy" style={{ display: 'inline-flex', alignItems: 'center', gap: 18 }}>
            <span style={{ width: 1, height: 12, background: T.border }} />
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: 'var(--font-mono)', fontSize: 11, color: T.sub }}>
              <span style={{ width: 6, height: 6, borderRadius: 3, background: T.green, boxShadow: `0 0 6px ${T.green}` }} />
              <span style={{ color: T.ink }}>{DEPLOY_INFO.status}</span>
              <span style={{ color: T.dim }}>· {DEPLOY_INFO.platform} · {DEPLOY_INFO.when}</span>
            </span>
          </span>
        </div>
      </div>
    </>
  );
}
