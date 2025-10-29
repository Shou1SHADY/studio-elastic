"use client";

import { useEffect, useState } from 'react';


export default function Loading() {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("Initializing...");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const totalFrames = 100;
    const images: HTMLImageElement[] = [];
    let loadedCount = 0;
    let failedCount = 0;
    const minLoadingTime = 3000;
    const startTime = Date.now();

    // Let UI render first
    requestAnimationFrame(() => startPreload());

    function startPreload() {
      const batchSize = 10;
      let current = 1;

      function loadBatch() {
        for (let i = current; i < current + batchSize && i <= totalFrames; i++) {
          const img = new Image();
          img.crossOrigin = "anonymous";

          img.onload = () => handleFrameLoaded(img);
          img.onerror = () => handleFrameError(i);

          img.src = `/frames/${String(i).padStart(3, "0")}.png`;
          images.push(img);
        }
        current += batchSize;
        if (current <= totalFrames) {
          if ("requestIdleCallback" in window)
            (window as any).requestIdleCallback(loadBatch);
          else setTimeout(loadBatch, 20);
        }
      }

      loadBatch();
    }

    function handleFrameLoaded(img: HTMLImageElement) {
      loadedCount++;
      const p = Math.round((loadedCount / totalFrames) * 100);
      setProgress(p);
      updateText(p);

      if (loadedCount + failedCount >= totalFrames) {
        finishLoading();
      }

      // ✅ as soon as first frame is ready, mark it for Hero to use
      if (loadedCount === 1 && img.complete && img.naturalHeight > 0) {
        (window as any).firstFrame = img;
      }
    }

    function handleFrameError(i: number) {
      failedCount++;
      handleFrameLoaded(new Image());
      console.warn(`Frame ${i} failed`);
    }

    function updateText(p: number) {
      if (p < 20) setLoadingText("Loading cinematic frames...");
      else if (p < 40) setLoadingText("Preparing canvas...");
      else if (p < 60) setLoadingText("Optimizing performance...");
      else if (p < 80) setLoadingText("Finalizing experience...");
      else if (p < 100) setLoadingText("Almost ready...");
      else setLoadingText("Ready to explore!");
    }

    function finishLoading() {
      const elapsed = Date.now() - startTime;
      const readyImages = images.filter(
        (img) => img.complete && img.naturalHeight > 0
      );

      if (readyImages.length >= totalFrames * 0.8) {
        (window as any).preloadedFrames = images;
        (window as any).framesReady = true;
        // ✅ wait until first frame definitely loaded + minimum time
        const firstFrameReady = (window as any).firstFrame?.complete;
        const waitTime = Math.max(0, minLoadingTime - elapsed);

        setTimeout(() => {
          if (firstFrameReady) setIsComplete(true);
          else {
            // recheck until first frame exists
            const check = setInterval(() => {
              if ((window as any).firstFrame?.complete) {
                clearInterval(check);
                setIsComplete(true);
              }
            }, 100);
          }
        }, waitTime);
      } else {
        console.error("Not enough frames loaded, retrying...");
        setTimeout(() => startPreload(), 1000);
      }
    }
  }, []);

  if (isComplete) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-black text-white">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Finalizing experience...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-black via-purple-900/30 to-black flex flex-col items-center justify-center overflow-hidden">
      <div className="relative w-80 h-80 mb-12">
        <div className="absolute inset-0 border-4 border-transparent border-t-purple-500 border-r-purple-400 rounded-full animate-spin"></div>
        <div
          className="absolute inset-4 border-2 border-transparent border-b-cyan-400 border-l-cyan-300 rounded-full animate-spin"
          style={{ animationDirection: "reverse", animationDuration: "1.5s" }}
        />
      </div>

      <h1 className="font-headline text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
        Elastic Canvas
      </h1>

      <p className="text-purple-300 text-lg mb-6">Where Art Meets Rubber</p>

      <div className="w-64">
        <p className="text-white/80 text-sm text-center mb-1">{loadingText}</p>
        <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-500 via-cyan-400 to-purple-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-purple-400 text-xs text-center mt-1">{progress}%</p>
      </div>
    </div>
  );
}
