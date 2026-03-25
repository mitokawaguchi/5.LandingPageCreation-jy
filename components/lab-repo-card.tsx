'use client';

import { ExternalLink } from 'lucide-react';
import type { LabRepoRecord } from '@/data/lab-github';

type LabRepoCardProps = {
  repo: LabRepoRecord;
  description: string;
  labels: {
    viewRepo: string;
    viewDemo: string;
    language: string;
    openIssues: string;
  };
};

export function LabRepoCard({ repo, description, labels }: LabRepoCardProps) {
  return (
    <article className="card-glow flex flex-col rounded-2xl border border-border bg-secondary/60 p-5">
      <h3 className="font-mono text-base font-semibold text-foreground">{repo.name}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{description}</p>

      <dl className="mt-4 space-y-1 text-xs text-muted-foreground">
        {repo.language ? (
          <div className="flex gap-2">
            <dt className="shrink-0 text-muted-foreground/80">{labels.language}</dt>
            <dd className="text-foreground">{repo.language}</dd>
          </div>
        ) : null}
        {repo.openIssues !== undefined && repo.openIssues > 0 ? (
          <div className="flex gap-2">
            <dt className="shrink-0 text-muted-foreground/80">{labels.openIssues}</dt>
            <dd className="text-foreground">{repo.openIssues}</dd>
          </div>
        ) : null}
      </dl>

      <div className="mt-4 flex flex-wrap gap-2">
        <a
          href={repo.htmlUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-background/80 px-3 py-2 text-xs font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
        >
          <ExternalLink className="h-3.5 w-3.5" aria-hidden />
          {labels.viewRepo}
        </a>
        {repo.homepage ? (
          <a
            href={repo.homepage}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-primary/15 px-3 py-2 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/25"
          >
            <ExternalLink className="h-3.5 w-3.5" aria-hidden />
            {labels.viewDemo}
          </a>
        ) : null}
      </div>
    </article>
  );
}
