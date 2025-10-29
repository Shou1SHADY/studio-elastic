"use client";

import Image from 'next/image';
import { useGsapScroll } from '@/hooks/use-gsap-scroll';
import { useEffect, useState } from 'react';

const categoryCycle = ['keychains', 'patches', 'custom'] as const;
const titleCycle = [
  'Canvas Stretch Series',
  'Geometric Patterns',
  'Textured Landscapes',
  'Minimalist Forms',
  'Color Study',
  'Architectural Canvas',
  'Natural Elements',
  'Monochrome Series',
];

const pad3 = (n: number) => n.toString().padStart(3, '0');
const galleryItems = Array.from({ length: 50 }).map((_, i) => {
  const id = i + 1;
  const title = `${titleCycle[i % titleCycle.length]} ${Math.floor(i / titleCycle.length) + 1}`.trim();
  const category = categoryCycle[i % categoryCycle.length];
  return {
    id,
    title,
    category,
    imageUrl: `/frames/${pad3(id)}.png`,
  };
});

export default function GalleryContent({ dictionary, langParam }: { dictionary: any, langParam: string }) {
  const { animateElement, variants } = useGsapScroll();
  const [activeFilter, setActiveFilter] = useState('all');
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const INITIAL_COUNT = 12;
  const INCREMENT = 12;
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  useEffect(() => {
    animateElement('.gallery-title', variants.fadeInUp);
    animateElement('.filter-buttons', { ...variants.fadeInDown, delay: 0.2 });
    animateElement('.gallery-item', { ...variants.fadeInUp, delay: 0.1 });
    animateElement('.load-more-btn', { ...variants.fadeInUp, delay: 0.5 });
  }, []);

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter);
  };

  // Reset visible count when filter changes
  useEffect(() => {
    setVisibleCount(INITIAL_COUNT);
  }, [activeFilter]);

  const handleItemHover = (id: number) => {
    setHoveredItem(id);
  };

  const handleItemLeave = () => {
    setHoveredItem(null);
  };

  return (
    <div className="container mx-auto px-4 pt-32 pb-16">
      <div className="max-w-6xl mx-auto">
        <h1 className="gallery-title text-4xl font-headline font-bold mb-8">Our Gallery</h1>
        
        <div className="filter-buttons flex flex-wrap gap-4 mb-8 justify-center">
          {['all', 'keychains', 'patches', 'custom'].map((filter) => (
            <button 
              key={filter}
              onClick={() => handleFilterClick(filter)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === filter 
                  ? 'bg-foreground text-background scale-105' 
                  : 'bg-background/50 hover:bg-foreground/10'
              }`}
            >
              {filter === 'all' ? 'All Products' : 
               filter === 'keychains' ? 'Keychains' : 
               filter === 'patches' ? 'Patches' : 'Custom Designs'}
            </button>
          ))}
        </div>
        
        {(() => {
          const filtered = activeFilter === 'all' 
            ? galleryItems 
            : galleryItems.filter((i) => i.category === activeFilter);
          const displayed = filtered.slice(0, visibleCount);
          const hasMore = displayed.length < filtered.length;
          return (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {displayed.map((item) => (
                  <div 
                    key={item.id} 
                    className="gallery-item group"
                    onMouseEnter={() => handleItemHover(item.id)}
                    onMouseLeave={handleItemLeave}
                  >
                    <div className={`relative aspect-square overflow-hidden rounded-lg bg-background/50 backdrop-blur-sm border border-border/10 transition-all duration-300 ${hoveredItem === item.id ? 'shadow-lg scale-[1.02]' : ''}`}>
                      <Image
                        src={item.imageUrl}
                        alt={item.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className={`object-cover transition-transform duration-500 ${hoveredItem === item.id ? 'scale-110' : 'group-hover:scale-105'}`}
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t from-background/80 to-transparent transition-all duration-300 flex items-end p-4 ${hoveredItem === item.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                        <div>
                          <h3 className="font-medium text-lg">{item.title}</h3>
                          <p className="text-sm text-foreground/80">{item.category}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {hasMore && (
                <div className="mt-12 text-center">
                  <button
                    onClick={() => setVisibleCount((v) => v + INCREMENT)}
                    className="load-more-btn px-6 py-3 bg-foreground text-background rounded-full font-medium hover:bg-foreground/90 transition-all duration-300 hover:scale-105"
                  >
                    Load More
                  </button>
                </div>
              )}
            </>
          );
        })()}
      </div>
    </div>
  );
}
