"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

type AnimationOptions = {
  trigger?: string;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  markers?: boolean;
  duration?: number;
  delay?: number;
  ease?: string;
  from?: Record<string, any>;
  to?: Record<string, any>;
  toggleClass?: string;
  toggleActions?: string;
  pin?: boolean;
};

export function useGsapScroll(selector: string = '', options: AnimationOptions = {}) {
  const animationRef = useRef<gsap.core.Tween | null>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);

  // Function to animate elements with a specific variant
  const animateElement = (element: string | Element, variantOptions: AnimationOptions = {}) => {
    if (typeof window === 'undefined') return;
    
    const targetElement = typeof element === 'string' 
      ? document.querySelector(element) 
      : element;
      
    if (!targetElement) return;
    
    const mergedOptions = { ...options, ...variantOptions };
    
    return gsap.fromTo(
      targetElement,
      mergedOptions.from || { opacity: 0, y: 50 },
      {
        ...(mergedOptions.to || { opacity: 1, y: 0 }),
        duration: mergedOptions.duration || 1,
        delay: mergedOptions.delay || 0,
        ease: mergedOptions.ease || 'power2.out',
        scrollTrigger: {
          trigger: targetElement,
          start: mergedOptions.start || 'top 80%',
          end: mergedOptions.end || 'bottom 20%',
          scrub: mergedOptions.scrub || false,
          markers: mergedOptions.markers || false,
          toggleClass: mergedOptions.toggleClass,
          toggleActions: mergedOptions.toggleActions || 'play none none none',
          pin: mergedOptions.pin || false,
        }
      }
    );
  };

  useEffect(() => {
    // Only run on client-side if selector is provided
    if (typeof window === 'undefined' || !selector) return;

    const elements = document.querySelectorAll(selector);
    if (elements.length === 0) return;

    const defaults = {
      trigger: selector,
      start: 'top 80%',
      end: 'bottom 20%',
      scrub: false,
      markers: false,
      duration: 1,
      delay: 0,
      ease: 'power2.out',
      from: { opacity: 0, y: 50 },
      to: { opacity: 1, y: 0 },
    };

    const mergedOptions = { ...defaults, ...options };

    // Create the animation
    elements.forEach((element, index) => {
      const delay = mergedOptions.delay + (index * 0.1);
      
      animationRef.current = gsap.fromTo(
        element,
        mergedOptions.from,
        {
          ...mergedOptions.to,
          duration: mergedOptions.duration,
          delay,
          ease: mergedOptions.ease,
          scrollTrigger: {
            trigger: mergedOptions.trigger ? element : undefined,
            start: mergedOptions.start,
            end: mergedOptions.end,
            scrub: mergedOptions.scrub,
            markers: mergedOptions.markers,
            toggleClass: mergedOptions.toggleClass,
            toggleActions: mergedOptions.toggleActions || 'play none none none',
            pin: mergedOptions.pin,
          }
        }
      );
    });

    // Cleanup function
    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
      }
      if (triggerRef.current) {
        triggerRef.current.kill();
      }
      
      // Kill all ScrollTriggers associated with the selector
      ScrollTrigger.getAll().forEach(trigger => {
        const trg = trigger.vars.trigger as unknown;
        if (!selector) return;
        // If trigger is an Element, use matches
        if (trg instanceof Element && typeof selector === 'string' && trg.matches(selector)) {
          trigger.kill();
          return;
        }
        // If trigger was set by selector string directly, compare strings
        if (typeof trg === 'string' && typeof selector === 'string' && trg === selector) {
          trigger.kill();
        }
      });
    };
  }, [selector, options]);

  // Create variants object that includes all predefined animations
  const variants = {
    fadeIn,
    fadeInUp,
    fadeInDown,
    fadeInLeft,
    fadeInRight,
    zoomIn,
    zoomOut,
    staggered
  };

  return { animationRef, triggerRef, animateElement, variants };
}

// Predefined animation variants
export const fadeIn = {
  from: { opacity: 0 },
  to: { opacity: 1 },
  duration: 1
};

export const fadeInUp = {
  from: { opacity: 0, y: 50 },
  to: { opacity: 1, y: 0 },
  duration: 0.8
};

export const fadeInDown = {
  from: { opacity: 0, y: -50 },
  to: { opacity: 1, y: 0 },
  duration: 0.8
};

export const fadeInLeft = {
  from: { opacity: 0, x: -50 },
  to: { opacity: 1, x: 0 },
  duration: 0.8
};

export const fadeInRight = {
  from: { opacity: 0, x: 50 },
  to: { opacity: 1, x: 0 },
  duration: 0.8
};

export const zoomIn = {
  from: { opacity: 0, scale: 0.8 },
  to: { opacity: 1, scale: 1 },
  duration: 0.8
};

export const zoomOut = {
  from: { opacity: 0, scale: 1.2 },
  to: { opacity: 1, scale: 1 },
  duration: 0.8
};

export const staggered = (staggerAmount = 0.1) => ({
  from: { opacity: 0, y: 30 },
  to: { opacity: 1, y: 0 },
  duration: 0.6,
  stagger: staggerAmount
});