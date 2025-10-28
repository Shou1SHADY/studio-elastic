'use client';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Dictionary } from '@/lib/dictionaries';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

gsap.registerPlugin(ScrollTrigger);

const frameCount = 120; // The total number of frames in the sequence
const getFrameUrl = (index: number) =>
  `https://storage.googleapis.com/elastic-canvas-prod-website-assets/frames/frame_${String(index).padStart(3, '0')}.webp`;

export function Hero({ dictionary, lang }: { dictionary: Dictionary; lang: 'en' | 'ar' }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  const scrollTo = (id: string) => {
    gsap.to(window, {
      duration: 1,
      scrollTo: { y: id, autoKill: false },
      ease: 'power2.inOut',
    });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;

    const images: HTMLImageElement[] = [];
    const imageSeq = { frame: 0 };

    let loadedImages = 0;

    const handleImageLoad = () => {
      loadedImages++;
      const loadProgress = Math.round((loadedImages / frameCount) * 100);
      setProgress(loadProgress);
      if (loadedImages === frameCount) {
        setLoading(false);
        // Start rendering and set up GSAP animation once all images are loaded
        render();
        setupAnimation();
      }
    };

    // Preload all frames
    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      // Set crossOrigin to anonymous for images from a different origin to avoid canvas tainting
      img.crossOrigin = "anonymous"; 
      img.src = getFrameUrl(i + 1);
      img.onload = handleImageLoad;
      images.push(img);
    }

    const render = () => {
      if (images[imageSeq.frame]) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(images[imageSeq.frame], 0, 0, canvas.width, canvas.height);
      }
    };
    
    const setupAnimation = () => {
      // GSAP scroll trigger to control the frame animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=3000', // The scroll distance over which the animation will occur
          scrub: 1.5,
          pin: true,
          anticipatePin: 1,
          onUpdate: render, // Re-render the canvas on every scroll update
        },
      });

      tl.to(imageSeq, {
        frame: frameCount - 1,
        snap: 'frame',
        ease: 'none',
        duration: 1,
      });

       // Fade content in and out
       gsap.to(
        ".hero-content",
        {
          opacity: 0,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "center top",
            scrub: true,
          },
        }
      );

      // Refresh ScrollTrigger to make sure positions are calculated correctly
      ScrollTrigger.refresh();
    };

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section ref={containerRef} id="home" className="relative h-screen w-full overflow-hidden">
      {loading && (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-background">
          <div className="w-1/3 text-center">
            <p className="font-headline text-lg text-foreground mb-2">Loading cinematic frames...</p>
            <Progress value={progress} />
          </div>
        </div>
      )}
      <canvas
        ref={canvasRef}
        width={1920}
        height={1080}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="hero-content pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center text-center text-white">
        <div className="bg-black/30 backdrop-blur-sm p-8 rounded-lg">
          <h1
            className="font-headline text-4xl md:text-7xl font-bold"
            data-speed="0.95"
          >
            {dictionary.hero.title}
          </h1>
          <p
            className="mt-4 max-w-xl text-lg md:text-xl text-neutral-300"
            data-speed="0.9"
          >
            {dictionary.hero.subtitle}
          </p>
          <Button
            size="lg"
            variant="outline"
            className="mt-8 pointer-events-auto bg-transparent text-white border-white hover:bg-white hover:text-black"
            onClick={() => scrollTo('#about')}
          >
            {dictionary.hero.cta}
            <ArrowDown className="ms-2 h-5 w-5 rtl:hidden" />
            <ArrowDown className="me-2 h-5 w-5 ltr:hidden -scale-x-100" />
          </Button>
        </div>
      </div>
    </section>
  );
}
