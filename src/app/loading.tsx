"use client";

import { useEffect, useState } from 'react';

export default function Loading() {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Initializing...');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let loadedCount = 0;
    let errorCount = 0;
    const totalFrames = 100;
    const images: HTMLImageElement[] = [];
    let allImagesLoaded = false;
    let minLoadingTime = 3000; // Minimum 6 seconds loading time
    let startTime = Date.now();
    let framesLoaded = false;

    // Start minimum timer immediately
    const minTimer = setTimeout(() => {
      if (framesLoaded) {
        setIsComplete(true);
      }
    }, minLoadingTime);

    // Preload all frames with better error handling and verification
    const preloadFrames = () => {
      const loadPromises: Promise<void>[] = [];
      
      for (let i = 1; i <= totalFrames; i++) {
        const img = new Image();
        img.crossOrigin = "anonymous";
        
        const loadPromise = new Promise<void>((resolve) => {
          img.onload = () => {
            loadedCount++;
            const realProgress = Math.round((loadedCount / totalFrames) * 100);
            setProgress(realProgress);
            
            // Update loading text based on progress
            if (realProgress < 20) {
              setLoadingText('Loading cinematic frames...');
            } else if (realProgress < 40) {
              setLoadingText('Preparing canvas...');
            } else if (realProgress < 60) {
              setLoadingText('Optimizing performance...');
            } else if (realProgress < 80) {
              setLoadingText('Finalizing experience...');
            } else if (realProgress < 100) {
              setLoadingText('Almost ready...');
            }
            
            resolve();
          };
          
          img.onerror = () => {
            errorCount++;
            loadedCount++;
            const realProgress = Math.round((loadedCount / totalFrames) * 100);
            setProgress(realProgress);
            console.warn(`Failed to load frame ${i}`);
            resolve();
          };
        });
        
        img.src = `/frames/${String(i).padStart(3, "0")}.png`;
        images.push(img);
        loadPromises.push(loadPromise);
      }

      // Wait for all images to load (or fail)
      Promise.all(loadPromises).then(() => {
        allImagesLoaded = true;
        setLoadingText('Ready to explore!');
        
        // Verify all images are actually loaded and ready
        const readyImages = images.filter(img => img.complete && img.naturalHeight > 0);
        
        if (readyImages.length >= totalFrames * 0.8) { // Allow 20% error tolerance for faster loading
          // Store images globally for the hero component to use
          (window as any).preloadedFrames = images;
          (window as any).framesReady = true;
          framesLoaded = true;
          
          // Check if minimum time has passed
          const elapsedTime = Date.now() - startTime;
          if (elapsedTime >= minLoadingTime) {
            setIsComplete(true);
          }
          // If not, the minTimer will handle it
        } else {
          // If too many images failed, retry or show error
          console.error(`Only ${readyImages.length}/${totalFrames} frames loaded successfully`);
          setLoadingText('Retrying...');
          setTimeout(() => preloadFrames(), 1000);
        }
      });
    };

    preloadFrames();

    return () => {
      clearTimeout(minTimer);
    };
  }, []);

  // Show loading screen until all frames are loaded
  if (isComplete) {
    // Add a small delay to ensure smooth transition
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-black via-purple-900/30 to-black flex items-center justify-center overflow-hidden">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/80">Finalizing experience...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-black via-purple-900/30 to-black flex items-center justify-center overflow-hidden">
      {/* Background particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center max-w-md mx-auto px-8">
        {/* Main Loading Animation */}
        <div className="relative w-80 h-80 mb-12">
          {/* Outer rotating ring */}
          <div className="absolute inset-0 border-4 border-transparent border-t-purple-500 border-r-purple-400 rounded-full animate-spin"></div>
          
          {/* Middle pulsing ring */}
          <div 
            className="absolute inset-4 border-2 border-transparent border-b-cyan-400 border-l-cyan-300 rounded-full animate-spin" 
            style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}
          ></div>
          
          {/* Inner floating dot */}
          <div 
            className="absolute inset-8 flex items-center justify-center" 
            style={{ animation: 'float 3s ease-in-out infinite' }}
          >
            <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full animate-pulse loading-glow"></div>
          </div>
          
          {/* Floating particles around the main animation */}
          <div className="absolute inset-0">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white/60 rounded-full animate-ping"
                style={{
                  top: `${15 + (i * 7)}%`,
                  left: `${10 + (i * 8)}%`,
                  animationDelay: `${i * 0.15}s`,
                  animationDuration: '2s'
                }}
              />
            ))}
          </div>
          
          {/* Shimmer effect overlay */}
          <div className="absolute inset-0 rounded-full loading-shimmer"></div>
        </div>

        {/* Brand Title */}
        <div className="text-center mb-8">
          <h1 className="font-headline text-4xl md:text-5xl font-bold mb-2">
            <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Elastic Canvas
            </span>
          </h1>
          <p className="text-purple-300 text-lg">
            Where Art Meets Rubber
          </p>
        </div>

        {/* Loading Progress */}
        <div className="w-full max-w-sm">
          <div className="text-center mb-4">
            <p className="text-white/80 text-sm mb-2">{loadingText}</p>
            <p className="text-purple-400 text-xs">{progress}% Complete</p>
          </div>
          
          {/* Progress Bar */}
          <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden mb-4">
            <div 
              className="h-full bg-gradient-to-r from-purple-500 via-cyan-400 to-purple-500 rounded-full transition-all duration-500 ease-out loading-shimmer"
              style={{ width: `${progress}%` }}
            />
          </div>
          
          {/* Progress Dots */}
          <div className="flex justify-center space-x-2">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  (i + 1) * 20 <= progress 
                    ? 'bg-gradient-to-r from-purple-500 to-cyan-400' 
                    : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Loading Tips */}
        <div className="mt-8 text-center">
          <p className="text-gray-400 text-xs max-w-xs">
            Crafting bespoke keychains and patches that tell your story
          </p>
        </div>
      </div>

      {/* Bottom decorative line */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-32 h-0.5 bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
    </div>
  );
}
