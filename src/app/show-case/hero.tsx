
"use client";
import { useEffect, useRef, useState, useMemo } from "react";
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

  const frameCount = 180; // Total number of frames

  // Memoize the images array to prevent re-creation on re-renders
  const images = useMemo(() => {
    const loadedImages: HTMLImageElement[] = [];
    // IMPORTANT: Frames must be placed in the /public/frames/ directory
    // And named sequentially (e.g., frame_001.webp, frame_002.webp, etc.)
    const currentFrame = (index: number) =>
      `/frames/frame_${String(index).padStart(3, "0")}.webp`;

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      loadedImages.push(img);
    }
    return loadedImages;
  }, [frameCount]);

  const imageSeq = useMemo(() => ({ frame: 0 }), []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    canvas.width = 1920;
    canvas.height = 1080;
    
    let loadedImageCount = 0;

    const onImageLoad = () => {
      loadedImageCount++;
      const percent = Math.floor((loadedImageCount / frameCount) * 100);
      setProgress(percent);
      if (loadedImageCount === frameCount) {
        setLoading(false);
        render(); // Render the first frame
      }
    };
    
    images.forEach(img => {
      if (img.complete) {
        onImageLoad();
      } else {
        img.onload = onImageLoad;
        img.onerror = onImageLoad; // Count errors as "loaded" to not block forever
      }
    });

    function render() {
      const frameIndex = Math.floor(imageSeq.frame);
      const img = images[frameIndex];
      if (img && context) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        // Scale the image to fit the canvas while maintaining aspect ratio
        const hRatio = canvas.width / img.width;
        const vRatio = canvas.height / img.height;
        const ratio = Math.max(hRatio, vRatio);
        const centerShift_x = (canvas.width - img.width * ratio) / 2;
        const centerShift_y = (canvas.height - img.height * ratio) / 2;
        context.drawImage(img, 0, 0, img.width, img.height, centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
      }
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "+=3000", // Determines the scroll distance for the animation
        scrub: 1.5,
        pin: true,
        anticipatePin: 1,
        onUpdate: render,
      },
    });

    tl.to(imageSeq, {
      frame: frameCount - 1,
      snap: "frame",
      ease: "none",
    });
    
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

    return () => {
      // Kill all ScrollTriggers created in this effect
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [images, imageSeq, frameCount]);

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
        <canvas ref={canvasRef} className="h-full w-full object-cover brightness-[0.7]" />
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
