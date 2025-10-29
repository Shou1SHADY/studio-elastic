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
    <div className="container mx-auto px-4 pt-32 pb-16">
      <div className="max-w-3xl mx-auto">
        <h1 className="about-title text-4xl font-headline font-bold mb-8 opacity-0">About Elastic Canvas</h1>
        <p className="about-intro text-lg text-foreground/90 mb-10 opacity-0">
          Elastic Canvas creates premium customized rubber keychains and patches that blend durable materials with thoughtful design.
        </p>
        <div className="about-section space-y-8 opacity-0">
          <section>
            <h2 className="font-headline text-2xl font-bold mb-2">Our Story</h2>
            <p className="text-foreground/80">
              Founded in 2020, we began as a small workshop dedicated to quality and detail. Today, we serve customers worldwide while keeping our craft at the center of everything we do.
            </p>
          </section>
          <section>
            <h2 className="font-headline text-2xl font-bold mb-2">Our Approach</h2>
            <p className="text-foreground/80">
              We combine traditional craftsmanship with modern technology. Each product is carefully designed, molded, and finished by our team.
            </p>
          </section>
          <section>
            <h2 className="font-headline text-2xl font-bold mb-2">Materials</h2>
            <p className="text-foreground/80">
              We use premium-grade rubber and silicone that are durable, flexible, and made to last while maintaining their vibrant colors and details.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
