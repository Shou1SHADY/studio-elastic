
'use client';
import { LanguageSwitcher } from './language-switcher';
import { Dictionary } from '@/lib/dictionaries';
import { gsap } from 'gsap';

const ElasticCanvasLogo = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-foreground">
    <path d="M10 10H30V30H10V10Z" stroke="currentColor" strokeWidth="2"/>
    <path d="M15 15H25V25H15V15Z" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M10 20C10 14.4772 14.4772 10 20 10" stroke="hsl(var(--accent))" strokeWidth="1.5"/>
    <path d="M30 20C30 25.5228 25.5228 30 20 30" stroke="hsl(var(--accent))" strokeWidth="1.5"/>
  </svg>
);

type HeaderProps = {
  dictionary: Dictionary;
  lang: 'en' | 'ar';
};

export function Header({ dictionary, lang }: HeaderProps) {
  const scrollTo = (id: string) => {
    gsap.to(window, { duration: 1, scrollTo: id, ease: 'power2.inOut' });
  };

  const navItems = [
    { id: '#about', label: dictionary.header.about },
    { id: '#craft', label: dictionary.header.craft },
    { id: '#gallery', label: dictionary.header.gallery },
    { id: '#contact', label: dictionary.header.contact },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 p-4">
      <div className="container mx-auto flex items-center justify-between rounded-lg border border-border/20 bg-background/50 p-2 px-4 shadow-lg backdrop-blur-sm">
        <a href="#hero" onClick={(e) => { e.preventDefault(); scrollTo('#hero'); }} className="flex items-center gap-2 font-headline text-lg font-bold">
          <ElasticCanvasLogo />
          <span>Elastic Canvas</span>
        </a>
        <nav className="hidden items-center gap-4 md:flex">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="font-headline text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <LanguageSwitcher currentLocale={lang} />
          {/* Mobile menu could be added here */}
        </div>
      </div>
    </header>
  );
}
