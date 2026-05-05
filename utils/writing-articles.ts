import type { WritingArticle } from '@/types/writing-article';

const getEngagementScore = (article: WritingArticle): number => {
  return Math.max(article.likesCount, article.impressionsCount ?? 0);
};

export const sortWritingArticlesByEngagement = (
  articles: WritingArticle[],
): WritingArticle[] => {
  return [...articles].sort((firstArticle, secondArticle) => {
    const scoreDiff = getEngagementScore(secondArticle) - getEngagementScore(firstArticle);
    if (scoreDiff !== 0) {
      return scoreDiff;
    }

    return (
      new Date(secondArticle.publishedAt).getTime() -
      new Date(firstArticle.publishedAt).getTime()
    );
  });
};

export const getFeaturedWritingArticles = (
  articles: WritingArticle[],
  limit = 3,
): WritingArticle[] => {
  return sortWritingArticlesByEngagement(articles).slice(0, limit);
};
