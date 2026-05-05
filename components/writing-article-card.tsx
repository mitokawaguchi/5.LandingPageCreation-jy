import { Bookmark, ExternalLink, Eye, Heart } from 'lucide-react';
import type { WritingArticle } from '@/types/writing-article';

type WritingArticleCardProps = {
  article: WritingArticle;
  labels: {
    likes: string;
    impressions: string;
    bookmarks: string;
    readArticle: string;
  };
};

const platformClassMap = {
  zenn: 'border-blue-400/30 bg-blue-400/10 text-blue-200',
  qiita: 'border-green-400/30 bg-green-400/10 text-green-200',
} as const;

const formatCount = (value: number | null): string => {
  if (value === null) {
    return '-';
  }

  return new Intl.NumberFormat('en-US').format(value);
};

export function WritingArticleCard({ article, labels }: WritingArticleCardProps) {
  return (
    <article className="card-glow flex h-full flex-col rounded-2xl border border-border bg-secondary/70 p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <span
          className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
            platformClassMap[article.platform]
          }`}
        >
          {article.platform}
        </span>
        <time dateTime={article.publishedAt} className="text-xs text-muted-foreground">
          {new Intl.DateTimeFormat('ja-JP').format(new Date(article.publishedAt))}
        </time>
      </div>

      <h3 className="flex-1 text-lg font-semibold leading-relaxed text-foreground">{article.title}</h3>

      <dl className="mt-5 grid grid-cols-3 gap-2 text-xs text-muted-foreground">
        <div className="rounded-xl border border-border bg-background/70 p-3">
          <dt className="mb-1 flex items-center gap-1">
            <Heart className="h-3.5 w-3.5" aria-hidden />
            {labels.likes}
          </dt>
          <dd className="font-semibold tabular-nums text-foreground">
            {formatCount(article.likesCount)}
          </dd>
        </div>
        <div className="rounded-xl border border-border bg-background/70 p-3">
          <dt className="mb-1 flex items-center gap-1">
            <Eye className="h-3.5 w-3.5" aria-hidden />
            {labels.impressions}
          </dt>
          <dd className="font-semibold tabular-nums text-foreground">
            {formatCount(article.impressionsCount)}
          </dd>
        </div>
        <div className="rounded-xl border border-border bg-background/70 p-3">
          <dt className="mb-1 flex items-center gap-1">
            <Bookmark className="h-3.5 w-3.5" aria-hidden />
            {labels.bookmarks}
          </dt>
          <dd className="font-semibold tabular-nums text-foreground">
            {formatCount(article.bookmarksCount)}
          </dd>
        </div>
      </dl>

      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-background/80 px-4 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
      >
        <ExternalLink className="h-4 w-4" aria-hidden />
        {labels.readArticle}
      </a>
    </article>
  );
}
