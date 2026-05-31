'use client';

import { useEffect, useRef, useState } from 'react';

const T = { bg: '#06070a', surface: '#0a0c10', border: '#1a1f28', borderStrong: '#252b35', ink: '#e9edf2', sub: '#8a93a0', dim: '#3d4654', accent: '#b5fb6b' };

const CMD_ITEMS = [
  { sec: '移動', items: [
    { k: '↗', label: 'Goto Hero', action: 'scroll:home', s: ['G', 'H'] },
    { k: '↗', label: 'Goto Studio', action: 'scroll:about', s: ['G', 'S'] },
    { k: '↗', label: 'Goto Works', action: 'scroll:works', s: ['G', 'W'] },
    { k: '↗', label: 'Goto Lab', action: 'scroll:lab', s: ['G', 'L'] },
    { k: '↗', label: 'Goto Notes', action: 'scroll:writing', s: ['G', 'N'] },
    { k: '↗', label: 'Goto Contact', action: 'scroll:contact', s: ['G', 'C'] },
  ]},
  { sec: '外部リンク', items: [
    { k: '↗', label: 'GitHub @mitokawaguchi', action: 'ext', s: [] },
    { k: '↗', label: 'Zenn 記事一覧', action: 'ext', s: [] },
    { k: '↗', label: 'Qiita 記事一覧', action: 'ext', s: [] },
    { k: '✉', label: 'お問い合わせを送る', action: 'contact', s: ['M'] },
  ]},
  { sec: 'コマンド', items: [
    { k: '⌥', label: 'View source on GitHub', action: 'source', s: ['V', 'S'] },
    { k: '⌥', label: 'Toggle hero variant', action: 'hero-toggle', s: ['V', 'H'] },
    { k: '⌥', label: 'Copy email address', action: 'copy-email', s: ['Y', 'E'] },
  ]},
];

interface CmdKProps {
  open: boolean;
  onClose: () => void;
}

export function CmdK({ open, onClose }: CmdKProps) {
  const [q, setQ] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
    if (!open) setQ('');
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!open) return null;

  const filtered = CMD_ITEMS.map((sec) => ({
    ...sec,
    items: sec.items.filter((it) => !q || it.label.toLowerCase().includes(q.toLowerCase())),
  })).filter((sec) => sec.items.length > 0);

  const handleAction = (action: string) => {
    onClose();
    if (action.startsWith('scroll:')) {
      const id = action.replace('scroll:', '');
      document.querySelector(`#${id}`)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 200,
      background: 'rgba(0,0,0,.55)', backdropFilter: 'blur(6px)',
      display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: 120,
      animation: 'cmdkFade .15s ease',
    }} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} style={{
        width: 'min(640px, 92vw)', background: T.surface, border: `1px solid ${T.borderStrong}`,
        borderRadius: 12, boxShadow: '0 24px 80px rgba(0,0,0,.6)',
        fontFamily: 'var(--font-sans)', color: T.ink, overflow: 'hidden',
        animation: 'cmdkPop .18s cubic-bezier(.2,1,.3,1)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 18px', borderBottom: `1px solid ${T.border}` }}>
          <span style={{ color: T.accent, fontFamily: 'var(--font-mono)', fontSize: 14 }}>›</span>
          <input
            ref={inputRef} value={q} onChange={(e) => setQ(e.target.value)}
            placeholder="Type a command or search…"
            style={{
              flex: 1, background: 'transparent', border: 'none', outline: 'none',
              color: T.ink, fontFamily: 'inherit', fontSize: 15,
            }} />
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: 10, color: T.sub,
            padding: '3px 7px', border: `1px solid ${T.border}`, borderRadius: 4,
          }}>ESC</span>
        </div>
        <div style={{ maxHeight: 360, overflowY: 'auto', padding: '8px 0' }}>
          {filtered.map((sec) => (
            <div key={sec.sec} style={{ padding: '6px 0' }}>
              <div style={{ padding: '6px 18px', fontSize: 10, color: T.dim, letterSpacing: 1.2, textTransform: 'uppercase' }}>{sec.sec}</div>
              {sec.items.map((it) => (
                <div key={it.label} style={{
                  display: 'flex', alignItems: 'center', gap: 12, padding: '8px 18px',
                  fontSize: 13, cursor: 'pointer',
                }}
                  className="cmdk-item"
                  onClick={() => handleAction(it.action)}>
                  <span style={{ color: T.sub, width: 16, textAlign: 'center', fontFamily: 'var(--font-mono)' }}>{it.k}</span>
                  <span style={{ flex: 1 }}>{it.label}</span>
                  <span style={{ display: 'flex', gap: 4 }}>
                    {it.s.map((k) => (
                      <span key={k} style={{
                        fontFamily: 'var(--font-mono)', fontSize: 10,
                        padding: '2px 6px', border: `1px solid ${T.border}`, color: T.sub, borderRadius: 3,
                      }}>{k}</span>
                    ))}
                  </span>
                </div>
              ))}
            </div>
          ))}
          {filtered.length === 0 && (
            <div style={{ padding: '24px 18px', color: T.sub, fontSize: 13 }}>No results.</div>
          )}
        </div>
        <div style={{
          display: 'flex', gap: 14, padding: '10px 18px', borderTop: `1px solid ${T.border}`,
          fontFamily: 'var(--font-mono)', fontSize: 10, color: T.dim,
        }}>
          <span>↑↓ navigate</span>
          <span>↵ select</span>
          <span style={{ flex: 1 }} />
          <span style={{ color: T.accent }}>● ready</span>
        </div>
      </div>

      <style>{`
        @keyframes cmdkFade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes cmdkPop {
          from { transform: scale(0.96) translateY(-8px); opacity: 0; }
          to { transform: none; opacity: 1; }
        }
        .cmdk-item:hover {
          background: #0e1116;
        }
      `}</style>
    </div>
  );
}
