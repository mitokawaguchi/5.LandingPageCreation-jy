import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['ja', 'en'],
  defaultLocale: 'ja',
  // as-needed だと /terms と /ja/terms が混在し、戻る・言語切替で履歴と RSC が不整合になりやすい
  localePrefix: 'always',
});

export type AppLocale = (typeof routing.locales)[number];
