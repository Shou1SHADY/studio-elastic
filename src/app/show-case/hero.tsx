"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Dictionary } from "@/lib/dictionaries";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Progress } from "@/components/ui/progress";

gsap.registerPlugin(ScrollTrigger);

// Corrected URL for the publicly accessible frames
const frameUrl = "https://storage.googleapis.com/elastic-canvas-prod-website-assets/frames/";

export function Hero({ dictionary }: { dictionary: Dictionary }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const isMobile = useIsMobile();

  const frameCount = 120; // total number of frames
  const currentFrame = (index: number) =>
    `${frameUrl}frame_${index.toString().padStart(4, "0")}.webp`;

  const scrollTo = (id: string) => {
    gsap.to(window, {
      duration: 1,
      scrollTo: { y: id, autoKill: false },
      ease: "power2.inOut",
    });
  };

  useEffect(() => {
    if (isMobile) {
      setLoading(false);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    
    canvas.width = 1920;
    canvas.height = 1080;

    const images: HTMLImageElement[] = [];
    const imageSeq = { frame: 0 };
    let loadedImages = 0;

    const onImageLoad = () => {
      loadedImages++;
      setProgress((loadedImages / frameCount) * 100);
      if (loadedImages === frameCount) {
        setLoading(false);
        render();
      }
    };

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.crossOrigin = "anonymous"; // Handle potential CORS issues
      img.src = currentFrame(i);
      img.onload = onImageLoad;
      images.push(img);
    }

    function render() {
      if (!images[imageSeq.frame]) return;
      context?.clearRect(0, 0, canvas.width, canvas.height);
      context?.drawImage(images[imageSeq.frame], 0, 0, canvas.width, canvas.height);
    }
    
    images[0].onload = () => {
        onImageLoad(); // Increment counter
        render(); // Render first frame
    };
    
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "+=3000",
            scrub: 1.5,
            pin: true,
            anticipatePin: 1,
        },
    });

    tl.to(imageSeq, {
      frame: frameCount - 1,
      snap: "frame",
      ease: "none",
      onUpdate: render,
    });
    
    // Fade out hero content
    tl.to(".hero-content", {
        opacity: 0,
        y: -100,
        ease: "power1.in"
    }, 0);


    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [isMobile]);

  return (
    <section ref={heroRef} id="home" className="relative h-screen w-full overflow-hidden">
        {isMobile ? (
             <img src={currentFrame(0)} alt="Preview" className="absolute inset-0 h-full w-full object-cover brightness-[0.6]"/>
        ) : (
          <>
            {loading && (
                <div className="absolute inset-0 flex items-center justify-center z-30 bg-background">
                    <div className="w-1/3 text-center">
                    <p className="font-headline text-lg mb-2">Loading Cinematic Frames...</p>
                    <Progress value={progress} />
                    </div>
                </div>
            )}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 h-full w-full object-cover brightness-[0.6]"
            />
          </>
        )}

      <div className="hero-content pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center text-center text-white">
        <div className="bg-black/30 backdrop-blur-sm p-8 rounded-lg">
          <h1 className="font-headline text-4xl md:text-7xl font-bold" data-speed="0.95">
            {dictionary.hero.title}
          </h1>
          <p className="mt-4 max-w-xl text-lg md:text-xl text-neutral-300" data-speed="0.9">
            {dictionary.hero.subtitle}
          </p>
          <Button
            size="lg"
            variant="outline"
            className="mt-8 pointer-events-auto bg-transparent text-white border-white hover:bg-white hover:text-black"
            onClick={() => scrollTo("#about")}
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
