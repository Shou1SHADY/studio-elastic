
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
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const frameCount = 100; // Updated to handle 100 frames
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    // 👇 Draw the first preloaded frame instantly if available
    const firstFrame = (window as any).firstFrame;
    if (firstFrame && firstFrame.complete) {
      canvas.width = 1920;
      canvas.height = 1080;
      context.drawImage(firstFrame, 0, 0, canvas.width, canvas.height);
    }

    // Wait for preloaded frames from the loading page
    let images: HTMLImageElement[] = [];
    
    const checkForPreloadedFrames = () => {
      const preloadedFrames = (window as any).preloadedFrames;
      const framesReady = (window as any).framesReady;
      
      if (preloadedFrames && framesReady && preloadedFrames.length >= frameCount) {
        // Use preloaded frames
        images = preloadedFrames;
        
             // Immediate render for faster first appearance
             render(); // Render the first frame immediately
             
             // Pre-render next few frames for smoother scrolling
             for (let i = 1; i <= Math.min(3, frameCount - 1); i++) {
               const img = images[i];
               if (img && img.complete) {
                 const tempFrame = imageSeq.frame;
                 imageSeq.frame = i;
                 render();
                 imageSeq.frame = tempFrame;
               }
             }
             imageSeq.frame = 0; // Reset to first frame
             render(); // Final render of first frame

             setupScrollTrigger();
      } else {
        // Fallback: load frames if not preloaded (with faster loading)
        const currentFrame = (index: number) =>
          `/frames/${String(index).padStart(3, "0")}.png`;
        
        images = [];
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
                return;
            }
            
                 // Immediate render for faster first appearance
                 render();
                 setupScrollTrigger();
          }
        };
        
        // Load frames in parallel for faster loading
        for (let i = 1; i <= frameCount; i++) {
            const img = new Image();
            img.crossOrigin = "anonymous";
            img.src = currentFrame(i);
            img.onload = onImageLoad;
            img.onerror = (event) => onImageLoad(event as Event);
            images.push(img);
        }
      }
    };

    // Check for preloaded frames, with fallback
    if ((window as any).framesReady) {
      checkForPreloadedFrames();
    } else {
      // Wait for frames to be ready, then check again
      const checkInterval = setInterval(() => {
        if ((window as any).framesReady) {
          clearInterval(checkInterval);
          checkForPreloadedFrames();
        }
      }, 10); // Check very frequently for faster response
      
      // Timeout after 2 seconds
      setTimeout(() => {
        clearInterval(checkInterval);
        checkForPreloadedFrames();
      }, 2000);
    }
    
    const imageSeq = { frame: 0 }; 

    function setupScrollTrigger() {
      // Pre-warm the scroll trigger for smoother first scroll
      ScrollTrigger.refresh();
      
      gsap.to(imageSeq, {
        frame: frameCount - 1,
        snap: "frame",
        ease: "none",
        scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "+=2000", // increased scroll length for 100 frames
            scrub: 0.2, // cinematic scrub for smooth frame progression
            pin: true,
            anticipatePin: 1,
            onRefresh: () => {
              // Ensure smooth first scroll by pre-rendering
              render();
            }
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
      if (img && context && canvas && img.complete && img.naturalHeight > 0) {
        // Only resize canvas once, not on every render
        if (canvas.width !== 1920 || canvas.height !== 1080) {
          canvas.width = 1920;
          canvas.height = 1080;
        }
        
        // Pre-calculate ratios for better performance
        const hRatio = canvas.width / img.width;
        const vRatio = canvas.height / img.height;
        const ratio = Math.max(hRatio, vRatio);
        
        // Calculate positions once
        const scaledWidth = img.width * ratio;
        const scaledHeight = img.height * ratio;
        const centerShift_x = (canvas.width - scaledWidth) / 2;
        const centerShift_y = (canvas.height - scaledHeight) / 2;
        
        // Clear and draw in one operation
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(img, 0, 0, img.width, img.height, centerShift_x, centerShift_y, scaledWidth, scaledHeight);
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
