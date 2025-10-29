import { getDictionary } from '@/lib/dictionaries';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Contact as ContactSection } from '@/components/sections/contact';

// Server component
export default async function ContactPage({ params }: { params: Promise<{ lang: 'en' | 'ar' }> }) {
  const { lang: langParam } = await params;
  const dictionary = await getDictionary(langParam);

  return (
    <main className="flex min-h-screen flex-col">
      <Header dictionary={dictionary} lang={langParam} />
      <ContactSection dictionary={dictionary} lang={langParam} showMap={true} />
      <Footer dictionary={dictionary} lang={langParam} />
    </main>
  );
}