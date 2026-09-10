// app/mapa/page.tsx
import type { Metadata } from 'next';
import { getAllLocations } from '@/lib/supabase';
import MapaLoader from '@/components/MapaLoader';

export const metadata: Metadata = {
  title: 'Mapa interactivo de GTA 6',
  description:
    'Explora las regiones y ubicaciones confirmadas de Leonida en el mapa interactivo de GTA 6.',
};

export const dynamic = 'force-dynamic';

export default async function MapaPage() {
  const locations = await getAllLocations();

  return (
    <div>
      <h1 className="text-2xl font-bold sm:text-3xl">
        Mapa de <span className="text-vice-gradient">Leonida</span>
      </h1>
      <p className="mt-2 max-w-2xl text-neutral-400">
        Explora las regiones confirmadas y rumoreadas de Leonida. Haz clic en
        cada punto para ver más detalles.
      </p>

      <div className="mt-4 flex flex-wrap gap-4 text-xs text-neutral-400">
        <span className="flex items-center gap-1">
          <span className="h-3 w-3 rounded-full bg-vice-cyan" /> Tiendas
        </span>
        <span className="flex items-center gap-1">
          <span className="h-3 w-3 rounded-full bg-amber-400" /> Coleccionables
        </span>
        <span className="flex items-center gap-1">
          <span className="h-3 w-3 rounded-full bg-vice-pink" /> Misiones
        </span>
        <span className="flex items-center gap-1">
          <span className="h-3 w-3 rounded-full bg-vice-blue" /> Eventos
        </span>
      </div>

      <MapaLoader locations={locations} />
    </div>
  );
}