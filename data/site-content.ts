/**
 * ============================================================================
 *  SITE CONTENT — 実データの差し込み口（単一の編集ポイント）
 * ============================================================================
 *
 *  サイト各セクションに表示される「データ」を、ここ 1 ファイルに集約しています。
 *  デザイン（レイアウト / アニメーション）は各 component 側に残したまま、
 *  数値・文言・リンクなどの中身だけをここで差し替えられます。
 *
 *  ▸ 実データに置き換えるときは、このファイルの値を編集するだけで OK です。
 *  ▸ GitHub のリポジトリ情報・プロフィールは data/lab-github.ts、
 *    Zenn / Qiita のプロフィール URL は data/writing-profiles.ts に分かれています
 *    （このファイルから再エクスポートしているので、参照は site-content からで統一できます）。
 *
 *  各ブロックの先頭コメントに「実データ / 演出用ダミー」の区別を書いています。
 * ============================================================================
 */

import { LAB_REPOS, LAB_GITHUB_PROFILE } from './lab-github';
import { WRITING_PROFILES } from './writing-profiles';

/* ─── カラーパレット（Datapunk v2） ─────────────────────────────────────────
 * データ側で色を指定する箇所（ティッカー・言語バーなど）はこの hex を使います。 */
export const PALETTE = {
  bg: '#06070a', surface: '#0a0c10', surface2: '#0e1116', surface3: '#13171e',
  border: '#1a1f28', borderStrong: '#252b35', ink: '#e9edf2', sub: '#8a93a0',
  dim: '#3d4654', accent: '#b5fb6b', accentDim: '#7da848', warn: '#ffb648',
  pink: '#ff5da2', blue: '#5ecfff', green: '#69e6a6', red: '#ff5a64', purple: '#b48cff',
} as const;

const C = PALETTE;

/* ────────────────────────────────────────────────────────────────────────
 *  GitHub — リポジトリ / プロフィール（実データ）
 *  実体は data/lab-github.ts。月次の GitHub Actions で更新する想定です。
 * ──────────────────────────────────────────────────────────────────────── */
export const GITHUB_PROFILE = LAB_GITHUB_PROFILE;
export const REPOS = LAB_REPOS;
export { WRITING_PROFILES };

/* リポジトリ説明文（works セクションのカード本文・実データ）
 * キーは data/lab-github.ts の repo.name と一致させてください。 */
export const REPO_DESCRIPTIONS: Record<string, string> = {
  '5.LandingPageCreation-jy':
    'Dark-themed portfolio landing page built with Next.js, TypeScript, and custom design system. Real-time GitHub integration and performance-optimized animations.',
  taskflow:
    'Full-stack task management app with drag-and-drop Kanban board, real-time updates and Vercel deployment.',
  mitokawaguchi:
    'GitHub profile README with dynamic stats, contribution graph, and auto-updated skill badges.',
};

/* ────────────────────────────────────────────────────────────────────────
 *  TICKER — ヒーロー上部の流れるテロップ
 *  半分は実データ（COMMITS / LIGHTHOUSE / CAPACITY 等）、半分は演出用です。
 * ──────────────────────────────────────────────────────────────────────── */
export type TickerItem = { k: string; v: string; c: string; tag?: string };
export const TICKER_ITEMS: TickerItem[] = [
  { k: 'MIT-STUDIO', v: '+12.4%', c: C.accent, tag: '90d' },
  { k: 'NEXT.JS', v: '16.0', c: C.blue },
  { k: 'REACT', v: '19.0', c: C.blue },
  { k: 'COMMITS-30D', v: '+184', c: C.accent, tag: 'up' },
  { k: 'ISSUES', v: '0', c: C.green },
  { k: 'UPTIME', v: '99.98%', c: C.green },
  { k: 'LAST-DEPLOY', v: '4m ago', c: C.warn },
  { k: 'CAPACITY-Q2', v: '2/3 SLOTS', c: C.warn },
  { k: 'LIGHTHOUSE', v: '99/100/96/100', c: C.accent },
  { k: 'i18n', v: 'JA·EN', c: C.purple },
  { k: 'RESPONSE', v: '<24h', c: C.pink },
];

/* ────────────────────────────────────────────────────────────────────────
 *  HERO — メタ行（タイトル本文は messages/ja.json#hero）
 * ──────────────────────────────────────────────────────────────────────── */
export const HERO_META = {
  thesis: 'OVR–001 · primary thesis',
  version: 'v 6.0.0',
  handle: 'mitokawaguchi',
};

/* ────────────────────────────────────────────────────────────────────────
 *  STATUS BAR — 上部ステータス行
 * ──────────────────────────────────────────────────────────────────────── */
/* 「いま編集中」風のローテーション表示（演出用ダミー） */
export type EditingState = { file: string; action: string; time: string };
export const EDITING_STATES: EditingState[] = [
  { file: 'components/hero-section.tsx', action: 'refining', time: 'now' },
  { file: 'styles/tokens.css', action: 'tweaking', time: '2m ago' },
  { file: 'data/lab-github.ts', action: 'syncing', time: '4m ago' },
  { file: 'app/(site)/page.tsx', action: 'restructuring', time: '7m ago' },
  { file: 'messages/ja.json', action: 'editing copy', time: '12m ago' },
];

/* 右側のデプロイ表示（実データに合わせて更新可） */
export const DEPLOY_INFO = { status: 'deployed', platform: 'vercel', when: '4m' };

/* ────────────────────────────────────────────────────────────────────────
 *  LAB セクション — 言語比率 / Lighthouse / git log
 * ──────────────────────────────────────────────────────────────────────── */
/* 言語比率（実データ。GitHub の linguist 集計などに置き換え可） */
export type LanguageStat = { name: string; pct: number; color: string };
export const LANGUAGES: LanguageStat[] = [
  { name: 'TypeScript', pct: 52, color: '#3178c6' },
  { name: 'CSS', pct: 22, color: C.pink },
  { name: 'JavaScript', pct: 18, color: '#f1e05a' },
  { name: 'Markdown', pct: 8, color: C.purple },
];

/* Lighthouse スコア（実データ。CI のレポートに置き換え可） */
export type LighthouseScore = { label: string; score: number; color: string };
export const LIGHTHOUSE: LighthouseScore[] = [
  { label: 'Perf', score: 99, color: C.green },
  { label: 'A11y', score: 100, color: C.green },
  { label: 'BP', score: 96, color: C.warn },
  { label: 'SEO', score: 100, color: C.green },
];
/* Lighthouse 計測対象の注記 */
export const LIGHTHOUSE_TARGET = 'v0-mit-tech-studio.vercel.app · モバイル / スロットル';

/* ────────────────────────────────────────────────────────────────────────
 *  CAREER ログ — 経歴年表（実データ。git log 風のタイプライター演出で表示）
 *  ヘッダは「git log --oneline · career」として表示します（演出は lab-section 側）。
 *
 *  ▸ 1 行 = 経歴 1 件。表示は配列の上から順（git log と同じく新しい順）。
 *  ▸ [sha, message, period, author, dotColor]
 *      sha     : 7 桁の擬似コミットハッシュ（CLI の git log を踏襲）
 *      message : conventional-commit 風のひとこと（タイプライターで打たれる本文）
 *      period  : 右端の期間表示（例 '2025–' / '2022–25'）
 *      author  : '@author' で表示
 *      dotColor: 行頭ドットの色
 *
 *  ※ メッセージは英語・ユーモア（自虐）込みの実経歴。差し替えはこの配列だけでOK。
 * ──────────────────────────────────────────────────────────────────────── */
export type CareerRow = [string, string, string, string, string];
export const CAREER_LOG_TOTAL = 7; // ヘッダの「showing N of M」の総件数
export const CAREER_LOG: CareerRow[] = [
  ['c0ffee5', 'feat(brain): outsource thinking to Cursor + Claude (a.k.a. vibe coding)', '2025–', 'mito', C.accent],
  ['e4d0b91', 'feat(job): pivot to pharma marketing — now hyping molecules for a living', '2025–', 'mito', C.green],
  ['defaced', 'revert(life): escape real estate after 6 months of documented hell', '2025', 'regret', C.red],
  ['decade5', "docs(edu): graduate M-University — took 5 years, but who's counting", '2024', 'mito', C.blue],
  ['faded17', 'chore(retail): fold the same shirts for 3 years @ apparel store', '2022–25', 'mito', C.purple],
  ['a1b8f3c', 'chore(gym): re-rack weights for 3.5 years — net muscle gain: 0', '2019–22', 'no-gains', C.warn],
  ['0000001', 'chore: initial commit — enroll at M-University w/ delusional optimism', '2019', 'mito', C.sub],
];

/* ────────────────────────────────────────────────────────────────────────
 *  WORKS セクション — ヒートマップ / ワークフロー
 * ──────────────────────────────────────────────────────────────────────── */
export const HEATMAP_META = { peak: 'peak: Tue 14:00 JST', streak: 'streak: 18d' };

export type WorkflowCardData = { num: string; title: string; body: string; color: string };
export const WORKFLOW_CARDS: WorkflowCardData[] = [
  { num: '01', title: 'Build', body: 'TypeScript strict, ESLint, Prettier — zero warnings policy', color: C.green },
  { num: '02', title: 'Deploy', body: 'Vercel Preview on PR, Production on merge to main', color: C.blue },
  { num: '03', title: 'Auto Update', body: 'Dependabot + automated security patches weekly', color: C.purple },
];

/* ────────────────────────────────────────────────────────────────────────
 *  WRITING セクション — Zenn / Qiita の記事（実データ）
 *  source / title / likes / impressions / date / url を差し替えてください。
 * ──────────────────────────────────────────────────────────────────────── */
export type Article = {
  source: 'Zenn' | 'Qiita';
  title: string;
  likes: number;
  impressions: number;
  date: string;
  url: string;
};
export const ARTICLES: Article[] = [
  { source: 'Zenn', title: 'Next.js App Router で next-intl を使い倒す', likes: 42, impressions: 1280, date: '2026-02-18',
    url: 'https://zenn.dev/mitokawaguchi/articles/nextjs-next-intl' },
  { source: 'Qiita', title: 'デザインシステムを CSS Variables だけで構築する', likes: 28, impressions: 980, date: '2026-01-09',
    url: 'https://qiita.com/mitokawaguchi/items/css-variables-design-system' },
  { source: 'Zenn', title: 'TypeScript で堅牢な i18n を設計する', likes: 19, impressions: 612, date: '2025-12-22',
    url: 'https://zenn.dev/mitokawaguchi/articles/typescript-i18n' },
];

/* ────────────────────────────────────────────────────────────────────────
 *  ABOUT セクション — Now Playing / Skills / プロフィール統計 / 拠点
 * ──────────────────────────────────────────────────────────────────────── */
/* Now Playing（演出用ダミー。実際の活動フィードに差し替え可） */
export type Activity = { kind: string; label: string; src: string; icon: string };
export const ACTIVITIES: Activity[] = [
  { kind: 'CODE', label: 'Refining hero section', src: 'mit-tech-studio · main', icon: '⌥' },
  { kind: 'READ', label: 'Next.js App Router で next-intl', src: 'Zenn · @mitokawaguchi', icon: '⌥' },
  { kind: 'LISTEN', label: 'Lo-Fi Programming Beats', src: 'Spotify · 02:14 / 04:36', icon: '♪' },
  { kind: 'BUILD', label: 'Deploy to Vercel · production', src: 'github actions · #2148', icon: '↗' },
  { kind: 'WRITE', label: '"i18n for TypeScript" draft', src: 'Zenn · article-draft-08', icon: '✎' },
];

/* スキル（実データ。score=自己評価、color=アクセント色） */
export type Skill = { label: string; score: number; color: string; stack: string[]; langs: string[] };
export const SKILLS: Skill[] = [
  { label: 'UI/UXデザイン', score: 92, color: C.accent,
    stack: ['Figma', 'デザインシステム', 'プロトタイプ'],
    langs: ['Figma', 'Adobe XD', 'Photoshop', 'Illustrator', 'Framer', 'デザインシステム', 'プロトタイピング', 'Auto Layout', 'Design Tokens', 'アクセシビリティ'] },
  { label: 'フロントエンド開発', score: 88, color: C.warn,
    stack: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React'],
    langs: ['HTML', 'CSS', 'Sass', 'JavaScript', 'TypeScript', 'React', 'Vue', 'Tailwind CSS', 'Framer Motion', 'GSAP', 'Three.js'] },
  { label: 'Webアプリケーション', score: 81, color: C.blue,
    stack: ['Next.js', 'API', '認証', 'DB'],
    langs: ['Next.js', 'Node.js', 'Express', 'REST API', 'GraphQL', 'Prisma', 'PostgreSQL', 'Supabase', 'Auth.js', 'Stripe'] },
  { label: 'テクニカルサポート', score: 76, color: C.purple,
    stack: ['Git', 'CI/CD', 'パフォーマンス', 'アクセシビリティ'],
    langs: ['Git', 'GitHub Actions', 'Docker', 'Vercel', 'CI/CD', 'Vitest', 'Playwright', 'Lighthouse', 'Web Vitals', 'Sentry'] },
];

/* Studio note の本文（実データ） */
export const STUDIO_NOTE = {
  jp: '私たちは、単に美しいだけのサイトはつくりません。課題を解決する「機能美」と、人の心を動かす「体験」を、ひとつに両立させます。',
  en: "We don't just build beautiful websites. We balance functional beauty that solves real problems with experiences that genuinely move people.",
  attribution: '— Mito Kawaguchi · Founder, MIT Tech Studio',
  revision: '2026 · rev.06',
};

/* §02 見出し（スクロールで解像する大見出し） */
export const ABOUT_HEADLINE = 'デザインとエンジニアリングの境界をなくす。';
export const ABOUT_SUBTITLE = 'Bridging design and engineering — one pixel, one function at a time.';

/* プロフィール統計（実データ。Since=開業日 など） */
export type StudioStat = { label: string; value: string; note?: string };
export const STUDIO_STATS: StudioStat[] = [
  { label: 'Since', value: '2025.08.18' },
  { label: 'Engineers', value: '1', note: '+collaborators' },
  { label: 'Tools', value: '12+', note: 'TS · React · Next' },
];

/* 拠点（実データ） */
export const MAP_LOCATION = {
  label: 'HQ · Tokyo, JP',
  coord: '35.68°N 139.69°E',
  ping: 'ping 18ms',
  uptime: 'uptime 99.98%',
};

/* ────────────────────────────────────────────────────────────────────────
 *  CONTACT セクション — 受付状況 / 連絡先チャンネル（実データ）
 * ──────────────────────────────────────────────────────────────────────── */
export const CONTACT_STATUS = 'ACCEPTING-WORK · response < 24h';
export const CONTACT_EMAIL = 'contact@mittechstudio.com';

/* 空き状況（実データ） */
export const CAPACITY = {
  label: 'Capacity · Q2 2026',
  filled: 2,
  total: 3,
  percent: 66, // 進捗バー（filled/total に合わせて調整）
  note: '1 slot available · from 2026.05',
};

/* 連絡先チャンネル（実データ）: [表示テキスト, ドット色] */
export type Channel = [string, string];
export const CONTACT_CHANNELS: Channel[] = [
  ['contact@mittechstudio.com', C.accent],
  ['@mitokawaguchi · GitHub', C.warn],
  ['@mito_112_ · Instagram', C.pink],
  ['@mito_112_ · Threads', C.purple],
  ['Zenn · @mitokawaguchi', C.blue],
  ['Qiita · @mitokawaguchi', C.green],
];

/* ────────────────────────────────────────────────────────────────────────
 *  FOOTER — ブランドマーク下のメタ情報
 * ──────────────────────────────────────────────────────────────────────── */
export const FOOTER_LEGAL_LINKS = [
  'プライバシーポリシー',
  '利用規約',
  '免責事項',
  '特定商取引法に基づく表記',
  'お問い合わせ（窓口）',
  '運営者情報',
];

export const FOOTER_STACK_ITEMS = [
  'Next.js 16 · React 19',
  'TypeScript · Tailwind',
  'Vercel · Edge runtime',
  'next-intl / ja · en',
];

export const FOOTER_COLOPHON = [
  { label: 'Set in', value: 'Geist · Geist Mono · Noto Sans JP' },
  { label: 'Printed on', value: '12-col CSS Grid · 1320 px · 20 gap' },
  { label: 'Built in', value: 'Tokyo · 35.68°N / 139.69°E' },
  { label: 'Revision', value: 'rev. 06 · MMXXVI · build #2148' },
];

/* ビルド情報（実データに合わせて更新） */
export const FOOTER_META = {
  build: 'build #2148',
  commit: 'commit a3f9c12',
  copyright: '© 2026 MIT Tech Studio',
  rights: 'All rights reserved.',
  location: '● Tokyo · 35.68°N',
};
