import { getDictionary } from '@/lib/dictionaries';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Hero } from '@/components/sections/hero';
import { About } from '@/components/sections/about';
import { Craft } from '@/components/sections/craft';
import { Gallery } from '@/components/sections/gallery';
import { Contact } from '@/components/sections/contact';
import { Suspense } from 'react';

type Props = {
  params: {
    lang: 'en' | 'ar';
  };
};

export default async function Home({ params: { lang } }: Props) {
  const dictionary = await getDictionary(lang);

  return (
    <>
      <Header dictionary={dictionary} lang={lang} />
      <main>
        <Suspense fallback={<div className="h-screen w-full bg-background" />}>
          <Hero dictionary={dictionary} lang={lang} />
        </Suspense>
        <div className="space-y-32 md:space-y-48">
          <About dictionary={dictionary} />
          <Craft dictionary={dictionary} />
          <Gallery dictionary={dictionary} />
          <Contact dictionary={dictionary} lang={lang} />
        </div>
      </main>
      <Footer dictionary={dictionary} />
    </>
  );
}
