
import type { Dictionary } from '@/lib/dictionaries';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import { Card, CardContent } from '../ui/card';

export function Gallery({ dictionary }: { dictionary: Dictionary }) {
  const images = PlaceHolderImages.slice(0, 6);

  return (
    <section id="gallery" className="animated-section container mx-auto px-4 py-16">
      <div className="text-center">
        <h2 className="font-headline text-4xl md:text-5xl font-bold">{dictionary.gallery.title}</h2>
        <p className="mt-4 text-lg text-muted-foreground">{dictionary.gallery.subtitle}</p>
      </div>
      <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
        {images.map((image, index) => (
          <Card key={image.id} className="overflow-hidden border-accent/20 group" data-speed={1 + index * 0.02}>
            <CardContent className="p-0">
              <Image
                src={image.imageUrl}
                alt={image.description}
                width={600}
                height={400}
                data-ai-hint={image.imageHint}
                className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
