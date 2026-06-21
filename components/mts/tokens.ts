export const sans = 'var(--font-geist), var(--font-noto), system-ui, sans-serif';
export const mono = 'var(--font-geist-mono), monospace';

/**
 * 各セクションの背景写真。`public/mts/` に配置すると反映される。
 * 写真が無い場合は暗いグラデーションのみが表示される（破綻しない）。
 */
export const SECTION_IMAGES = {
  hero: '/mts/hero.jpg',
  about: '/mts/about.jpg',
  works: '/mts/works.jpg',
  writing: '/mts/writing.jpg',
  contact: '/mts/contact.jpg',
} as const;
