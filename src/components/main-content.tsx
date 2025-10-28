
'use client';
import type { Dictionary } from '@/lib/dictionaries';
import { Hero } from './sections/hero';
import { About } from './sections/about';
import { Craft } from './sections/craft';
import { Gallery } from './sections/gallery';
import { Contact } from './sections/contact';
import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

type Props = {
  dictionary: Dictionary;
  lang: 'en' | 'ar';
};

export default function MainContent({ dictionary, lang }: Props) {
    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        
        const sections = gsap.utils.toArray<HTMLElement>('.animated-section');
        
        sections.forEach(section => {
            gsap.fromTo(section, 
                { autoAlpha: 0, y: 50 },
                { 
                    autoAlpha: 1, 
                    y: 0,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 80%',
                        toggleActions: 'play none none none',
                    }
                }
            );
        });
    }, []);

  return (
    <main>
      <Hero dictionary={dictionary} />
      <div className="space-y-32 md:space-y-48">
        <About dictionary={dictionary} />
        <Craft dictionary={dictionary} />
        <Gallery dictionary={dictionary} />
        <Contact dictionary={dictionary} lang={lang} />
      </div>
    </main>
  );
}
