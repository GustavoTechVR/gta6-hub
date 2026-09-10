// app/guias/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { getPublishedGuides } from '@/lib/supabase';

export const metadata: Metadata = {
  title: 'Todas las guías de GTA 6',
  description:
    'Guías completas de GTA 6: economía, mapa, misiones, personajes y coleccionables.',
};

const categories = [
  { key: 'economia', label: 'Economía' },
  { key: 'mapa', label: 'Mapa' },
  { key: 'personajes', label: 'Personajes' },
  { key: 'misiones', label: 'Misiones' },
  { key: 'coleccionables', label: 'Coleccionables' },
];

export const dynamic = 'force-dynamic';

export default async function GuidesPage({
  searchParams,
}: {
  searchParams: Promise<{ categoria?: string }>;
}) {
  const { categoria: activeCategory } = await searchParams;
  const guides = await getPublishedGuides(activeCategory);

  return (
    <div>
      <h1 className="text-2xl font-bold sm:text-3xl">
        Guía<span className="text-vice-gradient">s</span>
      </h1>

      <div className="mt-6 flex flex-wrap gap-2">
        <Link
          href="/guias"
          className={`rounded-full border px-4 py-1 text-sm transition-colors ${
            !activeCategory
              ? 'border-vice-pink bg-vice-pink/10 text-vice-pink'
              : 'border-neutral-700 text-neutral-400 hover:border-vice-cyan/50 hover:text-vice-cyan'
          }`}
        >
          Todas
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat.key}
            href={`/guias?categoria=${cat.key}`}
            className={`rounded-full border px-4 py-1 text-sm transition-colors ${
              activeCategory === cat.key
                ? 'border-vice-pink bg-vice-pink/10 text-vice-pink'
                : 'border-neutral-700 text-neutral-400 hover:border-vice-cyan/50 hover:text-vice-cyan'
            }`}
          >
            {cat.label}
          </Link>
        ))}
      </div>

      {guides.length === 0 ? (
        <p className="mt-8 text-neutral-500">
          No hay guías en esta categoría todavía.
        </p>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {guides.map((guide) => (
            <Link
              key={guide.id}
              href={`/guias/${guide.slug}`}
              className="glow-hover rounded-lg border border-neutral-800 bg-vice-dark-2/60 p-4"
            >
              <span className="text-xs font-semibold uppercase tracking-wide text-vice-cyan">
                {guide.category}
              </span>
              <h3 className="mt-2 font-semibold">{guide.title}</h3>
              <p className="mt-1 line-clamp-2 text-sm text-neutral-400">
                {guide.description}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}