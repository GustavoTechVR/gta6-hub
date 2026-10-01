// components/MapaInteractivo.tsx
'use client';

import { useEffect } from 'react';
import { MapContainer, ImageOverlay, Marker, Popup, useMap } from 'react-leaflet';
import L, { CRS } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { GameLocation } from '@/lib/supabase';

const IMAGE_WIDTH = 3840;
const IMAGE_HEIGHT = 4800;

const bounds = L.latLngBounds([0, 0], [IMAGE_HEIGHT, IMAGE_WIDTH]);
const panBounds = bounds.pad(0.15); // 15% de colchon para que el popup pueda hacer auto-pan

// Color por region, elegido segun su tematica visual
const REGION_COLORS: Record<string, string> = {
  'vice-city': '#ee00dd', // rosa neon: la ciudad
  'leonida-keys': '#00e5ff', // turquesa: aguas tropicales
  grassrivers: '#22c55e', // verde: el pantano
  'port-gellhorn': '#f59e0b', // ambar: costa decadente
  ambrosia: '#eab308', // dorado: cana de azucar
  'mount-kalaga': '#94a3b8', // gris azulado: montana/piedra
};

const DEFAULT_COLOR = '#ee00dd';

function createIcon(color: string) {
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
        background: ${color};
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
      map.setMaxZoom(fitZoom + 3);
      map.setMaxBounds(panBounds);
      map.setView(bounds.getCenter(), fitZoom, { animate: false });
    };

    // Recalcula apenas el contenedor tenga su tamano real, no solo al cambiar
    // el tamano de la ventana. Esto evita que el mapa quede "pegado" en un
    // zoom incorrecto si el layout todavia no habia terminado de acomodarse.
    const container = map.getContainer();
    const resizeObserver = new ResizeObserver(() => fit());
    resizeObserver.observe(container);

    fit();
    window.addEventListener('orientationchange', fit);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('orientationchange', fit);
    };
  }, [map]);

  return null;
}

export default function MapaInteractivo({
  locations,
}: {
  locations: GameLocation[];
}) {
  return (
    <div className="map-frame relative z-0 mt-6 overflow-hidden border-vice-pink/20 shadow-[0_0_30px_rgba(238,0,221,0.08)]">
      <MapContainer
        crs={CRS.Simple}
        bounds={bounds}
        minZoom={-10}
        maxZoom={10}
        style={{ height: '100%', width: '100%', background: '#0a0a0f' }}
        maxBounds={panBounds}
        maxBoundsViscosity={1.0}
        scrollWheelZoom={false}
        doubleClickZoom={true}
        touchZoom={true}
        zoomSnap={0.1}
      >
        <FitBounds />
        <ImageOverlay url="/images/mapa-leonida.png" bounds={bounds} />
        {locations.map((loc) => (
          <Marker
            key={loc.id}
            position={[loc.lat ?? 0, loc.lng ?? 0]}
            icon={createIcon(REGION_COLORS[loc.slug] ?? DEFAULT_COLOR)}
          >
            <Popup maxWidth={220} autoPan={true} autoPanPadding={[30, 30]}>
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