"use client";

import { useEffect, useState, Suspense } from "react";
import { Hero } from "@/app/show-case/hero";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import Loading from "@/app/show-case/loading";
import type { Dictionary } from "@/lib/dictionaries";

type Props = {
  lang: "en" | "ar";
};

export default function HomeClient({ lang }: Props) {
  const [isReady, setIsReady] = useState(false);
  const [dictionary, setDictionary] = useState<Dictionary | null>(null);
  const [frameCount, setFrameCount] = useState(100); // Default fallback
  
  // Calculate spacer height dynamically based on loaded frame count
  const scrollHeightVh = (frameCount * 40) / (typeof window !== 'undefined' ? window.innerHeight / 100 : 10);

  useEffect(() => {
    const loadDictionaryAndFrames = async () => {
      try {
        // Load dictionary
        const res = await fetch(`/api/dictionary/${lang}`);
        if (!res.ok) throw new Error('Failed to load dictionary');
        const dict = await res.json();
        setDictionary(dict);

        // Check for frames
        const checkFrames = setInterval(() => {
          if ((window as any).framesReady && (window as any).preloadedFrames?.length > 0) {
            clearInterval(checkFrames);
            // Set actual frame count from preloaded frames
            const loadedFrameCount = (window as any).preloadedFrames?.length || 100;
            setFrameCount(loadedFrameCount);
            setTimeout(() => setIsReady(true), 300);
          }
        }, 100);

        return () => clearInterval(checkFrames);
      } catch (error) {
        console.error('Error loading dictionary:', error);
      }
    };

    loadDictionaryAndFrames();
  }, [lang]);

  if (!isReady || !dictionary) {
    return <Loading />;
  }

  return (
    <main className="flex min-h-screen flex-col">
      <Header dictionary={dictionary} lang={lang} />
      <Suspense fallback={<div className="h-screen w-full bg-background" />}>
        <Hero dictionary={dictionary} />
      </Suspense>
      
      {/* Spacer to ensure enough scroll height for frame animation */}
      <div style={{ height: `${scrollHeightVh}vh` }} className="pointer-events-none" />

      <Footer dictionary={dictionary} lang={lang} />
    </main>
  );
}