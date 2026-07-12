/**
 * 送付された MIT Tech Studio.dc.html の <style> を Next.js 向けに移植したもの。
 * 既存の globals.css と衝突しないよう、トップページ専用クラス `.dcx` 配下に
 * スコープしている（intro / cursor は ID 指定のため全体に出している）。
 */
const sans = "var(--font-geist), var(--font-noto), system-ui, sans-serif";
const mono = "var(--font-geist-mono), monospace";

const CSS = `
.dcx{ --sec-pad: clamp(96px, 13vh, 168px); font-family:${sans}; color:#cfd5dd; }
.dcx ::selection{ background:var(--accent); color:#0c0e12; }
.dcx h1,.dcx h2,.dcx h3,.dcx h4,.dcx p,.dcx span,.dcx a,.dcx div,.dcx dt,.dcx dd,.dcx li{ font-family:${sans}; }

.dcx .reveal{ opacity:0; transform:translateY(48px) scale(.98); transition:opacity 1s cubic-bezier(.16,1,.3,1), transform 1s cubic-bezier(.16,1,.3,1); }
.dcx .reveal.in{ opacity:1; transform:none; }
.dcx .reveal.wipe{ clip-path:inset(0 0 108% 0); transition:opacity .2s linear, clip-path 1.05s cubic-bezier(.16,1,.3,1), transform 1.05s cubic-bezier(.16,1,.3,1); filter:none; transform:translateY(8px); }
.dcx .reveal.wipe.in{ clip-path:inset(-18% -2% -18% -2%); transform:none; }
.dcx .rise{ opacity:0; transform:translateY(28px); transition:opacity .85s cubic-bezier(.16,1,.3,1), transform .85s cubic-bezier(.16,1,.3,1); }
.dcx .rise.in{ opacity:1; transform:none; }

.dcx .flip-card{ perspective:1600px; }
.dcx .flip-inner{ position:relative; width:100%; height:100%; transition:transform .72s cubic-bezier(.7,0,.2,1); transform-style:preserve-3d; }
.dcx .flip-card:hover .flip-inner, .dcx .flip-card:focus-within .flip-inner{ transform:rotateY(180deg); }
.dcx .flip-face{ position:absolute; inset:0; backface-visibility:hidden; -webkit-backface-visibility:hidden; }

.dcx .nav-link{ position:relative; }
.dcx .nav-link::after{ content:''; position:absolute; left:14px; right:14px; bottom:4px; height:2px; border-radius:2px; background:var(--accent); transform:scaleX(0); transform-origin:left center; transition:transform .32s cubic-bezier(.16,1,.3,1); }
.dcx .nav-link:hover::after{ transform:scaleX(1); }

.dcx .sns-card{ position:relative; overflow:hidden; }
.dcx .sns-card::before{ content:''; position:absolute; inset:0; pointer-events:none; opacity:0; transition:opacity .4s ease; background:radial-gradient(130% 160% at 0% 50%, color-mix(in srgb, var(--b,#9aa3b0) 24%, transparent), transparent 62%); }
.dcx .sns-card:hover::before{ opacity:1; }
.dcx .sns-card:hover{ border-color:var(--b,#33404e) !important; box-shadow:0 16px 44px -20px color-mix(in srgb, var(--b,#000) 55%, transparent); }
.dcx .sns-card .sns-go{ position:relative; margin-left:auto; opacity:0; transform:translateX(-10px); transition:opacity .32s cubic-bezier(.16,1,.3,1), transform .32s cubic-bezier(.16,1,.3,1); color:var(--b,var(--accent)); font-family:${mono}; font-size:12px; white-space:nowrap; flex:none; }
.dcx .sns-card:hover .sns-go{ opacity:1; transform:translateX(0); }
.dcx .sns-card .sns-ico{ position:relative; transition:transform .35s cubic-bezier(.16,1,.3,1), filter .35s ease; }
.dcx .sns-card:hover .sns-ico{ transform:scale(1.16) rotate(-5deg); filter:drop-shadow(0 0 9px var(--b)); }

.dcx .work-card .work-go{ font-family:${mono}; font-size:22px; line-height:1; color:#4a525f; opacity:.35; transform:translateX(-8px); transition:transform .38s cubic-bezier(.16,1,.3,1), opacity .38s ease, color .38s ease; }
.dcx .work-card:hover .work-go{ opacity:1; transform:translateX(0); color:var(--accent); }
.dcx .work-card .work-idx{ transition:color .38s ease; }
.dcx .work-card:hover .work-idx{ color:var(--accent); }
.dcx .work-card{ position:relative; overflow:hidden; }
.dcx .work-card > *{ position:relative; z-index:1; }
.dcx .work-card::before{ content:''; position:absolute; inset:0; z-index:0; pointer-events:none; opacity:0; transition:opacity .4s ease; background:radial-gradient(130% 170% at 0% 50%, color-mix(in srgb, var(--accent) 14%, transparent), transparent 64%); }
.dcx .work-card:hover::before{ opacity:1; }
.dcx .work-card:hover{ border-color:var(--accent) !important; box-shadow:0 16px 44px -20px color-mix(in srgb, var(--accent) 55%, transparent); }

.dcx .cta .ar{ display:inline-block; transition:transform .3s cubic-bezier(.16,1,.3,1); }
.dcx .cta:hover .ar{ transform:translateX(4px); }
.dcx .cta-fill{ position:relative; overflow:hidden; }
.dcx .cta-fill::after{ content:''; position:absolute; top:0; bottom:0; left:-70%; width:45%; background:linear-gradient(90deg, transparent, rgba(255,255,255,.5), transparent); transform:skewX(-18deg); opacity:0; pointer-events:none; }
.dcx .cta-fill:hover::after{ animation:ctaSheen .75s ease forwards; }
@keyframes ctaSheen{ 0%{ left:-70%; opacity:0; } 25%{ opacity:.85; } 100%{ left:130%; opacity:0; } }

.dcx .gh-wrap{ position:relative; }
.dcx .gh-pop{ position:absolute; right:calc(100% + 14px); bottom:0; width:300px; background:#0c0f14; border:1px solid #232932; border-radius:14px; padding:18px; box-shadow:0 26px 64px -26px rgba(0,0,0,.92); opacity:0; transform:translateX(8px) scale(.98); transform-origin:bottom right; pointer-events:none; transition:opacity .25s cubic-bezier(.16,1,.3,1), transform .25s cubic-bezier(.16,1,.3,1); z-index:60; }
.dcx .gh-pop::after{ content:''; position:absolute; left:100%; top:0; bottom:0; width:14px; }
.dcx .gh-wrap:hover .gh-pop, .dcx .gh-wrap:focus-within .gh-pop{ opacity:1; transform:translateX(0) scale(1); pointer-events:auto; }

.dcx .cm-wrap{ position:relative; }
.dcx .cm-pop{ position:absolute; top:calc(100% + 12px); right:0; width:232px; background:#0c0f14; border:1px solid #232932; border-radius:12px; padding:7px; box-shadow:0 24px 60px -24px rgba(0,0,0,.92); opacity:0; transform:translateY(8px) scale(.98); transform-origin:top right; pointer-events:none; transition:opacity .25s cubic-bezier(.16,1,.3,1), transform .25s cubic-bezier(.16,1,.3,1); z-index:60; display:flex; flex-direction:column; gap:2px; }
.dcx .cm-pop::before{ content:''; position:absolute; top:-14px; left:0; right:0; height:14px; }
.dcx .cm-wrap:hover .cm-pop, .dcx .cm-wrap:focus-within .cm-pop{ opacity:1; transform:none; pointer-events:auto; }
.dcx .cm-item{ display:flex; align-items:center; gap:11px; padding:9px 11px; border-radius:8px; text-decoration:none; transition:background .2s; }
.dcx .cm-item:hover{ background:#12161d; }
.dcx .cm-item img{ width:17px; height:17px; flex:none; display:block; object-fit:contain; }

.dcx .skill-card:hover{ border-color:color-mix(in srgb, var(--c,#33404e) 45%, #2a3340) !important; }
.dcx .skill-card .skill-score{ display:inline-block; transition:transform .35s cubic-bezier(.16,1,.3,1); }
.dcx .skill-card:hover .skill-score{ transform:scale(1.22); }
.dcx .skill-card:hover .skill-bar{ box-shadow:0 0 14px -1px var(--c); }

@keyframes floatGrid{ to{ background-position: 0 -44px, -44px 0; } }
@keyframes scrollCue{ 0%{ transform:translateY(0); opacity:0; } 25%{ opacity:1; } 75%{ opacity:1; } 100%{ transform:translateY(11px); opacity:0; } }
@keyframes beamSweep{ 0%{ top:-4%; opacity:0; } 12%{ opacity:1; } 78%{ opacity:1; } 100%{ top:104%; opacity:0; } }
@keyframes logoDot{ 0%,100%{ opacity:1; transform:scale(1); } 50%{ opacity:.45; transform:scale(.78); } }

/* ===== kinetic typography ===== */
.dcx .kc{ display:inline-block; opacity:0; transform:translateY(.62em) rotate(3deg); transition:opacity .6s cubic-bezier(.16,1,.3,1), transform .7s cubic-bezier(.16,1,.3,1); }
.dcx .kc.in{ opacity:1; transform:none; }

/* ===== opening / cursor (global, ID-scoped) ===== */
#intro{ position:fixed; inset:0; z-index:9000; pointer-events:none; }
#intro .ipanel{ position:absolute; left:0; right:0; height:50.4%; background:#08090c; transition:transform 1.05s cubic-bezier(.76,0,.24,1); }
#intro .itop{ top:0; }
#intro .ibot{ bottom:0; }
#intro.open .itop{ transform:translateY(-100%); }
#intro.open .ibot{ transform:translateY(100%); }
#intro .ilogo{ position:absolute; inset:0; z-index:3; display:flex; align-items:center; justify-content:center; transform-origin:center center; }
#intro .iseam{ position:absolute; left:0; right:0; top:50%; height:3px; margin-top:-1.5px; z-index:2; background:linear-gradient(90deg, transparent, var(--accent) 18%, #eaffcb 50%, var(--accent) 82%, transparent); box-shadow:0 0 30px 4px var(--accent); transform:scaleX(0); transform-origin:center; opacity:0; mix-blend-mode:screen; transition:transform .55s cubic-bezier(.76,0,.24,1) .14s, opacity .2s ease .14s; }
#intro.seam .iseam{ transform:scaleX(1); opacity:1; }
#intro.open .iseam{ opacity:0; }
#intro .iburst{ opacity:0; transform-box:fill-box; transform-origin:center; }
#intro.seam .iburst{ animation:iburst .75s cubic-bezier(.2,.7,.3,1) forwards; }
#intro.seam .iburst2{ animation:iburst .95s cubic-bezier(.2,.7,.3,1) .08s forwards; }
@keyframes iburst{ 0%{ opacity:.9; r:5px; stroke-width:2.4; } 100%{ opacity:0; r:46px; stroke-width:0.2; } }
#intro.seam #iDot{ animation:dotFlash .6s cubic-bezier(.22,1,.36,1) forwards; }
#intro.charge #iDot{ animation:dotCharge .5s cubic-bezier(.4,0,.5,1) forwards; }
@keyframes dotCharge{ 0%{ opacity:1; transform:scale(1); filter:drop-shadow(0 0 2px var(--accent)); } 45%{ opacity:1; transform:scale(1.28); filter:drop-shadow(0 0 13px var(--accent)) drop-shadow(0 0 4px var(--accent)); } 100%{ opacity:1; transform:scale(1.04); filter:drop-shadow(0 0 6px var(--accent)); } }
@keyframes dotFlash{ 0%{ opacity:1; transform:scale(1.04); filter:drop-shadow(0 0 6px var(--accent)); } 26%{ opacity:1; transform:scale(1.95); filter:drop-shadow(0 0 11px var(--accent)) drop-shadow(0 0 26px var(--accent)); } 100%{ opacity:1; transform:scale(1); filter:drop-shadow(0 0 6px var(--accent)); } }
#intro .idraw{ stroke-dasharray:100; stroke-dashoffset:100; animation:idraw 1.1s cubic-bezier(.6,.02,.2,1) .15s forwards; }
@keyframes idraw{ to{ stroke-dashoffset:0; } }
#intro .idot{ opacity:0; transform-box:fill-box; transform-origin:center; animation:idot .5s cubic-bezier(.16,1,.3,1) 1.05s forwards; }
@keyframes idot{ 0%{ opacity:0; transform:scale(.2); } 70%{ transform:scale(1.25); } 100%{ opacity:1; transform:scale(1); } }

#cursor, #cursorDot{ position:fixed; top:0; left:0; z-index:9500; pointer-events:none; will-change:transform; }
#cursor{ width:34px; height:34px; border:1.5px solid #e9edf2; border-radius:50%; margin:-17px 0 0 -17px; opacity:0; mix-blend-mode:difference; transition:width .25s ease, height .25s ease, margin .25s ease, background .25s ease, opacity .3s; }
#cursorDot{ transition:opacity .3s; }
#cursorDot::after{ content:''; position:absolute; width:9px; height:9px; margin:-4.5px 0 0 -4.5px; background:var(--accent); border-radius:2px; box-shadow:0 0 12px var(--accent), 0 0 4px var(--accent); animation:curSpin 2.6s linear infinite; }
@keyframes curSpin{ from{ transform:rotate(0deg); } to{ transform:rotate(360deg); } }
body.cursor-hot #cursor{ width:60px; height:60px; margin:-30px 0 0 -30px; background:rgba(233,237,242,.12); opacity:1; }
body.cursor-hot #cursorDot::after{ width:6px; height:6px; margin:-3px 0 0 -3px; }
@media (hover:none), (pointer:coarse){ #cursor,#cursorDot{ display:none; } }

.dcx .nav-links{ display:flex; }
.dcx .nav-burger{ display:none; }
.dcx .hide-mobile{ display:block; }

/* ===== responsive: tablet ===== */
@media (max-width:1024px){
  .dcx{ --sec-pad: clamp(76px, 10vh, 128px); }
}

/* ===== responsive: nav collapses to burger ===== */
@media (max-width:820px){
  .dcx .nav-links{ display:none; }
  .dcx .nav-burger{ display:inline-flex; }
  .dcx .hide-mobile{ display:none; }
  /* commits 列が消えるので 3 カラムに詰める */
  .dcx .work-card{ grid-template-columns:auto 1fr auto !important; }
}

/* ===== responsive: phone ===== */
@media (max-width:560px){
  .dcx{ --sec-pad: clamp(56px, 8vh, 92px); }
  /* インデックス番号を省き、本文＋矢印の 2 カラムに */
  .dcx .work-card{ grid-template-columns:1fr auto !important; column-gap:14px !important; }
  .dcx .work-idx{ display:none; }
  /* 連絡先カード（地図）の固定高を解放して縦に収める */
  .dcx .nav-sub{ display:none; }
}

/* ============================================================
   MOTION SYSTEM — cinematic ambient / scroll motion（軽量前提）
   すべて transform / opacity / mask のみで compositor 上で動く。
   ============================================================ */

/* ── スクロール進捗バー（--scrollp を JS が rAF で更新）── */
#scrollProgress{ position:fixed; top:0; left:0; right:0; height:2px; z-index:9600; transform:scaleX(var(--scrollp,0)); transform-origin:0 50%; background:linear-gradient(90deg, var(--accent), #eaffcb 55%, var(--accent)); box-shadow:0 0 12px 1px color-mix(in srgb, var(--accent) 70%, transparent); pointer-events:none; will-change:transform; }

/* ── アンビエントのオーブ（柔らかい発光の漂い）── */
.dcx .orb{ position:absolute; border-radius:50%; pointer-events:none; mix-blend-mode:screen; opacity:.5; background:radial-gradient(circle at 50% 50%, currentColor 0%, transparent 66%); }
@keyframes orbA{ 0%,100%{ transform:translate3d(0,0,0) scale(1); } 50%{ transform:translate3d(7%,-9%,0) scale(1.18); } }
@keyframes orbB{ 0%,100%{ transform:translate3d(0,0,0) scale(1.05); } 50%{ transform:translate3d(-8%,7%,0) scale(.9); } }
@keyframes orbC{ 0%,100%{ transform:translate3d(0,0,0) scale(.95); } 50%{ transform:translate3d(5%,8%,0) scale(1.12); } }

/* ── ヒーローを縦断するスキャンビーム（周期）── */
.dcx .hero-scan{ position:absolute; left:0; right:0; top:0; height:1.5px; background:linear-gradient(90deg, transparent, var(--accent) 20%, #f0ffd0 50%, var(--accent) 80%, transparent); box-shadow:0 0 20px 2px color-mix(in srgb, var(--accent) 45%, transparent); mix-blend-mode:screen; opacity:0; pointer-events:none; will-change:transform,opacity; animation:heroScan 8s cubic-bezier(.45,.05,.35,1) 3s infinite; }
@keyframes heroScan{ 0%{ transform:translateY(2vh); opacity:0; } 10%{ opacity:.55; } 82%{ opacity:.55; } 100%{ transform:translateY(78vh); opacity:0; } }

/* ── キネティック・タイポ（見出しを文字単位で組み上げる）── */
.dcx .split-head{ }
.dcx .kw{ display:inline-block; opacity:0; transform:translateY(.72em) rotate(2.5deg); transition:opacity .7s cubic-bezier(.16,1,.3,1), transform .82s cubic-bezier(.16,1,.3,1); }
.dcx .kw.in{ opacity:1; transform:none; }

/* ── 見出しを一度だけ横切る光沢（シーン）── */
.dcx .shine{ position:relative; }
.dcx .shine.lit::after{ content:''; position:absolute; inset:-2px -6px; pointer-events:none; background:linear-gradient(105deg, transparent 38%, color-mix(in srgb, var(--accent) 55%, #fff) 50%, transparent 62%); background-size:220% 100%; background-position:180% 0; mix-blend-mode:screen; opacity:0; animation:shineSweep 1.15s cubic-bezier(.4,.05,.35,1) forwards; }
@keyframes shineSweep{ 0%{ opacity:0; background-position:180% 0; } 12%{ opacity:.9; } 100%{ opacity:0; background-position:-60% 0; } }

/* ── テック・キーワードのマーキー ── */
.dcx .mq{ overflow:hidden; -webkit-mask-image:linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent); mask-image:linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent); }
.dcx .mq-track{ display:inline-flex; align-items:center; gap:0; white-space:nowrap; will-change:transform; animation:mqScroll 32s linear infinite; }
.dcx .mq:hover .mq-track{ animation-play-state:paused; }
@keyframes mqScroll{ from{ transform:translateX(0); } to{ transform:translateX(-50%); } }
.dcx .mq-item{ display:inline-flex; align-items:center; gap:14px; padding:0 22px; font-family:${mono}; font-size:13px; letter-spacing:.04em; color:#6b7480; }
.dcx .mq-item b{ color:#aab2bd; font-weight:500; }
.dcx .mq-dot{ width:5px; height:5px; border-radius:50%; background:var(--accent); box-shadow:0 0 8px var(--accent); flex:none; }

/* ── ポインタ追従の 3D ティルト / マグネット（fine ポインタのみ）── */
.dcx [data-tilt]{ transform-style:preserve-3d; }
.dcx [data-magnetic]{ transition:transform .35s cubic-bezier(.16,1,.3,1); }

/* ── コンタクトのレーダー ping（SMIL から compositor へ）── */
.dcx .radar-ping{ transform-box:fill-box; transform-origin:center; animation:radarPing 2.4s cubic-bezier(.2,.7,.3,1) infinite; }
.dcx .radar-ping.d2{ animation-duration:3s; animation-delay:.4s; }
@keyframes radarPing{ from{ transform:scale(1); opacity:.6; } to{ transform:scale(3.4); opacity:0; } }

/* ── ループするアンビエント演出のオフスクリーン / タブ非表示ポーズ ── */
.dcx .paused .orb,
.dcx .paused .hero-scan,
.dcx .paused .mq-track,
.dcx .paused .hero-grid,
.dcx .paused .scroll-cue,
.dcx .paused .radar-ping,
.tab-hidden .dcx .orb,
.tab-hidden .dcx .hero-scan,
.tab-hidden .dcx .mq-track,
.tab-hidden .dcx .hero-grid,
.tab-hidden .dcx .scroll-cue,
.tab-hidden .dcx .radar-ping{ animation-play-state:paused !important; }

/* ── モバイル（hover 不可）でのホバー演出パリティ（スクロールで点灯）── */
@media (hover:none){
  .dcx .work-card.in-view::before, .dcx .sns-card.in-view::before{ opacity:1; }
  .dcx .work-card.in-view .work-go, .dcx .sns-card.in-view .sns-go{ opacity:1; transform:none; }
  .dcx .work-card.in-view .work-go, .dcx .work-card.in-view .work-idx{ color:var(--accent); }
  .dcx .skill-card.in-view .skill-bar{ box-shadow:0 0 14px -1px var(--c); }
}

/* ── スクロール連動パララックス（compositor 上・JS 不要）── */
@supports (animation-timeline: view()){
  .dcx .parallax-img{ scale:1.16; animation:imgParallax linear both; animation-timeline:view(); animation-range:cover; }
  @keyframes imgParallax{ from{ transform:translateY(-7%); } to{ transform:translateY(7%); } }
  .dcx .parallax-slow{ animation:parallaxRise linear both; animation-timeline:view(); animation-range:entry 0% cover 60%; }
  @keyframes parallaxRise{ from{ transform:translateY(38px); opacity:.35; } to{ transform:translateY(0); opacity:1; } }
}

/* ── ヒーロー退場スクラブ（hero→about の映画的な受け渡し）── */
.dcx .hero-exit{ transform:none; opacity:1; }
@media (prefers-reduced-motion:no-preference){
  @supports (animation-timeline: view()){
    .dcx .hero-exit{ animation:heroExit linear both; animation-timeline:view(block); animation-range:exit -10% exit 92%; }
  }
}
@keyframes heroExit{ to{ transform:translateY(-11%) scale(.965); opacity:0; } }

/* ── モバイルメニューの登場（オーバーレイ + リンクのスタガー）── */
.dcx .mobile-menu{ animation:mmIn .42s cubic-bezier(.16,1,.3,1) both; }
@keyframes mmIn{ from{ opacity:0; transform:translateY(-1.5%); } to{ opacity:1; transform:none; } }
.dcx .mm-link{ animation:mmLink .5s cubic-bezier(.16,1,.3,1) both; animation-delay:calc(var(--i,0)*60ms + 130ms); }
@keyframes mmLink{ from{ opacity:0; transform:translateY(16px); } to{ opacity:1; transform:none; } }

@media (prefers-reduced-motion:reduce){
  .dcx .reveal{ opacity:1; transform:none; filter:none; }
  .dcx .reveal.wipe{ clip-path:none; }
  .dcx .rise{ opacity:1; transform:none; }
  .dcx .kc{ opacity:1; transform:none; }
  .dcx .kw{ opacity:1 !important; transform:none !important; }
  .dcx .orb, .dcx .hero-scan, .dcx .mq-track{ animation:none !important; }
  .dcx .shine.lit::after{ animation:none !important; opacity:0 !important; }
  .dcx .parallax-img, .dcx .parallax-slow{ animation:none !important; transform:none !important; scale:1 !important; opacity:1 !important; }
  .dcx .radar-ping{ animation:none !important; }
  .dcx .hero-exit{ animation:none !important; transform:none !important; opacity:1 !important; }
  .dcx .mobile-menu, .dcx .mm-link{ animation:none !important; opacity:1 !important; transform:none !important; }
  .dcx [data-tilt]{ transform:none !important; }
  #scrollProgress{ display:none; }
  .dcx [style*="animation"]{ animation:none !important; }
  #intro{ display:none; }
}
`;

export function LandingStyles() {
  return <style>{CSS}</style>;
}
