// app/personajes/page.tsx
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getAllCharacters } from '@/lib/supabase';

const title = 'Personajes de GTA 6';
const description =
  'Conoce a los personajes de Leonida: protagonistas confirmados, aliados y antagonistas especulativos.';

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: 'website',
    images: [
      {
        url: '/images/guias/jason-lucia.png',
        width: 1200,
        height: 630,
        alt: 'Jason y Lucia, protagonistas de GTA 6',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/images/guias/jason-lucia.png'],
  },
};

const roleLabels: Record<string, string> = {
  protagonista: 'Protagonista',
  antagonista: 'Antagonista',
  secundario: 'Secundario',
};

// Orden fijo deseado. Cualquier personaje nuevo que no esté en esta lista
// se agrega al final, ordenado alfabéticamente por nombre.
const CHARACTER_ORDER = [
  'jason-duval',
  'lucia-caminos',
  'cal-hampton',
  'boobie-ike',
  'drequan-priest',
  'real-dimez',
  'raul-bautista',
  'brian-heder',
];

function sortCharacters<T extends { slug: string; name: string }>(chars: T[]): T[] {
  return [...chars].sort((a, b) => {
    const indexA = CHARACTER_ORDER.indexOf(a.slug);
    const indexB = CHARACTER_ORDER.indexOf(b.slug);
    if (indexA === -1 && indexB === -1) return a.name.localeCompare(b.name);
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;
    return indexA - indexB;
  });
}

function stripTagline(description: string) {
  const match = description.match(/^«([^»]+)»\s*([\s\S]*)$/);
  return match ? match[2] : description;
}

export const dynamic = 'force-dynamic';

export default async function PersonajesPage() {
  const characters = sortCharacters(await getAllCharacters());

  return (
    <div>
      <h1 className="text-2xl font-bold sm:text-3xl">
        Personaje<span className="text-vice-gradient">s</span>
      </h1>
      <p className="mt-2 max-w-2xl text-neutral-400">
        Conoce a los protagonistas confirmados de Leonida, además de aliados
        y antagonistas especulativos imaginados por la comunidad.
      </p>

      {characters.length === 0 ? (
        <p className="mt-8 text-neutral-500">Todavía no hay personajes cargados.</p>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
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
                {char.is_speculative && (
                  <span className="absolute left-2 top-2 rounded-full bg-amber-500/90 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-black">
                    Especulativo
                  </span>
                )}
              </div>
              <div className="p-4">
                <span className="text-xs font-semibold uppercase tracking-wide text-vice-cyan">
                  {char.role ? roleLabels[char.role] : ''}
                </span>
                <h3 className="mt-1 font-semibold">{char.name}</h3>
                <p className="mt-1 line-clamp-2 text-sm text-neutral-400">
                  {stripTagline(char.description)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}