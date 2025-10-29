
'use client';
import { LanguageSwitcher } from './language-switcher';
import { Dictionary } from '@/lib/dictionaries';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

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
  const pathname = usePathname();
  const currentPath = pathname.split('/').pop() || '';
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: `/${lang}`, label: dictionary.header.home, path: '' },
    { href: `/${lang}/about`, label: dictionary.header.about, path: 'about' },
    { href: `/${lang}/craft`, label: dictionary.header.craft, path: 'craft' },
    { href: `/${lang}/gallery`, label: dictionary.header.gallery, path: 'gallery' },
    { href: `/${lang}/contact`, label: dictionary.header.contact, path: 'contact' },
  ];

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      isScrolled ? "py-2" : "py-6"
    )}>
      <div className={cn(
        "container mx-auto flex items-center justify-between px-4",
        isScrolled ? "bg-background/90 shadow-lg backdrop-blur-md rounded-lg border border-border/10" : "bg-transparent"
      )}>
        <Link href={`/${lang}`} className="flex items-center gap-2 font-headline text-lg font-bold py-3">
          <ElasticCanvasLogo />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
            Elastic Canvas
          </span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center">
          <div className="flex space-x-1 bg-background/50 backdrop-blur-sm rounded-full px-2 py-1 border border-border/10">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative px-4 py-2 font-headline text-sm font-medium transition-all duration-200 rounded-full",
                  currentPath === item.path 
                    ? "text-background bg-foreground" 
                    : "text-foreground hover:bg-foreground/10"
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
        
        <div className="flex items-center gap-4">
          <LanguageSwitcher currentLocale={lang} />
          
          {/* Mobile menu button */}
          <button 
            className="lg:hidden p-2 rounded-full bg-foreground/10 hover:bg-foreground/20 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-lg border-t border-border/10 shadow-lg">
          <nav className="container mx-auto py-4 px-4 flex flex-col space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-4 py-3 font-headline text-sm font-medium transition-colors rounded-lg",
                  currentPath === item.path 
                    ? "bg-foreground text-background" 
                    : "text-foreground hover:bg-foreground/10"
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
