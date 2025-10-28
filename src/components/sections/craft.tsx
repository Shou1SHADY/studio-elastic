import type { Dictionary } from '@/lib/dictionaries';
import { Card, CardHeader, CardTitle, CardDescription } from '../ui/card';

export function Craft({ dictionary }: { dictionary: Dictionary }) {
  const craftSteps = [
    { title: dictionary.craft.step1_title, description: dictionary.craft.step1_desc },
    { title: dictionary.craft.step2_title, description: dictionary.craft.step2_desc },
    { title: dictionary.craft.step3_title, description: dictionary.craft.step3_desc },
    { title: dictionary.craft.step4_title, description: dictionary.craft.step4_desc },
  ];

  return (
    <section id="craft" className="container mx-auto px-4 py-16">
      <div className="text-center">
        <h2 className="font-headline text-4xl md:text-5xl font-bold">{dictionary.craft.title}</h2>
        <p className="mt-4 text-lg text-muted-foreground">{dictionary.craft.subtitle}</p>
      </div>

      <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {craftSteps.map((step, index) => (
          <Card key={index} className="bg-primary/50 border-accent/20" data-speed={1 + index * 0.02}>
            <CardHeader>
              <CardTitle className="font-headline text-accent text-2xl">{step.title}</CardTitle>
              <CardDescription className="pt-2 text-foreground/80">{step.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  );
}
