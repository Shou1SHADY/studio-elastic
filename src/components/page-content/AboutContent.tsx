"use client";

import { useGsapScroll } from '@/hooks/use-gsap-scroll';
import { useEffect } from 'react';

export default function AboutContent() {
  const { animateElement, variants } = useGsapScroll();

  useEffect(() => {
    animateElement('.about-title', variants.fadeInUp);
    animateElement('.about-intro', { ...variants.fadeInUp, delay: 0.2 });
    animateElement('.about-section', { ...variants.fadeInUp, delay: 0.1 });
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-background via-background/98 to-accent/5">
      {/* Unified square grid background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      <div className="relative container mx-auto px-4 pt-32 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-foreground/[0.06] backdrop-blur-sm border border-border/30 rounded-2xl p-8 md:p-12 shadow-md">
            <h1 className="about-title text-4xl md:text-5xl font-headline font-bold mb-6 opacity-0 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              About Elastic Canvas
            </h1>
            <p className="about-intro text-lg md:text-xl text-foreground/90 mb-12 opacity-0 leading-relaxed">
              Elastic Canvas creates premium customized rubber keychains and patches that blend durable materials with thoughtful design.
            </p>
            
            <div className="about-section space-y-8 opacity-0">
              <section className="bg-foreground/[0.06] backdrop-blur-sm p-6 rounded-xl border border-border/30 hover:border-accent/30 transition-all duration-300 shadow-sm">
                <h2 className="font-headline text-2xl font-bold mb-3 text-accent">Our Story</h2>
                <p className="text-foreground/80 leading-relaxed">
                  Founded in 2020, we began as a small workshop dedicated to quality and detail. Today, we serve customers worldwide while keeping our craft at the center of everything we do.
                </p>
              </section>
              
              <section className="bg-foreground/[0.06] backdrop-blur-sm p-6 rounded-xl border border-border/30 hover:border-accent/30 transition-all duration-300 shadow-sm">
                <h2 className="font-headline text-2xl font-bold mb-3 text-accent">Our Approach</h2>
                <p className="text-foreground/80 leading-relaxed">
                  We combine traditional craftsmanship with modern technology. Each product is carefully designed, molded, and finished by our team.
                </p>
              </section>
              
              <section className="bg-foreground/[0.06] backdrop-blur-sm p-6 rounded-xl border border-border/30 hover:border-accent/30 transition-all duration-300 shadow-sm">
                <h2 className="font-headline text-2xl font-bold mb-3 text-accent">Materials</h2>
                <p className="text-foreground/80 leading-relaxed">
                  We use premium-grade rubber and silicone that are durable, flexible, and made to last while maintaining their vibrant colors and details.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
