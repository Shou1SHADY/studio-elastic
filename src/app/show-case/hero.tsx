"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Dictionary } from "@/lib/dictionaries";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import { Progress } from "@/components/ui/progress";

gsap.registerPlugin(ScrollTrigger);

export function Hero({ dictionary }: { dictionary: Dictionary }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const frameCount = 148;
    const currentFrame = (index: number) =>
      `/frames/${String(index).padStart(2, "0")}.png`;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const images: HTMLImageElement[] = [];
    let loadedImageCount = 0;
    let failedImageCount = 0;

    const onImageLoad = (event: Event) => {
      if (event.type === 'error') {
        failedImageCount++;
        console.error(`Failed to load frame: ${(event.target as HTMLImageElement)?.src}`);
      }

      loadedImageCount++;
      const percent = Math.round((loadedImageCount / frameCount) * 100);
      setProgress(percent);

      if (loadedImageCount === frameCount) {
        if (failedImageCount > 0) {
            console.error(`${failedImageCount} of ${frameCount} frames failed to load. Halting animation.`);
            setLoading(false); // Hide loader but don't start animation
            return;
        }
        setLoading(false);
        render(); // Render the first frame
        setupScrollTrigger();
      }
    };
    
    // Start from 1 to match file names like "01.png"
    for (let i = 1; i <= frameCount; i++) {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = currentFrame(i);
        img.onload = onImageLoad;
        img.onerror = onImageLoad; // Trigger onImageLoad even on error
        images.push(img);
    }
    
    // Adjust imageSeq to be 1-based index if needed, but GSAP progress is 0-1 so array index should be 0-based.
    // Let's keep the array 0-indexed and adjust the frame number for GSAP.
    const imageSeq = { frame: 0 }; 

    function setupScrollTrigger() {
      gsap.to(imageSeq, {
        frame: frameCount - 1,
        snap: "frame",
        ease: "none",
        scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "+=3000", // scroll length
            scrub: 1.5,
            pin: true,
            anticipatePin: 1,
        },
        onUpdate: render,
      });

      // Fade content as video plays
      gsap.fromTo(
        ".hero-content",
        { opacity: 1, y: 0 },
        {
          opacity: 0,
          y: -100,
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }

    function render() {
      const img = images[Math.floor(imageSeq.frame)];
      if (img && context) {
         // Scale image to fit canvas while maintaining aspect ratio
        canvas.width = 1920;
        canvas.height = 1080;
        const hRatio = canvas.width / img.width;
        const vRatio = canvas.height / img.height;
        const ratio = Math.max(hRatio, vRatio);
        if (img.complete && img.naturalHeight > 0) {
            const centerShift_x = (canvas.width - img.width * ratio) / 2;
            const centerShift_y = (canvas.height - img.height * ratio) / 2;
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.drawImage(img, 0, 0, img.width, img.height, centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
        }
      }
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const scrollTo = (id: string) => {
    gsap.to(window, {
      duration: 1,
      scrollTo: { y: id, autoKill: false },
      ease: "power2.inOut",
    });
  };

  return (
    <section ref={heroRef} id="home" className="relative h-screen w-full overflow-hidden">
      {loading && (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-background">
          <div className="w-1/3 text-center">
            <p className="font-headline text-lg mb-2">Loading Cinematic Experience...</p>
            <Progress value={progress} />
          </div>
        </div>
      )}
      <div className="absolute inset-0 z-10 w-full h-full">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full object-cover scale-105 will-change-transform"
        />
      </div>
      <div className="hero-content pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center text-center text-white">
        <div className="bg-black/30 backdrop-blur-sm p-8 rounded-lg">
          <h1 className="font-headline text-4xl md:text-7xl font-bold">
            {dictionary.hero.title}
          </h1>
          <p className="mt-4 max-w-xl text-lg md:text-xl text-neutral-300">
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
