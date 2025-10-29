import { getDictionary } from '@/lib/dictionaries';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import AboutContent from '@/components/page-content/AboutContent';

export default async function AboutPage({ params }: { params: Promise<{ lang: 'en' | 'ar' }> }) {
  const { lang: langParam } = await params;
  const dictionary = await getDictionary(langParam);
  
  return (
    <main className="flex min-h-screen flex-col">
      <Header dictionary={dictionary} lang={langParam} />
      <AboutContent />
      <Footer dictionary={dictionary} lang={langParam} />
    </main>
  );
}