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
      <div className="relative aspect-[4/3] overflow-hidden">
        <div className="h-full w-full bg-secondary p-4">
          <div className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-background/90 shadow-2xl transition-transform duration-500 group-hover:scale-[1.03]">
            <div className="flex items-center gap-1.5 border-b border-border bg-card px-3 py-2">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
              <span className="ml-2 truncate font-mono text-[10px] text-muted-foreground">
                {work.demoUrl ?? work.repoUrl}
              </span>
            </div>
            <div className="flex flex-1 items-center justify-center p-6">
              <img
                src={work.imageUrl}
                alt={work.title}
                className="max-h-full max-w-full object-contain"
                width={520}
                height={320}
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <div className="absolute inset-0 hidden opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:block">
          <div className="gradient-animate absolute inset-0 opacity-35" />
          <div className="absolute inset-0 bg-black/35" />
          <div className="relative flex h-full w-full items-center justify-center p-4">
            <div className="flex max-w-[90%] flex-wrap justify-center gap-2">
              {work.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md border border-border bg-secondary/80 px-2.5 py-1 text-xs font-medium text-foreground backdrop-blur"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <a
          href={work.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute right-4 top-4 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full bg-primary/90 opacity-0 backdrop-blur transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
          aria-label={`${work.title} ${labels.viewRepo}`}
        >
          <ArrowUpRight className="h-5 w-5 text-primary-foreground" />
        </a>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2">
          <h3 className="text-lg font-semibold text-foreground transition-colors group-hover:text-primary">
            {work.title}
          </h3>
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
