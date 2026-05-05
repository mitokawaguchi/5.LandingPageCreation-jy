'use client';

import { BookOpen, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import { WritingArticleCard } from '@/components/writing-article-card';
import type { WritingArticle, WritingArticlesResponse } from '@/types/writing-article';
import { getFeaturedWritingArticles } from '@/utils/writing-articles';

export function WritingSection() {
  const t = useTranslations('writing');
  const { ref, isVisible } = useScrollReveal<HTMLElement>({ threshold: 0.15 });
  const [articles, setArticles] = useState<WritingArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const loadArticles = async (): Promise<void> => {
      try {
        const response = await fetch('/api/articles');
        if (!response.ok) {
          throw new Error(`Article API request failed: ${response.status}`);
        }

        const payload = (await response.json()) as WritingArticlesResponse;
        setArticles(getFeaturedWritingArticles(payload.articles));
      } catch (error) {
        console.error(error);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    void loadArticles();
  }, []);

  const labels = {
    likes: t('likes'),
    impressions: t('impressions'),
    bookmarks: t('bookmarks'),
    readArticle: t('readArticle'),
  };

  return (
    <section ref={ref} id="articles" className="bg-background py-24 md:py-32">
      <div className="container mx-auto px-6">
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span
              className={`text-sm font-semibold uppercase tracking-wide text-accent transition-all duration-700 ${
                isVisible ? 'translate-x-0 opacity-100' : '-translate-x-5 opacity-0'
              }`}
            >
              {t('kicker')}
            </span>
            <h2
              className={`mt-2 text-3xl font-bold tracking-tight text-foreground transition-all delay-100 duration-700 md:text-4xl ${
                isVisible ? 'translate-x-0 opacity-100' : '-translate-x-5 opacity-0'
              }`}
            >
              {t('title')}
            </h2>
            <p className="mt-4 max-w-2xl text-muted-foreground">{t('intro')}</p>
          </div>

          <Link
            href="/articles"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-secondary px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
          >
            <BookOpen className="h-4 w-4" aria-hidden />
            {t('more')}
          </Link>
        </div>

        {isLoading ? (
          <div className="flex items-center gap-2 rounded-2xl border border-border bg-secondary/60 p-6 text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
            {t('loading')}
          </div>
        ) : null}

        {!isLoading && hasError ? (
          <p className="rounded-2xl border border-border bg-secondary/60 p-6 text-muted-foreground">
            {t('error')}
          </p>
        ) : null}

        {!isLoading && !hasError && articles.length === 0 ? (
          <p className="rounded-2xl border border-border bg-secondary/60 p-6 text-muted-foreground">
            {t('empty')}
          </p>
        ) : null}

        {!isLoading && !hasError && articles.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <WritingArticleCard key={article.id} article={article} labels={labels} />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
