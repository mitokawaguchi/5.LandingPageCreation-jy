export type ArticlePlatform = 'zenn' | 'qiita';

export type WritingArticle = {
  id: string;
  platform: ArticlePlatform;
  title: string;
  url: string;
  publishedAt: string;
  likesCount: number;
  impressionsCount: number | null;
  bookmarksCount: number | null;
};

export type WritingArticlesResponse = {
  articles: WritingArticle[];
};
