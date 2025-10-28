
'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { useIsMobile } from '@/hooks/use-mobile';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin);

export function GsapProvider({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile();

  useEffect(() => {
    // Only run ScrollSmoother on non-mobile devices for better performance
    if (isMobile === false) {
      const smoother = ScrollSmoother.create({
        smooth: 1,
        effects: true,
        smoothTouch: 0.1,
      });

      return () => {
        // Kill the smoother instance on component unmount
        smoother.kill();
      };
    } else {
      // On mobile, just refresh ScrollTrigger
      ScrollTrigger.refresh();
    }
  }, [isMobile]);

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">{children}</div>
    </div>
  );
}
