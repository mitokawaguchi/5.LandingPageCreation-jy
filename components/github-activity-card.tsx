'use client';

import { Github } from 'lucide-react';
import { LAB_GITHUB_PROFILE, LAB_REPOS } from '@/data/lab-github';

type GithubActivityCardProps = {
  labels: {
    statsRepos: string;
    statsFollowers: string;
    statsFollowing: string;
    commits: string;
    viewProfile: string;
    title: string;
    body: string;
    languagesTitle: string;
    workflowTitle: string;
    monthlyUpdate: string;
    monthlyUpdateBody: string;
    build: string;
    buildBody: string;
    deploy: string;
    deployBody: string;
    projectUnit: string;
  };
  isVisible: boolean;
};

const totalCommits = LAB_REPOS.reduce((sum, repo) => sum + repo.commitsCount, 0);
const languageSummaries = [
  { label: 'TypeScript', count: 1, percent: 50 },
  { label: 'JavaScript', count: 1, percent: 50 },
] as const;

const timelineItems = [
  { titleKey: 'build' as const, bodyKey: 'buildBody' as const, value: 'Next.js 16 / TypeScript' },
  { titleKey: 'deploy' as const, bodyKey: 'deployBody' as const, value: 'Vercel' },
  { titleKey: 'monthlyUpdate' as const, bodyKey: 'monthlyUpdateBody' as const, value: 'GitHub Actions' },
] as const;

export function GithubActivityCard({ labels, isVisible }: GithubActivityCardProps) {
  return (
    <div
      className={`card-glow mb-10 rounded-2xl border border-border bg-secondary/70 p-6 transition-all delay-300 duration-700 md:p-8 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}
    >
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <img
            src={LAB_GITHUB_PROFILE.avatarUrl}
            alt={LAB_GITHUB_PROFILE.displayName}
            width={64}
            height={64}
            className="h-16 w-16 shrink-0 rounded-full border border-border bg-muted object-cover"
            loading="lazy"
            decoding="async"
          />
          <div>
            <p className="text-lg font-semibold text-foreground">{LAB_GITHUB_PROFILE.displayName}</p>
            <p className="font-mono text-sm text-muted-foreground">@{LAB_GITHUB_PROFILE.login}</p>
          </div>
        </div>

        <a
          href={LAB_GITHUB_PROFILE.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-background/80 px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
        >
          <Github className="h-4 w-4" aria-hidden />
          {labels.viewProfile}
        </a>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-xl border border-border bg-background/80 p-5">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <h3 className="text-sm font-semibold text-foreground">{labels.title}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{labels.body}</p>
            </div>
            <Github className="h-5 w-5 text-primary" aria-hidden />
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              [labels.statsRepos, LAB_GITHUB_PROFILE.publicRepos],
              [labels.commits, totalCommits],
              [labels.statsFollowers, LAB_GITHUB_PROFILE.followers],
              [labels.statsFollowing, LAB_GITHUB_PROFILE.following],
            ].map(([label, value]) => (
              <div key={label} className="rounded-lg border border-border bg-secondary/60 p-3">
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className="mt-1 text-xl font-semibold tabular-nums text-foreground">{value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-background/80 p-5">
          <h3 className="text-sm font-semibold text-foreground">{labels.languagesTitle}</h3>
          <div className="mt-5 space-y-4">
            {languageSummaries.map((language) => (
              <div key={language.label}>
                <div className="mb-2 flex items-center justify-between text-xs">
                  <span className="font-medium text-foreground">{language.label}</span>
                  <span className="text-muted-foreground">
                    {language.count} {labels.projectUnit}
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-secondary">
                  <div className="h-full rounded-full bg-primary" style={{ width: `${language.percent}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-xl border border-border bg-background/80 p-5">
        <h3 className="text-sm font-semibold text-foreground">{labels.workflowTitle}</h3>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {timelineItems.map((item, index) => (
            <div key={item.titleKey} className="rounded-lg border border-border bg-secondary/60 p-3">
              <div className="mb-2 flex items-center justify-between gap-2">
                <p className="text-xs font-semibold text-accent">
                  {index + 1}. {labels[item.titleKey]}
                </p>
                <span className="rounded-full bg-primary/15 px-2 py-0.5 font-mono text-[10px] text-primary">
                  {item.value}
                </span>
              </div>
              <p className="text-xs leading-relaxed text-muted-foreground">{labels[item.bodyKey]}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
