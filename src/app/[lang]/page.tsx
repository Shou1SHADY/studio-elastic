import { getDictionary } from '@/lib/dictionaries';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import MainContent from '@/components/main-content';

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
      <MainContent dictionary={dictionary} lang={lang} />
      <Footer dictionary={dictionary} />
    </>
  );
}
