import { ArrowUpRight } from 'lucide-react';

export type WorkItemMsg = {
  title: string;
  category: string;
  categoryAlt: string;
  description: string;
  tags: string[];
};

type WorkCardProps = {
  work: WorkItemMsg;
  color: string;
  image: string;
  index: number;
  isVisible: boolean;
};

export function WorkCard({ work, color, image, index, isVisible }: WorkCardProps) {
  return (
    <article
      className={`group card-glow overflow-hidden rounded-2xl border border-border bg-card transition-all duration-500 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt={work.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          width={600}
          height={450}
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

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

        <div className="absolute right-4 top-4 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full bg-primary/90 opacity-0 backdrop-blur transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpRight className="h-5 w-5 text-primary-foreground" />
        </div>
      </div>

      <div className="p-5">
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

        <div className="flex flex-wrap gap-2 md:hidden">
          {work.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-border bg-secondary px-2.5 py-1 text-xs font-medium text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
