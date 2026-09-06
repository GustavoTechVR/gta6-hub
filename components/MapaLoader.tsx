// components/MapaLoader.tsx
'use client';

import dynamic from 'next/dynamic';
import type { GameLocation } from '@/lib/supabase';

const MapaInteractivo = dynamic(() => import('@/components/MapaInteractivo'), {
  ssr: false,
  loading: () => (
    <div className="mt-6 flex h-[70vh] w-full items-center justify-center rounded-lg border border-neutral-800 text-neutral-500">
      Cargando mapa...
    </div>
  ),
});

export default function MapaLoader({
  locations,
}: {
  locations: GameLocation[];
}) {
  return <MapaInteractivo locations={locations} />;
}