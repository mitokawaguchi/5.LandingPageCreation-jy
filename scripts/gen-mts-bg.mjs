/**
 * Generates the five atmospheric section backgrounds used by the MTS landing page.
 * Output: public/mts/{hero,about,works,writing,contact}.svg
 *
 * These are lightweight, deterministic SVGs that match the studio's dark palette.
 * Re-run with: node scripts/gen-mts-bg.mjs
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, '..', 'public', 'mts');
mkdirSync(OUT, { recursive: true });

const W = 1600;
const H = 1000;

// Deterministic PRNG so output is stable across runs.
function mulberry32(seed) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const SECTIONS = [
  { name: 'hero',    accent: '#b5fb6b', cx: 0.74, cy: 0.30, seed: 11 },
  { name: 'about',   accent: '#5ecfff', cx: 0.22, cy: 0.42, seed: 23 },
  { name: 'works',   accent: '#b48cff', cx: 0.80, cy: 0.58, seed: 37 },
  { name: 'writing', accent: '#ffb648', cx: 0.26, cy: 0.70, seed: 51 },
  { name: 'contact', accent: '#ff5da2', cx: 0.52, cy: 0.46, seed: 67 },
];

function build({ name, accent, cx, cy, seed }) {
  const rand = mulberry32(seed);

  // Scattered accent dots (faint particle field).
  let dots = '';
  for (let i = 0; i < 90; i++) {
    const x = (rand() * W).toFixed(1);
    const y = (rand() * H).toFixed(1);
    const r = (0.6 + rand() * 1.8).toFixed(2);
    const o = (0.04 + rand() * 0.16).toFixed(2);
    dots += `<circle cx="${x}" cy="${y}" r="${r}" fill="${accent}" opacity="${o}"/>`;
  }

  // Concentric arcs radiating from the glow centre.
  const gx = (cx * W).toFixed(0);
  const gy = (cy * H).toFixed(0);
  let arcs = '';
  for (let i = 1; i <= 5; i++) {
    const rr = 160 * i;
    const o = (0.10 - i * 0.014).toFixed(3);
    arcs += `<circle cx="${gx}" cy="${gy}" r="${rr}" fill="none" stroke="${accent}" stroke-width="1" opacity="${o}"/>`;
  }

  // A few long diagonal accent strokes.
  let strokes = '';
  for (let i = 0; i < 4; i++) {
    const y0 = (rand() * H).toFixed(0);
    const y1 = (Number(y0) + (rand() - 0.5) * 420).toFixed(0);
    const o = (0.05 + rand() * 0.08).toFixed(2);
    strokes += `<line x1="0" y1="${y0}" x2="${W}" y2="${y1}" stroke="${accent}" stroke-width="1" opacity="${o}"/>`;
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" preserveAspectRatio="xMidYMid slice">
  <defs>
    <linearGradient id="base" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#0a0c10"/>
      <stop offset="1" stop-color="#06070a"/>
    </linearGradient>
    <radialGradient id="glow" cx="${(cx * 100).toFixed(0)}%" cy="${(cy * 100).toFixed(0)}%" r="62%">
      <stop offset="0" stop-color="${accent}" stop-opacity="0.30"/>
      <stop offset="38%" stop-color="${accent}" stop-opacity="0.08"/>
      <stop offset="100%" stop-color="${accent}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="vignette" cx="50%" cy="50%" r="75%">
      <stop offset="55%" stop-color="#06070a" stop-opacity="0"/>
      <stop offset="100%" stop-color="#06070a" stop-opacity="0.85"/>
    </radialGradient>
    <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
      <path d="M48 0H0V48" fill="none" stroke="#1a1f28" stroke-width="1"/>
    </pattern>
    <pattern id="gridLg" width="192" height="192" patternUnits="userSpaceOnUse">
      <path d="M192 0H0V192" fill="none" stroke="#252b35" stroke-width="1"/>
    </pattern>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#base)"/>
  <rect width="${W}" height="${H}" fill="url(#grid)" opacity="0.5"/>
  <rect width="${W}" height="${H}" fill="url(#gridLg)" opacity="0.6"/>
  ${strokes}
  ${arcs}
  ${dots}
  <rect width="${W}" height="${H}" fill="url(#glow)"/>
  <rect width="${W}" height="${H}" fill="url(#vignette)"/>
</svg>
`;
}

for (const s of SECTIONS) {
  const svg = build(s);
  writeFileSync(join(OUT, `${s.name}.svg`), svg, 'utf8');
  console.log(`wrote public/mts/${s.name}.svg (${svg.length} bytes)`);
}
