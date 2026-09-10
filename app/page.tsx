// app/page.tsx
import Link from 'next/link';
import { getPublishedGuides } from '@/lib/supabase';

export default async function HomePage() {
  const guides = await getPublishedGuides();
  const recentGuides = guides.slice(0, 6);

  return (
    <div>
      <section className="border-b border-vice-pink/15 pb-12">
        <h1 className="text-4xl font-bold sm:text-5xl">
          Todo sobre <span className="text-vice-gradient">GTA 6</span>
        </h1>
        <p className="mt-4 max-w-2xl text-neutral-400">
          Guías, mapa interactivo y análisis de la economía de GTA 6, explicado
          con un enfoque real de finanzas y trading. Contenido actualizado
          antes y después del lanzamiento del 19 de noviembre de 2026.
        </p>
        <div className="mt-8 flex gap-4">
          <Link
            href="/guias"
            className="rounded-md bg-gradient-to-r from-vice-pink to-vice-blue px-6 py-2.5 font-semibold text-white shadow-[0_0_20px_rgba(238,0,221,0.4)] transition-transform hover:scale-105"
          >
            Ver todas las guías
          </Link>
          <Link
            href="/mapa"
            className="rounded-md border border-vice-cyan/50 px-6 py-2.5 font-semibold text-vice-cyan transition-colors hover:bg-vice-cyan/10"
          >
            Explorar el mapa
          </Link>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">Guías recientes</h2>

        {recentGuides.length === 0 ? (
          <p className="mt-4 text-neutral-500">
            Todavía no hay guías publicadas. Agrega una desde Supabase en la
            tabla &quot;guides&quot; con published = true para verla aquí.
          </p>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {recentGuides.map((guide) => (
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
      </section>
    </div>
  );
}