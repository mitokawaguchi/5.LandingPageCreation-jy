import { ArrowUpRight } from 'lucide-react';

export type WorkItemMsg = {
  title: string;
  category: string;
  categoryAlt: string;
  description: string;
  tags: string[];
  repoUrl: string;
  demoUrl: string | null;
  imageUrl: string;
};

type WorkCardProps = {
  work: WorkItemMsg;
  color: string;
  index: number;
  isVisible: boolean;
  labels: {
    viewRepo: string;
    viewDemo: string;
  };
};

export function WorkCard({ work, color, index, isVisible, labels }: WorkCardProps) {
  return (
    <article
      className={`group card-glow flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-500 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-secondary p-4">
        <div className="flex h-full items-center justify-center rounded-xl border border-border bg-background transition-transform duration-300 group-hover:scale-[1.01]">
          <img
            src={work.imageUrl}
            alt={work.title}
            className="max-h-full max-w-full object-contain p-4"
            width={520}
            height={320}
            loading="lazy"
            decoding="async"
          />
        </div>
        <a
          href={work.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/90 transition-colors duration-200 hover:border-primary hover:text-primary"
          aria-label={`${work.title} ${labels.viewRepo}`}
        >
          <ArrowUpRight className="h-5 w-5" />
        </a>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2">
          <h3 className="text-lg font-semibold text-foreground">{work.title}</h3>
          <span
            className="rounded-full px-2 py-0.5 text-xs font-medium"
            style={{ background: `${color}20`, color }}
            title={work.categoryAlt}
          >
            {work.category}
          </span>
        </div>

        <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">{work.description}</p>

        <div className="flex flex-wrap gap-2">
          {work.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-border bg-secondary px-2.5 py-1 text-xs font-medium text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          <a
            href={work.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background/80 px-3 py-2 text-xs font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
          >
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
            {labels.viewRepo}
          </a>
          {work.demoUrl ? (
            <a
              href={work.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-primary/15 px-3 py-2 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/25"
            >
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
              {labels.viewDemo}
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
