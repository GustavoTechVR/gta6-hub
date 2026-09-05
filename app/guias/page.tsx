// app/page.tsx
import Link from 'next/link';
import { getPublishedGuides } from '@/lib/supabase';

export default async function HomePage() {
  const guides = await getPublishedGuides();
  const recentGuides = guides.slice(0, 6);

  return (
    <div>
      <section className="border-b border-neutral-800 pb-10">
        <h1 className="text-4xl font-bold">
          Todo sobre <span className="text-emerald-400">GTA 6</span>
        </h1>
        <p className="mt-4 max-w-2xl text-neutral-400">
          Guías, mapa interactivo y análisis de la economía de GTA 6, explicado
          con un enfoque real de finanzas y trading. Contenido actualizado
          antes y después del lanzamiento del 19 de noviembre de 2026.
        </p>
        <div className="mt-6 flex gap-4">
          <Link
            href="/guias"
            className="rounded-md bg-emerald-500 px-5 py-2 font-medium text-neutral-950"
          >
            Ver todas las guías
          </Link>
          <Link
            href="/mapa"
            className="rounded-md border border-neutral-700 px-5 py-2 font-medium"
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
                className="rounded-lg border border-neutral-800 p-4 hover:border-emerald-500"
              >
                <span className="text-xs uppercase tracking-wide text-emerald-400">
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