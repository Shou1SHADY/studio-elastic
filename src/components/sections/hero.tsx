
'use client';
import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Dictionary } from '@/lib/dictionaries';
import { Button } from '../ui/button';
import { ArrowDown } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

gsap.registerPlugin(ScrollTrigger);

const frameCount = 120;
const frameUrl = (frame: number) => `https://picsum.photos/seed/frame${frame}/1920/1080`;

export function Hero({ dictionary }: { dictionary: Dictionary }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const isMobile = useIsMobile();
  
  const scrollTo = (id: string) => {
    gsap.to(window, { duration: 1, scrollTo: id, ease: 'power2.inOut' });
  };

  useEffect(() => {
    if (isMobile) {
      setLoading(false);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;
    
    canvas.width = 1920;
    canvas.height = 1080;
    
    const images: HTMLImageElement[] = [];
    const frame = { current: 0 };
    let loadedImages = 0;

    const render = () => {
      if (images[frame.current]) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(images[frame.current], 0, 0);
      }
    };
    
    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = frameUrl(i + 1);
      images.push(img);
      img.onload = () => {
        loadedImages++;
        setProgress(Math.round((loadedImages / frameCount) * 100));
        if (loadedImages === 1) {
          // Render first frame as soon as it's loaded
          render();
        }
        if (loadedImages === frameCount) {
          setLoading(false);
        }
      };
    }

    const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: '+=250%',
            pin: true,
            scrub: 1,
            anticipatePin: 1,
          },
        });

        tl.to(frame, {
            current: frameCount - 1,
            snap: 'current',
            ease: 'none',
            onUpdate: render,
        }, 0)
        .fromTo('.hero-content', { autoAlpha: 1 }, { autoAlpha: 0, ease: 'none' }, 0);
    }, heroRef);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <section ref={heroRef} id="hero" className="relative h-screen w-full">
      {loading && !isMobile && (
        <div className="absolute inset-0 flex items-center justify-center z-10 bg-background">
          <div className="text-center">
            <p className="font-headline text-lg">Loading Visuals...</p>
            <p className="text-accent">{progress}%</p>
          </div>
        </div>
      )}
      
      {isMobile ? (
        <div className="absolute inset-0">
          <img src={frameUrl(1)} alt="Elastic Canvas background" className="h-full w-full object-cover brightness-50"/>
        </div>
      ) : (
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full object-cover" />
      )}
      
      <div className="hero-content pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center text-center text-white">
        <div className="bg-black/30 backdrop-blur-sm p-8 rounded-lg">
            <h1 className="font-headline text-4xl md:text-7xl font-bold" data-speed="0.95">{dictionary.hero.title}</h1>
            <p className="mt-4 max-w-xl text-lg md:text-xl text-neutral-300" data-speed="0.9">{dictionary.hero.subtitle}</p>
            <Button
                size="lg"
                variant="outline"
                className="mt-8 pointer-events-auto bg-transparent text-white border-white hover:bg-white hover:text-black"
                onClick={() => scrollTo('#about')}
            >
                {dictionary.hero.cta}
                <ArrowDown className="ms-2 h-5 w-5 rtl:hidden"/>
                <ArrowDown className="me-2 h-5 w-5 ltr:hidden -scale-x-100"/>
            </Button>
        </div>
      </div>
    </section>
  );
}
