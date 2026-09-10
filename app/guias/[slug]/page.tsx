// app/guias/[slug]/page.tsx
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getGuideBySlug } from '@/lib/supabase';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = await getGuideBySlug(slug);

  if (!guide) {
    return { title: 'Guía no encontrada' };
  }

  return {
    title: guide.title,
    description: guide.description,
  };
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = await getGuideBySlug(slug);

  if (!guide) {
    notFound();
  }

  return (
    <article>
      <span className="text-xs font-semibold uppercase tracking-wide text-vice-cyan">
        {guide.category}
      </span>
      <h1 className="mt-2 text-3xl font-bold sm:text-4xl">{guide.title}</h1>
      <p className="mt-3 max-w-2xl text-neutral-400">{guide.description}</p>

      <div
        className="prose prose-invert prose-headings:text-vice-gradient prose-a:text-vice-cyan mt-8 max-w-none border-t border-vice-pink/10 pt-8"
        dangerouslySetInnerHTML={{ __html: guide.content }}
      />
    </article>
  );
}