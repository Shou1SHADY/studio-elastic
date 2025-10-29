import { getDictionary } from '@/lib/dictionaries';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import GalleryContent from '@/components/page-content/GalleryContent';
import SectionBanner from '@/components/sections/shared/SectionBanner';

// Server component
export default async function GalleryPage({ params }: { params: Promise<{ lang: 'en' | 'ar' }> }) {
  const { lang: langParam } = await params;
  const dictionary = await getDictionary(langParam);
  
  return (
    <main className="flex min-h-screen flex-col">
      <Header dictionary={dictionary} lang={langParam} />
      <SectionBanner
        eyebrow="Gallery"
        title="Selected work and studies"
        subtitle="A look at materials, forms, and client projects across industries."
        imageSrc="/frames/020.png"
        imageAlt="Gallery preview"
        align="right"
      />
      <GalleryContent dictionary={dictionary} langParam={langParam} />
      <Footer dictionary={dictionary} lang={langParam} />
    </main>
  );
}