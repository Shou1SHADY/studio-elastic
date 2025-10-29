import { getDictionary } from '@/lib/dictionaries';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import AboutContent from '@/components/page-content/AboutContent';
import SectionBanner from '@/components/sections/shared/SectionBanner';
import ContentWithImage from '@/components/sections/shared/ContentWithImage';
import StatsStrip from '@/components/sections/shared/StatsStrip';

export default async function AboutPage({ params }: { params: Promise<{ lang: 'en' | 'ar' }> }) {
  const { lang: langParam } = await params;
  const dictionary = await getDictionary(langParam);
  
  return (
    <main className="flex min-h-screen flex-col">
      <Header dictionary={dictionary} lang={langParam} />
      <SectionBanner
        eyebrow="About"
        title="Where craft meets precision"
        subtitle="Premium customized rubber keychains and patches for brands that value quality, consistency, and on-time delivery."
        imageSrc="/frames/010.png"
        imageAlt="Crafted rubber product"
        align="right"
      />
      <AboutContent />
      <ContentWithImage
        eyebrow="Our Story"
        title="Built for reliability and scale"
        body="We help brands and distributors deliver consistent quality at predictable lead times. Our team combines design expertise with modern manufacturing to support your procurement workflows."
        bullets={[
          'On-time delivery and responsive communication',
          'Consistent production quality and color fidelity',
          'Flexible MOQs for pilots and scale-ups',
        ]}
        imageSrc="/frames/025.png"
        imageAlt="Workshop"
        imageSide="left"
      />
      <StatsStrip
        stats={[
          { label: 'On-time delivery', value: '98%' },
          { label: 'Avg. lead time', value: '7–10d' },
          { label: 'Repeat clients', value: '72%' },
          { label: 'Defect rate', value: '< 0.5%' },
        ]}
      />
      <Footer dictionary={dictionary} lang={langParam} />
    </main>
  );
}