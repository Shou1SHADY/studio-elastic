import { getDictionary } from '@/lib/dictionaries';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import CraftContent from '@/components/page-content/CraftContent';
import SectionBanner from '@/components/sections/shared/SectionBanner';

// Server component
export default async function CraftPage({ params }: { params: Promise<{ lang: 'en' | 'ar' }> }) {
  const { lang: langParam } = await params;
  const dictionary = await getDictionary(langParam);

  return (
    <main className="flex min-h-screen flex-col">
      <Header dictionary={dictionary} lang={langParam} />
      <SectionBanner
        eyebrow="Craft"
        title="Process built for quality"
        subtitle="From design to finishing, our workflow is optimized for consistency and on-time delivery."
        imageSrc="/frames/015.png"
        imageAlt="Manufacturing process"
        align="left"
      />
      <CraftContent dictionary={dictionary} langParam={langParam} />
      <Footer dictionary={dictionary} lang={langParam} />
    </main>
  );
}