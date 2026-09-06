// components/MapaInteractivo.tsx
'use client';

import { useEffect } from 'react';
import { MapContainer, ImageOverlay, Marker, Popup, useMap } from 'react-leaflet';
import L, { CRS, LatLngBoundsExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { GameLocation } from '@/lib/supabase';

const IMAGE_WIDTH = 1024;
const IMAGE_HEIGHT = 1536;

const bounds: LatLngBoundsExpression = [
  [0, 0],
  [IMAGE_HEIGHT, IMAGE_WIDTH],
];

const categoryColors: Record<string, string> = {
  tienda: '#34d399',
  coleccionable: '#fbbf24',
  mision: '#f87171',
  evento: '#60a5fa',
};

function createIcon(category: string | null) {
  const color = categoryColors[category ?? ''] ?? '#a3a3a3';
  return L.divIcon({
    className: '',
    html: `<div style="
      width: 18px;
      height: 18px;
      border-radius: 9999px;
      background: ${color};
      border: 2px solid white;
      box-shadow: 0 0 6px rgba(0,0,0,0.5);
    "></div>`,
    iconSize: [18, 18],
    iconAnchor: [9, 9],
  });
}

function FitBounds() {
  const map = useMap();
  useEffect(() => {
    map.fitBounds(bounds as L.LatLngBoundsExpression);
  }, [map]);
  return null;
}

export default function MapaInteractivo({
  locations,
}: {
  locations: GameLocation[];
}) {
  return (
    <div className="mt-6 h-[70vh] w-full overflow-hidden rounded-lg border border-neutral-800">
      <MapContainer
        crs={CRS.Simple}
        bounds={bounds}
        style={{ height: '100%', width: '100%', background: '#0a0a0a' }}
        maxBoundsViscosity={1.0}
        minZoom={-1}
        maxZoom={2}
      >
        <FitBounds />
        <ImageOverlay url="/images/mapa-leonida.png" bounds={bounds} />
        {locations.map((loc) => (
          <Marker
            key={loc.id}
            position={[loc.lat ?? 0, loc.lng ?? 0]}
            icon={createIcon(loc.category)}
          >
            <Popup>
              <div className="text-sm">
                <span className="text-xs font-semibold uppercase text-emerald-500">
                  {loc.category ?? loc.region}
                </span>
                <h3 className="mt-1 font-bold text-neutral-900">{loc.name}</h3>
                <p className="mt-1 text-neutral-700">{loc.description}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}