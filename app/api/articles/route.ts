import { NextResponse } from 'next/server';
import { getWritingArticles } from '@/lib/writing-articles';

export const revalidate = 3600;

export async function GET(): Promise<NextResponse> {
  const articles = await getWritingArticles();
  return NextResponse.json(articles);
}
