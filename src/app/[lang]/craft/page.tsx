import { getDictionary } from '@/lib/dictionaries';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import CraftContent from '@/components/page-content/CraftContent';

// Server component
export default async function CraftPage({ params }: { params: Promise<{ lang: 'en' | 'ar' }> }) {
  const { lang: langParam } = await params;
  const dictionary = await getDictionary(langParam);

  return (
    <main className="flex min-h-screen flex-col">
      <Header dictionary={dictionary} lang={langParam} />
      <CraftContent dictionary={dictionary} langParam={langParam} />
      <Footer dictionary={dictionary} lang={langParam} />
    </main>
  );
}