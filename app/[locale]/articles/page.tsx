import { getTranslations } from 'next-intl/server';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { WritingArticleCard } from '@/components/writing-article-card';
import { getWritingArticles } from '@/lib/writing-articles';

type ArticlesPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: ArticlesPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'articlesPage' });
  return {
    title: `${t('title')} | MIT Tech Studio`,
    description: t('description'),
  };
}

export default async function ArticlesPage({ params }: ArticlesPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'articlesPage' });
  const { articles } = await getWritingArticles();
  const labels = {
    likes: t('likes'),
    impressions: t('impressions'),
    bookmarks: t('bookmarks'),
    readArticle: t('readArticle'),
  };

  return (
    <main className="min-h-screen bg-background bg-grid selection:bg-primary selection:text-primary-foreground">
      <Header />
      <section className="container mx-auto px-6 pb-24 pt-32 md:pb-32 md:pt-40">
        <div className="mb-10 max-w-3xl">
          <span className="text-sm font-semibold uppercase tracking-wide text-accent">
            {t('kicker')}
          </span>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-foreground md:text-6xl">
            {t('title')}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{t('intro')}</p>
        </div>

        {articles.length === 0 ? (
          <p className="rounded-2xl border border-border bg-secondary/60 p-6 text-muted-foreground">
            {t('empty')}
          </p>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <WritingArticleCard key={article.id} article={article} labels={labels} />
            ))}
          </div>
        )}
      </section>
      <Footer />
    </main>
  );
}
