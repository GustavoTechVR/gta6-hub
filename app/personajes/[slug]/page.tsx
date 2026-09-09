// app/personajes/[slug]/page.tsx
import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getCharacterBySlug } from '@/lib/supabase';

const roleLabels: Record<string, string> = {
  protagonista: 'Protagonista',
  antagonista: 'Antagonista',
  secundario: 'Secundario',
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const character = await getCharacterBySlug(slug);

  if (!character) {
    return { title: 'Personaje no encontrado' };
  }

  return {
    title: character.name,
    description: character.description,
  };
}

export default async function CharacterPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const character = await getCharacterBySlug(slug);

  if (!character) {
    notFound();
  }

  return (
    <article className="grid grid-cols-1 gap-8 md:grid-cols-[300px_1fr]">
      <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg border border-neutral-800 bg-neutral-900">
        {character.image_url && (
          <Image
            src={character.image_url}
            alt={character.name}
            fill
            className="object-cover"
          />
        )}
      </div>

      <div>
        <span className="text-xs uppercase tracking-wide text-emerald-400">
          {character.role ? roleLabels[character.role] : ''}
        </span>
        <h1 className="mt-2 text-3xl font-bold">{character.name}</h1>
        <p className="mt-4 text-neutral-300">{character.description}</p>
      </div>
    </article>
  );
}