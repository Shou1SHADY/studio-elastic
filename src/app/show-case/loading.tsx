"use client";

import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";

export default function Loading() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const frameCount = 100;
    let loadedCount = 0;
    const images: HTMLImageElement[] = [];

    // Pre-load all frames
    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = `/frames/${String(i).padStart(3, "0")}.png`;

      img.onload = () => {
        loadedCount++;
        images.push(img);
        const percent = Math.round((loadedCount / frameCount) * 100);
        setProgress(percent);

        // Set global flags when first batch is ready
        if (loadedCount >= Math.min(10, frameCount)) {
          (window as any).preloadedFrames = images;
          (window as any).framesReady = true;
          // Store first frame for instant display
          if (images[0]) {
            (window as any).firstFrame = images[0];
          }
        }
      };

      img.onerror = (e) => {
        console.error(`Failed to load frame ${i}:`, e);
        loadedCount++;
        const percent = Math.round((loadedCount / frameCount) * 100);
        setProgress(percent);
      };
    }

    return () => {
      // Cleanup
      images.forEach(img => {
        img.onload = null;
        img.onerror = null;
      });
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex min-h-screen w-full flex-col items-center justify-center bg-background">
      <div className="relative flex flex-col items-center">
        <div className="text-xl font-semibold mb-8">
          {progress === 100 ? "Ready..." : "Loading frames..."}
        </div>
        <div className="w-[300px]">
          <Progress value={progress} className="h-2" />
        </div>
        <div className="mt-2 text-sm text-muted-foreground">
          {progress}%
        </div>
      </div>
    </div>
  );
}