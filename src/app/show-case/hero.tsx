
'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Dictionary } from '@/lib/dictionaries';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

gsap.registerPlugin(ScrollTrigger);

const videoUrl =
  'https://firebasestorage.googleapis.com/v0/b/elastic-canvas-prod.appspot.com/o/853878-hd.mp4?alt=media&token=c13035c9-9a18-4b77-963d-47201b3fe7c9';
const posterUrl =
  'https://images.pexels.com/videos/853878/free-video-853878.jpg?auto=compress&cs=tinysrgb&dpr=1&w=500';


export function Hero({ dictionary, lang }: { dictionary: Dictionary; lang: 'en' | 'ar' }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();
  
  const scrollTo = (id: string) => {
    gsap.to(window, {
      duration: 1,
      scrollTo: { y: id, autoKill: false },
      ease: 'power2.inOut',
    });
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video || isMobile) return;

    // Wait for metadata to ensure video.duration is available
    video.onloadedmetadata = () => {
      gsap.to(video, {
        currentTime: video.duration,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: '+=3000', // Determines the scroll distance for the animation
          scrub: 1.5,
          pin: true,
        },
      });

        // Fade content as video plays
        gsap.fromTo(
          ".hero-content",
          { opacity: 1 },
          {
            opacity: 0,
            scrollTrigger: {
              trigger: heroRef.current,
              start: "top top",
              end: "center top",
              scrub: true,
            },
          }
        );
    };


    return () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [isMobile]);


  return (
    <section ref={heroRef} id="home" className="relative h-screen w-full overflow-hidden">
        <video
          ref={videoRef}
          src={videoUrl}
          poster={posterUrl}
          className="absolute inset-0 h-full w-full object-cover"
          playsInline
          muted
          loop={isMobile}
          autoPlay={isMobile}
          preload="auto"
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

