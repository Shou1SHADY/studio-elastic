import { getDictionary } from '@/lib/dictionaries';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  context: { params: { lang: string } }
) {
  try {
    const params = await context.params;
    const dictionary = await getDictionary(params.lang as 'en' | 'ar');
    return NextResponse.json(dictionary);
  } catch (error) {
    return new NextResponse('Error loading dictionary', { status: 500 });
  }
}