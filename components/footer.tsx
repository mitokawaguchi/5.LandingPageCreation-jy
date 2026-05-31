'use client';

import type { ReactNode } from 'react';
import {
  FOOTER_LEGAL_LINKS as LEGAL_LINKS,
  FOOTER_STACK_ITEMS as STACK_ITEMS,
  FOOTER_COLOPHON,
  FOOTER_META,
} from '@/data/site-content';

/* ─── Design Tokens ─── */
const T = { bg:'#06070a', surface:'#0a0c10', surface2:'#0e1116', surface3:'#13171e', border:'#1a1f28', borderStrong:'#252b35', ink:'#e9edf2', sub:'#8a93a0', dim:'#3d4654', accent:'#b5fb6b', accentDim:'#7da848', warn:'#ffb648', pink:'#ff5da2', blue:'#5ecfff', green:'#69e6a6', red:'#ff5a64', purple:'#b48cff' };

const monoFam = 'var(--font-mono)';
const sansFam = 'var(--font-sans)';

/* ─── Link Data ─── */
const STUDIO_LINKS = [
  { label: 'Studio', href: '#about' },
  { label: 'Works', href: '#works' },
  { label: 'Lab', href: '#lab' },
  { label: 'Notes', href: '#writing' },
  { label: 'Contact', href: '#contact' },
];

const COLOPHON: [string, ReactNode][] = FOOTER_COLOPHON.map(({ label, value }) => {
  // First token of the value is rendered in T.ink, the remainder in inherited color.
  const sep = value.indexOf(' · ');
  if (sep === -1) return [label, <span style={{ color: T.ink }}>{value}</span>];
  const head = value.slice(0, sep);
  const rest = value.slice(sep);
  return [label, <span><span style={{ color: T.ink }}>{head}</span>{rest}</span>];
});

/* ─── Main Footer ─── */
export function Footer() {
  return (
    <footer style={{
      background: T.surface2, borderTop: `1px solid ${T.border}`,
      padding: '64px 0 32px'
    }}>
      <div className="studio-container" style={{ maxWidth: 1320, margin: '0 auto', padding: '0 56px' }}>
        {/* Top brand row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'auto 1fr',
          gap: 'clamp(28px, 4vw, 56px)',
          alignItems: 'end',
          paddingBottom: 36, marginBottom: 36,
          borderBottom: `1px solid ${T.border}`
        }}>
          {/* Pixel-grid monogram */}
          <div style={{ position: 'relative' }}>
            <div style={{
              fontFamily: monoFam, fontSize: 10, color: T.dim,
              letterSpacing: 1.6, textTransform: 'uppercase', marginBottom: 12,
              display: 'flex', alignItems: 'center', gap: 8
            }}>
              <span style={{ width: 6, height: 6, background: T.accent }} />
              Brandmark · 田/05×05
            </div>
            <svg
              viewBox="0 0 50 50"
              width="clamp(96px, 9vw, 140px)" height="auto"
              style={{ display: 'block' }}
              aria-label="MIT Tech Studio monogram">

              {/* 田-style construction grid (faint) — 5×5 */}
              {Array.from({ length: 6 }).map((_, i) => (
                <line key={`v${i}`} x1={i * 10} y1={0} x2={i * 10} y2={50}
                  stroke={T.border} strokeWidth={0.4} />
              ))}
              {Array.from({ length: 6 }).map((_, i) => (
                <line key={`h${i}`} x1={0} y1={i * 10} x2={50} y2={i * 10}
                  stroke={T.border} strokeWidth={0.4} />
              ))}

              {/* pixel M — 5 wide × 5 tall, ink cells + 1 accent for the V dip */}
              {(() => {
                const cells: { x: number; y: number; accent: boolean }[] = [];
                // outer verticals (5 dots tall)
                for (let y = 0; y < 5; y++) {
                  cells.push({ x: 0, y, accent: false });
                  cells.push({ x: 4, y, accent: false });
                }
                // inner V shoulders + dip
                cells.push({ x: 1, y: 1, accent: false });
                cells.push({ x: 3, y: 1, accent: false });
                cells.push({ x: 2, y: 2, accent: true }); // accent cell
                return cells.map((c, i) => (
                  <rect key={i}
                    x={c.x * 10 + 1.2} y={c.y * 10 + 1.2}
                    width={7.6} height={7.6}
                    fill={c.accent ? T.accent : T.ink} />
                ));
              })()}

              {/* tiny baseline rule */}
              <line x1={-2} y1={51.5} x2={52} y2={51.5} stroke={T.sub} strokeWidth={0.6} />
            </svg>
          </div>

          {/* Type-contrast wordmark */}
          <div style={{ minWidth: 0 }}>
            {/* MIT TECH — bold mono uppercase */}
            <div style={{
              fontFamily: monoFam, fontWeight: 700,
              fontSize: 'clamp(48px, 7vw, 108px)',
              color: T.ink, lineHeight: 0.95, letterSpacing: '-0.055em',
              textTransform: 'uppercase'
            }}>
              MIT&nbsp;TECH
            </div>
            {/* STUDIO — same mono family; distinction comes from weight, not typeface. */}
            <div style={{
              fontFamily: monoFam,
              fontStyle: 'normal', fontWeight: 700,
              fontSize: 'clamp(48px, 7vw, 108px)',
              color: T.ink, lineHeight: 0.95, letterSpacing: '-0.055em',
              textTransform: 'uppercase',
              marginTop: '0.04em',
              display: 'flex', alignItems: 'flex-end', gap: '0.4em',
              flexWrap: 'wrap'
            }}>
              <span>STUDIO</span>
              <span style={{
                fontFamily: monoFam, fontStyle: 'normal',
                fontSize: '0.16em', fontWeight: 500,
                color: T.sub, letterSpacing: '0.18em', textTransform: 'uppercase',
                paddingBottom: '0.7em'
              }}>
                <span style={{ color: T.accent }}>●</span>&nbsp;&nbsp;Tokyo · 35.68°N
              </span>
            </div>
          </div>
        </div>

        {/* Real colophon — set as a spec sheet, not as filler links */}
        <div className="grid-4" style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 24, marginBottom: 40
        }}>
          {COLOPHON.map(([k, v], i) => (
            <div key={i}>
              <div style={{
                fontFamily: monoFam, fontSize: 10, color: T.dim,
                letterSpacing: 1.4, textTransform: 'uppercase', marginBottom: 8,
                display: 'flex', alignItems: 'center', gap: 8
              }}>
                <span style={{ width: 14, height: 1, background: T.border }} />
                {k}
              </div>
              <div style={{ fontFamily: monoFam, fontSize: 12.5, color: T.sub, lineHeight: 1.55, letterSpacing: 0.2 }}>
                {v}
              </div>
            </div>
          ))}
        </div>

        <div className="foot-3" style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32,
          paddingBottom: 36, borderBottom: `1px solid ${T.border}`
        }}>
          <div>
            <div style={{ fontFamily: monoFam, fontSize: 10, color: T.dim, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 14 }}>Studio</div>
            {STUDIO_LINKS.map((l) => (
              <a key={l.label} href={l.href} style={{ display: 'block', fontFamily: sansFam, fontSize: 14, color: T.ink, padding: '5px 0', textDecoration: 'none' }}>{l.label}</a>
            ))}
          </div>
          <div>
            <div style={{ fontFamily: monoFam, fontSize: 10, color: T.dim, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 14 }}>Legal</div>
            {LEGAL_LINKS.map((l) => (
              <div key={l} style={{ fontFamily: sansFam, fontSize: 13, color: T.sub, padding: '5px 0' }}>{l}</div>
            ))}
          </div>
          <div>
            <div style={{ fontFamily: monoFam, fontSize: 10, color: T.dim, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 14 }}>Stack</div>
            {STACK_ITEMS.map((item) => (
              <div key={item} style={{ fontFamily: sansFam, fontSize: 13, color: T.sub, padding: '5px 0' }}>{item}</div>
            ))}
          </div>
        </div>

        <div style={{
          display: 'flex', gap: 18, paddingTop: 24,
          fontFamily: monoFam, fontSize: 11, color: T.sub, flexWrap: 'wrap'
        }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 6, height: 6, borderRadius: 3, background: T.green }} />
            all systems normal
          </span>
          <span>{FOOTER_META.build}</span>
          <span>{FOOTER_META.commit}</span>
          <span style={{ flex: 1 }} />
          <span style={{ color: T.ink }}>{FOOTER_META.copyright}</span>
          <span>{FOOTER_META.rights}</span>
        </div>
      </div>
    </footer>
  );
}
