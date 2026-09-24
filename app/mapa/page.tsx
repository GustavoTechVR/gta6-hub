// app/mapa/page.tsx
import type { Metadata } from 'next';
import { getAllLocations } from '@/lib/supabase';
import MapaLoader from '@/components/MapaLoader';

export const metadata: Metadata = {
  title: 'Mapa interactivo de GTA 6',
  description:
    'Explora las 7 regiones confirmadas de Leonida en el mapa interactivo de GTA 6: Vice City, Leonida Keys, Grassrivers, Port Gellhorn, Ambrosia, Mount Kalaga y The Everglades.',
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
        Bienvenido a Leonida: un estado enorme y lleno de vida, inspirado en
        Florida y mucho más. Haz clic en cada región para ver más detalles.
      </p>

      <MapaLoader locations={locations} />
    </div>
  );
}