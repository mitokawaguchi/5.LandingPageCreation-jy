'use client';

import React, { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Menu, X } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { LanguageSwitcher } from '@/components/language-switcher';
import { HomeSectionLink } from '@/components/home-section-link';

export function Header() {
  const t = useTranslations('nav');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'about' as const, label: t('about') },
    { id: 'works' as const, label: t('works') },
    { id: 'lab' as const, label: t('lab') },
    { id: 'contact' as const, label: t('contact') },
  ];

  const linkClass =
    'underline-animate text-sm font-medium text-muted-foreground transition-colors duration-300 hover:text-foreground';
  const mobileLinkClass =
    'block py-2 text-lg font-medium text-muted-foreground transition-colors hover:text-foreground';

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
        isScrolled ? 'glass py-4' : 'bg-transparent py-6'
      }`}
    >
      <nav className="container mx-auto flex items-center justify-between px-6">
        <Link href="/" className="logo-animate group text-2xl font-bold tracking-tight">
          <span className="logo-mit text-foreground transition-colors duration-300">MIT</span>
          <span className="logo-tech text-primary">Tech</span>
          <span className="ml-1 text-sm font-normal text-muted-foreground">Studio</span>
        </Link>

        <ul className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <li key={item.id}>
              <HomeSectionLink sectionId={item.id} className={linkClass}>
                {item.label}
              </HomeSectionLink>
            </li>
          ))}
          <li>
            <LanguageSwitcher />
          </li>
          <li>
            <HomeSectionLink
              sectionId="contact"
              className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-shadow hover:bg-primary/90 hover:shadow-[0_0_24px_rgba(53,106,124,0.45)]"
            >
              {t('getInTouch')}
            </HomeSectionLink>
          </li>
        </ul>

        <div className="flex items-center gap-2 md:hidden">
          <LanguageSwitcher />
          <button
            type="button"
            className="p-2 text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-label={t('toggleMenu')}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      <div
        className={`glass absolute left-0 right-0 top-full overflow-hidden transition-all duration-300 md:hidden ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <ul className="container mx-auto flex flex-col gap-4 px-6 py-6">
          {navItems.map((item) => (
            <li key={item.id}>
              <HomeSectionLink
                sectionId={item.id}
                className={mobileLinkClass}
                onAfterNavigate={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </HomeSectionLink>
            </li>
          ))}
          <li className="pt-4">
            <HomeSectionLink
              sectionId="contact"
              className="inline-block rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-shadow hover:bg-primary/90 hover:shadow-[0_0_24px_rgba(53,106,124,0.45)]"
              onAfterNavigate={() => setIsMobileMenuOpen(false)}
            >
              {t('getInTouch')}
            </HomeSectionLink>
          </li>
        </ul>
      </div>
    </header>
  );
}
