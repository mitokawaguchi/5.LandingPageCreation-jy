import { HomePageClient } from '@/components/home-page-client';
import { getWritingArticles } from '@/lib/writing-articles';
import { getFeaturedWritingArticles } from '@/utils/writing-articles';

export default async function HomePage() {
  const { articles } = await getWritingArticles();
  const featured = getFeaturedWritingArticles(articles);

  return <HomePageClient articles={featured} />;
}
