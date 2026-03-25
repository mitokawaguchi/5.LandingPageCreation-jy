'use client';

import type { LucideIcon } from 'lucide-react';

export interface AboutSkillTileSkill {
  label: string;
  stack: string[];
  icon: LucideIcon;
  color: string;
}

type AboutSkillTileProps = {
  skill: AboutSkillTileSkill;
  isActive: boolean;
  onToggle: () => void;
};

export function AboutSkillTile({ skill, isActive, onToggle }: AboutSkillTileProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={isActive}
      className="relative w-full cursor-default rounded-xl border border-border bg-secondary p-4 text-left card-glow group"
    >
      <div
        className={`pointer-events-none absolute inset-0 z-10 flex items-center justify-center rounded-xl border border-border bg-background/90 p-3 backdrop-blur transition-opacity duration-200 ${
          isActive ? 'opacity-100' : 'opacity-0 md:group-hover:opacity-100'
        }`}
      >
        <div className="flex max-w-[95%] flex-wrap justify-center gap-1.5">
          {skill.stack.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-border bg-secondary/80 px-2 py-0.5 text-[11px] font-medium text-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div
        className={`flex items-center gap-3 transition-opacity duration-200 md:group-hover:opacity-0 ${
          isActive ? 'opacity-0' : ''
        }`}
      >
        <div
          className="flex h-10 w-10 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
          style={{ background: `${skill.color}20` }}
        >
          <skill.icon className="h-5 w-5" style={{ color: skill.color }} />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-medium leading-snug text-foreground transition-colors group-hover:text-primary">
            {skill.label}
          </span>
        </div>
      </div>
    </button>
  );
}
