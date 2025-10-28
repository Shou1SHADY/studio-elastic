import type { Dictionary } from '@/lib/dictionaries';

export function About({ dictionary }: { dictionary: Dictionary }) {
  return (
    <section id="about" className="container mx-auto px-4 py-16">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="font-headline text-4xl md:text-5xl font-bold text-foreground">
          {dictionary.about.title}
        </h2>
        <div className="mt-8 space-y-6 text-lg text-muted-foreground">
          <p data-speed="1.05">
            {dictionary.about.paragraph1}
          </p>
          <p data-speed="1.05">
            {dictionary.about.paragraph2}
          </p>
        </div>
      </div>
    </section>
  );
}
