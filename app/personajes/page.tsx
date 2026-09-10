// app/personajes/page.tsx
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getAllCharacters } from '@/lib/supabase';

export const metadata: Metadata = {
  title: 'Personajes de GTA 6',
  description:
    'Conoce a los personajes de Leonida: protagonistas, aliados y antagonistas.',
};

const roleLabels: Record<string, string> = {
  protagonista: 'Protagonista',
  antagonista: 'Antagonista',
  secundario: 'Secundario',
};

export const dynamic = 'force-dynamic';

export default async function PersonajesPage() {
  const characters = await getAllCharacters();

  return (
    <div>
      <h1 className="text-2xl font-bold sm:text-3xl">
        Personaje<span className="text-vice-gradient">s</span>
      </h1>
      <p className="mt-2 max-w-2xl text-neutral-400">
        Conoce a los protagonistas, aliados y antagonistas de Leonida.
      </p>

      {characters.length === 0 ? (
        <p className="mt-8 text-neutral-500">Todavía no hay personajes cargados.</p>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {characters.map((char) => (
            <Link
              key={char.id}
              href={`/personajes/${char.slug}`}
              className="glow-hover group overflow-hidden rounded-lg border border-neutral-800 bg-vice-dark-2/60"
            >
              <div className="relative aspect-[2/3] w-full overflow-hidden bg-neutral-900">
                {char.image_url && (
                  <Image
                    src={char.image_url}
                    alt={char.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                )}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-vice-dark via-transparent to-transparent opacity-60" />
              </div>
              <div className="p-4">
                <span className="text-xs font-semibold uppercase tracking-wide text-vice-cyan">
                  {char.role ? roleLabels[char.role] : ''}
                </span>
                <h3 className="mt-1 font-semibold">{char.name}</h3>
                <p className="mt-1 line-clamp-2 text-sm text-neutral-400">
                  {char.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}