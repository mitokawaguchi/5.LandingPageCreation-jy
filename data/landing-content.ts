/**
 * ============================================================================
 *  LANDING CONTENT — トップページ（最新デザイン）の単一編集ポイント
 * ============================================================================
 *  components/mts/ 配下の各セクションが参照する静的データを集約しています。
 *  文言・リンク・数値の差し替えはこのファイルだけで完結します。
 * ============================================================================
 */

export type NavLink = { label: string; href: string };

export const NAV_LINKS: NavLink[] = [
  { label: 'About', href: '#about' },
  { label: 'Works', href: '#works' },
  { label: 'Writing', href: '#writing' },
  { label: 'Contact', href: '#contact' },
];

export type HeroStat = { value: string; label: string };
export const HERO_STATS: HeroStat[] = [
  { value: '2025.08', label: 'SINCE' },
  { value: '1', label: 'ENGINEER +collab' },
];

export type Skill = { label: string; score: number; color: string; stack: string[] };
export const SKILLS: Skill[] = [
  { label: 'UI/UXデザイン', score: 92, color: '#b5fb6b', stack: ['Figma', 'デザインシステム', 'プロトタイプ'] },
  { label: 'フロントエンド開発', score: 88, color: '#ffb648', stack: ['TypeScript', 'React', 'Next.js'] },
  { label: 'Webアプリケーション', score: 81, color: '#5ecfff', stack: ['API', '認証', 'DB'] },
  { label: 'テクニカルサポート', score: 76, color: '#b48cff', stack: ['Git', 'CI/CD', 'A11y'] },
];

export type Work = {
  idx: string;
  name: string;
  lang: string;
  commits: number;
  desc: string;
  url: string;
};
export const WORKS: Work[] = [
  {
    idx: '01',
    name: 'Portfolio Landing',
    lang: 'TypeScript',
    commits: 19,
    desc: 'このポートフォリオサイトのソース。Next.js + TypeScript、カスタムデザインシステム。Vercel にデプロイ。',
    url: 'https://github.com/mitokawaguchi/5.LandingPageCreation-jy',
  },
  {
    idx: '02',
    name: 'TaskFlow',
    lang: 'JavaScript',
    commits: 136,
    desc: 'ドラッグ&ドロップのカンバンボードを備えたタスク管理アプリ。リアルタイム更新、Vercel で公開。',
    url: 'https://taskflow-alpha-ebon.vercel.app',
  },
  {
    idx: '03',
    name: 'Profile README',
    lang: 'Markdown',
    commits: 6,
    desc: 'GitHub プロフィール README。動的スタッツ、コントリビューショングラフ、自動更新スキルバッジ。',
    url: 'https://github.com/mitokawaguchi/mitokawaguchi',
  },
];

export type LandingArticle = {
  source: string;
  color: string;
  icon: string;
  title: string;
  summary: string;
  likes: number;
  impressions: number;
  date: string;
  url: string;
};
export const LANDING_ARTICLES: LandingArticle[] = [
  {
    source: 'Zenn',
    color: '#5ecfff',
    icon: 'https://cdn.simpleicons.org/zenn/5ecfff',
    title: 'Next.js App Router で next-intl を使い倒す',
    summary:
      'App Router 環境での next-intl 導入手順を、ルーティング設計から型安全な翻訳キー、サーバー/クライアント両対応まで実例で解説。',
    likes: 42,
    impressions: 1280,
    date: '2026.02.18',
    url: 'https://zenn.dev/mitokawaguchi/articles/nextjs-next-intl',
  },
  {
    source: 'Qiita',
    color: '#69e6a6',
    icon: 'https://cdn.simpleicons.org/qiita/69e6a6',
    title: 'デザインシステムを CSS Variables だけで構築する',
    summary:
      'フレームワークに依存せず、CSS Variables だけでトークン管理・テーマ切替・ダークモードを実現する設計パターンを紹介。',
    likes: 28,
    impressions: 980,
    date: '2026.01.09',
    url: 'https://qiita.com/mitokawaguchi/items/css-variables-design-system',
  },
  {
    source: 'Zenn',
    color: '#5ecfff',
    icon: 'https://cdn.simpleicons.org/zenn/5ecfff',
    title: 'TypeScript で堅牢な i18n を設計する',
    summary:
      '翻訳キーの型生成と補完を効かせ、抜け漏れをコンパイル時に検出する i18n アーキテクチャを段階的に構築する。',
    likes: 19,
    impressions: 612,
    date: '2025.12.22',
    url: 'https://zenn.dev/mitokawaguchi/articles/typescript-i18n',
  },
];

export type Channel = {
  label: string;
  handle: string;
  url: string;
  icon: string;
  brand: string;
  cta: string;
};
export const CHANNELS: Channel[] = [
  { label: 'GitHub', handle: '@mitokawaguchi', url: 'https://github.com/mitokawaguchi', icon: 'https://cdn.simpleicons.org/github/e9edf2', brand: '#e9edf2', cta: 'リポジトリへ ↗' },
  { label: 'Zenn', handle: '@mitokawaguchi', url: 'https://zenn.dev/mitokawaguchi', icon: 'https://cdn.simpleicons.org/zenn/3EA8FF', brand: '#3EA8FF', cta: '記事を読む ↗' },
  { label: 'Qiita', handle: '@mitokawaguchi', url: 'https://qiita.com/mitokawaguchi', icon: 'https://cdn.simpleicons.org/qiita/55C500', brand: '#55C500', cta: '記事を読む ↗' },
  { label: 'Instagram', handle: '@mito_112_', url: 'https://instagram.com/mito_112_', icon: 'https://cdn.simpleicons.org/instagram/E4405F', brand: '#E4405F', cta: 'フォロー ↗' },
  { label: 'Threads', handle: '@mito_112_', url: 'https://www.threads.net/@mito_112_', icon: 'https://cdn.simpleicons.org/threads/e9edf2', brand: '#e9edf2', cta: 'フォロー ↗' },
  { label: 'X', handle: '@mito_112_', url: 'https://x.com/mito_112_', icon: 'https://cdn.simpleicons.org/x/e9edf2', brand: '#e9edf2', cta: 'フォロー ↗' },
];

export const CONTACT_EMAIL = 'contact@mittechstudio.com';

export type OverviewRow = { label: string; value: string; accent?: boolean };
export const OVERVIEW_ROWS: OverviewRow[] = [
  { label: '屋号', value: 'MIT Tech Studio' },
  { label: '代表', value: 'Mito Kawaguchi' },
  { label: '設立', value: '2025.08' },
  { label: '拠点', value: 'Tokyo, Japan' },
  { label: '事業', value: 'Web開発・デザイン' },
  { label: '連絡', value: CONTACT_EMAIL, accent: true },
];

export const GITHUB = {
  handle: '@mitokawaguchi',
  url: 'https://github.com/mitokawaguchi',
  domain: 'github.com/mitokawaguchi',
  repos: 24,
  stars: 32,
  followers: 18,
  languages: [
    { label: 'TS', pct: 58, color: '#3178c6' },
    { label: 'JS', pct: 34, color: '#f1e05a' },
    { label: 'MD', pct: 8, color: '#6b7480' },
  ],
} as const;

export type MapDot = { x: string; y: string; fill: string; opacity: number };

/** 東京を強調した日本列島のドットマップ（Contact カード裏面の装飾）。 */
export function getMapDots(): MapDot[] {
  const CELL = 6;
  const DOT = 4.6;
  const OFF = (CELL - DOT) / 2;
  const land = [
    '                       #      ',
    '                       #      ',
    '                       ##     ',
    '                       ###   #',
    '                    # ####### ',
    '                    ######### ',
    '                    ##########',
    '                   ########   ',
    '                   ##   ##    ',
    '                   #     #    ',
    '                   # ##       ',
    '                      #       ',
    '                    ####      ',
    '                    ####      ',
    '                   ####       ',
    '                    ###       ',
    '                   ####       ',
    '                   #####      ',
    '                 # ####       ',
    '                  #####       ',
    '              ## ######       ',
    '              # #######       ',
    '             ##########       ',
    '           ###########        ',
    '     ############## ##        ',
    '    ##############  #         ',
    '   ###     ###  #  ##         ',
    '       ###  ###               ',
    ' ##   #### ##                 ',
    '#### ###                      ',
    '####  #                       ',
    ' ###                          ',
    ' ##                           ',
    '  ##                          ',
    '  #                           ',
  ];
  const TX = 20;
  const TY = 22;
  const dots: MapDot[] = [];
  land.forEach((row, ry) => {
    row.split('').forEach((ch, cx) => {
      if (ch !== '#') return;
      const tokyo = cx === TX && ry === TY;
      dots.push({
        x: (cx * CELL + OFF).toFixed(2),
        y: (ry * CELL + OFF).toFixed(2),
        fill: tokyo ? 'var(--accent)' : '#6b7480',
        opacity: tokyo ? 1 : 0.4,
      });
    });
  });
  return dots;
}
