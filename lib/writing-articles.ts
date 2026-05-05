import type { WritingArticle, WritingArticlesResponse } from '@/types/writing-article';
import { sortWritingArticlesByEngagement } from '@/utils/writing-articles';

type ZennArticle = {
  id: number;
  path: string;
  title: string;
  published_at: string;
  liked_count: number;
  bookmarked_count: number;
};

type QiitaArticle = {
  id: string;
  title: string;
  url: string;
  created_at: string;
  likes_count: number;
  page_views_count?: number | null;
  stocks_count?: number | null;
};

const isRecord = (value: unknown): value is Record<string, unknown> => {
  return typeof value === 'object' && value !== null;
};

const isZennArticle = (value: unknown): value is ZennArticle => {
  if (!isRecord(value)) {
    return false;
  }

  return (
    typeof value.id === 'number' &&
    typeof value.path === 'string' &&
    typeof value.title === 'string' &&
    typeof value.published_at === 'string' &&
    typeof value.liked_count === 'number' &&
    typeof value.bookmarked_count === 'number'
  );
};

const isQiitaArticle = (value: unknown): value is QiitaArticle => {
  if (!isRecord(value)) {
    return false;
  }

  return (
    typeof value.id === 'string' &&
    typeof value.title === 'string' &&
    typeof value.url === 'string' &&
    typeof value.created_at === 'string' &&
    typeof value.likes_count === 'number'
  );
};

const fetchZennArticles = async (): Promise<WritingArticle[]> => {
  const response = await fetch('https://zenn.dev/api/articles?username=mitokawaguchi&order=latest', {
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`Zenn API request failed: ${response.status}`);
  }

  const payload: unknown = await response.json();
  const articles = isRecord(payload) && Array.isArray(payload.articles) ? payload.articles : [];

  return articles.filter(isZennArticle).map((article) => ({
    id: `zenn-${article.id}`,
    platform: 'zenn',
    title: article.title,
    url: `https://zenn.dev${article.path}`,
    publishedAt: article.published_at,
    likesCount: article.liked_count,
    impressionsCount: null,
    bookmarksCount: article.bookmarked_count,
  }));
};

const fetchQiitaArticles = async (): Promise<WritingArticle[]> => {
  const response = await fetch(
    'https://qiita.com/api/v2/users/mitokawaguchi_/items?per_page=20&page=1',
    {
      next: { revalidate: 3600 },
    },
  );

  if (!response.ok) {
    throw new Error(`Qiita API request failed: ${response.status}`);
  }

  const payload: unknown = await response.json();
  const articles = Array.isArray(payload) ? payload : [];

  return articles.filter(isQiitaArticle).map((article) => ({
    id: `qiita-${article.id}`,
    platform: 'qiita',
    title: article.title,
    url: article.url,
    publishedAt: article.created_at,
    likesCount: article.likes_count,
    impressionsCount:
      typeof article.page_views_count === 'number' ? article.page_views_count : null,
    bookmarksCount: typeof article.stocks_count === 'number' ? article.stocks_count : null,
  }));
};

export const getWritingArticles = async (): Promise<WritingArticlesResponse> => {
  const results = await Promise.allSettled([fetchZennArticles(), fetchQiitaArticles()]);

  const articles = results.flatMap((result) => {
    if (result.status === 'fulfilled') {
      return result.value;
    }

    console.error(result.reason);
    return [];
  });

  return {
    articles: sortWritingArticlesByEngagement(articles),
  };
};
