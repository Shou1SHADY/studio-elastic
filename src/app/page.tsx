import { getDictionary } from '@/lib/dictionaries';
import { AnimatedContent } from '@/components/animated-content';
import { Hero } from '@/components/sections/hero';
import { About } from '@/components/sections/about';
import { Craft } from '@/components/sections/craft';
import { Gallery } from '@/components/sections/gallery';
import { Contact } from '@/components/sections/contact';

type Props = {
  params: {
    lang: 'en' | 'ar';
  };
};

export default async function Home({ params: { lang } }: Props) {
  const dictionary = await getDictionary(lang);

  return (
    <main>
      <Hero dictionary={dictionary} />
      <div className="space-y-32 md:space-y-48">
        <About dictionary={dictionary} />
        <AnimatedContent>
          <Craft dictionary={dictionary} />
        </AnimatedContent>
        <AnimatedContent>
          <Gallery dictionary={dictionary} />
        </AnimatedContent>
        <AnimatedContent>
          <Contact dictionary={dictionary} lang={lang} />
        </AnimatedContent>
      </div>
    </main>
  );
}
