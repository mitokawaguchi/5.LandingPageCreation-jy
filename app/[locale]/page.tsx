import { MtsLanding } from '@/components/mts-landing';
import { getWritingArticles } from '@/lib/writing-articles';
import { getFeaturedWritingArticles } from '@/utils/writing-articles';

export default async function HomePage() {
  const { articles } = await getWritingArticles();
  const featured = getFeaturedWritingArticles(articles);

  return <MtsLanding articles={featured} />;
}
