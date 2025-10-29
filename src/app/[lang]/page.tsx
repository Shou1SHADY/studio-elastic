
import HomeClient from '@/app/show-case/home-client';

type Props = {
  params: {
    lang: 'en' | 'ar';
  };
};

export default async function Home({ params }: { params: { lang: string } }) {
  const paramsData = await params;
  const lang = paramsData.lang as 'en' | 'ar';        
  return <HomeClient lang={lang} />
}
