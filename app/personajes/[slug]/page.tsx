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

function splitTagline(description: string) {
  const match = description.match(/^«([^»]+)»\s*(.*)$/s);
  if (!match) {
    return { tagline: null, body: description };
  }
  return { tagline: match[1], body: match[2] };
}

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

  const { tagline, body } = splitTagline(character.description);

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

      <div className="rounded-lg border border-vice-pink/10 bg-vice-dark-2/40 p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs uppercase tracking-wide text-emerald-400">
            {character.role ? roleLabels[character.role] : ''}
          </span>
          {character.is_speculative ? (
            <span className="rounded-full bg-amber-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-amber-400">
              Personaje especulativo — teoría de la comunidad
            </span>
          ) : (
            <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-400">
              Confirmado oficialmente por Rockstar
            </span>
          )}
        </div>

        <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
          <span className="text-vice-gradient">{character.name}</span>
        </h1>

        {tagline && (
          <blockquote className="relative mt-6 border-l-4 border-vice-pink pl-5">
            <span className="pointer-events-none absolute -left-1 -top-4 select-none font-serif text-6xl leading-none text-vice-pink/30">
              &ldquo;
            </span>
            <p className="text-lg italic text-vice-cyan sm:text-xl">
              {tagline}
            </p>
          </blockquote>
        )}

        <p className="mt-5 max-w-2xl text-base leading-relaxed text-neutral-300">
          {body}
        </p>
      </div>
    </article>
  );
}