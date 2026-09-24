// components/MapaInteractivo.tsx
'use client';

import { useEffect } from 'react';
import { MapContainer, ImageOverlay, Marker, Popup, useMap } from 'react-leaflet';
import L, { CRS } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { GameLocation } from '@/lib/supabase';

const IMAGE_WIDTH = 1080;
const IMAGE_HEIGHT = 1350;

const bounds = L.latLngBounds([0, 0], [IMAGE_HEIGHT, IMAGE_WIDTH]);

function createIcon() {
  return L.divIcon({
    className: '',
    html: `<div style="
      width: 28px;
      height: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
    ">
      <div style="
        width: 16px;
        height: 16px;
        border-radius: 9999px;
        background: #ee00dd;
        border: 2px solid white;
        box-shadow: 0 0 6px rgba(0,0,0,0.5);
      "></div>
    </div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
  });
}

function FitBounds() {
  const map = useMap();

  useEffect(() => {
    const fit = () => {
      map.invalidateSize();
      const fitZoom = map.getBoundsZoom(bounds, false);
      map.setMinZoom(fitZoom);
      map.setMaxZoom(fitZoom + 2);
      map.setMaxBounds(bounds);
      map.setView(bounds.getCenter(), fitZoom);
    };

    fit();
    window.addEventListener('resize', fit);
    return () => window.removeEventListener('resize', fit);
  }, [map]);

  return null;
}

export default function MapaInteractivo({
  locations,
}: {
  locations: GameLocation[];
}) {
  return (
    <div
      className="relative z-0 mt-6 w-full max-w-full overflow-hidden rounded-lg border border-vice-pink/20 shadow-[0_0_30px_rgba(238,0,221,0.08)]"
      style={{ aspectRatio: `${IMAGE_WIDTH} / ${IMAGE_HEIGHT}` }}
    >
      <MapContainer
        crs={CRS.Simple}
        bounds={bounds}
        style={{ height: '100%', width: '100%', background: '#0a0a0f' }}
        maxBounds={bounds}
        maxBoundsViscosity={1.0}
        scrollWheelZoom={false}
        doubleClickZoom={true}
        touchZoom={true}
        zoomSnap={0.1}
      >
        <FitBounds />
        <ImageOverlay url="/images/mapa-leonida.png" bounds={bounds} />
        {locations.map((loc) => (
          <Marker key={loc.id} position={[loc.lat ?? 0, loc.lng ?? 0]} icon={createIcon()}>
            <Popup maxWidth={240}>
              <div className="text-sm">
                <span className="text-xs font-semibold uppercase text-emerald-500">
                  {loc.category ?? loc.region}
                </span>
                <p className="mt-1 text-neutral-700">{loc.description}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}