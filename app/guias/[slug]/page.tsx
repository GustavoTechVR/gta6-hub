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
      <span className="text-xs uppercase tracking-wide text-emerald-400">
        {guide.category}
      </span>
      <h1 className="mt-2 text-3xl font-bold">{guide.title}</h1>
      <p className="mt-2 text-neutral-400">{guide.description}</p>

      <div
        className="prose prose-invert mt-8 max-w-none"
        dangerouslySetInnerHTML={{ __html: guide.content }}
      />
    </article>
  );
}