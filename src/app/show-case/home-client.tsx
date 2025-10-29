"use client";

import { useEffect, useState, Suspense } from "react";
import { Hero } from "@/app/show-case/hero";
import { About } from "@/components/sections/about";
import { Craft } from "@/components/sections/craft";
import { Gallery } from "@/components/sections/gallery";
import { Contact } from "@/components/sections/contact";
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
      <div className="space-y-32 md:space-y-48 pb-32 md:pb-48">
        <About dictionary={dictionary} />
        <Craft dictionary={dictionary} />
        <Gallery dictionary={dictionary} />
        <Contact dictionary={dictionary} lang={lang} />
      </div>

      <Footer dictionary={dictionary} lang={lang} />
    </main>
  );
}