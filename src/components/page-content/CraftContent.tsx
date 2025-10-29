"use client";

import { useGsapScroll } from '@/hooks/use-gsap-scroll';
import { useEffect, useState } from 'react';

export default function CraftContent({ dictionary, langParam }: { dictionary: any, langParam: string }) {
  const { animateElement, variants } = useGsapScroll();
  const [activeStep, setActiveStep] = useState<number | null>(null);

  useEffect(() => {
    animateElement('.craft-title', variants.fadeInUp);
    animateElement('.process-section', variants.fadeInLeft);
    animateElement('.materials-section', { ...variants.fadeInRight, delay: 0.3 });
    animateElement('.process-step', { ...variants.fadeInUp, delay: 0.1 });
    animateElement('.material-item', { ...variants.fadeInUp, delay: 0.1 });
    animateElement('.custom-order-section', { ...variants.fadeInUp, delay: 0.5 });
    animateElement('.order-step', { ...variants.fadeInUp, delay: 0.2 });
  }, []);

  const handleStepHover = (index: number) => {
    setActiveStep(index);
  };

  const handleStepLeave = () => {
    setActiveStep(null);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-background via-background/98 to-accent/5">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      
      <div className="relative container mx-auto px-4 pt-32 pb-16">
        <div className="max-w-6xl mx-auto">
          <h1 className="craft-title text-4xl md:text-5xl font-headline font-bold mb-12 opacity-0 text-center bg-gradient-to-r from-foreground via-accent to-foreground bg-clip-text text-transparent">
            Our Craft
          </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div className="process-section opacity-0 bg-foreground/[0.08] backdrop-blur-sm p-8 rounded-2xl border border-border/30 shadow-xl">
            <h2 className="text-2xl font-headline font-bold mb-6 text-accent">The Process</h2>
            <p className="text-lg mb-6">
              At Elastic Canvas, we take pride in our meticulous crafting process. Each product goes through 
              several stages of design, molding, and finishing to ensure the highest quality.
            </p>
            <ol className="space-y-4">
              {[
                { title: "Design", desc: "We create detailed digital designs that capture your vision." },
                { title: "Mold Creation", desc: "Precision molds are crafted to ensure every detail is captured." },
                { title: "Material Selection", desc: "We choose the perfect rubber or silicone for your specific needs." },
                { title: "Casting", desc: "The material is carefully poured and set to create your product." },
                { title: "Finishing", desc: "Each piece is hand-finished to ensure perfection." }
              ].map((step, index) => (
                <li 
                  key={index} 
                  className={`process-step flex gap-3 opacity-0 transition-all duration-300 ${activeStep === index ? 'scale-105 bg-background/50 p-3 rounded-lg' : ''}`}
                  onMouseEnter={() => handleStepHover(index)}
                  onMouseLeave={handleStepLeave}
                >
                  <span className={`bg-accent/20 text-accent rounded-full w-8 h-8 flex items-center justify-center font-bold transition-all duration-300 ${activeStep === index ? 'bg-accent text-white' : ''}`}>
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="font-medium">{step.title}</h3>
                    <p className="text-foreground/80">{step.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="materials-section bg-foreground/[0.08] backdrop-blur-sm p-8 rounded-2xl border border-border/30 h-fit opacity-0 shadow-xl">
            <h2 className="text-2xl font-headline font-bold mb-6 text-accent">Materials We Use</h2>
            <div className="space-y-6">
              {[
                { title: "Premium Rubber", desc: "Durable and flexible, our rubber products maintain their shape and color for years." },
                { title: "Silicone", desc: "Heat-resistant and extra flexible, perfect for products that need to withstand extreme conditions." },
                { title: "Eco-Friendly Options", desc: "We offer sustainable materials that reduce environmental impact without compromising quality." }
              ].map((material, index) => (
                <div 
                  key={index} 
                  className="material-item opacity-0 transition-all duration-300 hover:bg-accent/5 p-3 rounded-lg cursor-pointer"
                >
                  <h3 className="font-medium text-lg mb-2">{material.title}</h3>
                  <p>{material.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="custom-order-section bg-foreground/[0.08] backdrop-blur-sm p-10 rounded-2xl border border-border/30 opacity-0 shadow-2xl">
          <h2 className="text-2xl font-headline font-bold mb-8 text-center text-accent">Custom Order Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Consultation", desc: "Share your ideas and requirements with our design team." },
              { title: "Design Approval", desc: "Review and approve the digital mockups before production." },
              { title: "Production & Delivery", desc: "We craft your products and deliver them to your doorstep." }
            ].map((step, index) => (
              <div 
                key={index} 
                className="order-step text-center opacity-0 transition-all duration-300 hover:translate-y-[-5px]"
              >
                <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4 transition-all duration-300 hover:bg-accent hover:text-white">
                  <span className="text-accent font-bold text-xl transition-all duration-300 group-hover:text-white">{index + 1}</span>
                </div>
                <h3 className="font-medium mb-2">{step.title}</h3>
                <p className="text-foreground/80">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
