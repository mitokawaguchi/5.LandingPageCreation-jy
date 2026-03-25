'use client';

import type { MouseEvent, ReactNode } from 'react';
import { Link, usePathname } from '@/i18n/navigation';

type SectionId = 'about' | 'works' | 'lab' | 'contact';

type HomeSectionLinkProps = {
  sectionId: SectionId;
  className?: string;
  children: ReactNode;
  onAfterNavigate?: () => void;
};

export function HomeSectionLink({
  sectionId,
  className,
  children,
  onAfterNavigate,
}: HomeSectionLinkProps) {
  const pathname = usePathname();
  const isHome = pathname === '/';

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onAfterNavigate?.();
    if (!isHome) {
      return;
    }
    e.preventDefault();
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    window.history.replaceState(null, '', `#${sectionId}`);
  };

  return (
    <Link href={`/#${sectionId}`} onClick={handleClick} className={className}>
      {children}
    </Link>
  );
}
