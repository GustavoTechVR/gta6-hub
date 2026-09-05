// app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://tu-dominio.com'), // cambia esto cuando tengas dominio
  title: {
    default: 'GTA 6 Hub | Guías, Mapa y Economía',
    template: '%s | GTA 6 Hub',
  },
  description:
    'Guías completas de GTA 6: mapa interactivo, mecánicas de economía, personajes y todo lo que necesitas saber antes y después del lanzamiento.',
  keywords: ['GTA 6', 'GTA 6 guías', 'GTA 6 mapa', 'GTA 6 economía', 'GTA 6 dinero'],
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    siteName: 'GTA 6 Hub',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-neutral-950 text-neutral-100 antialiased">
        <header className="border-b border-neutral-800 px-6 py-4">
          <nav className="mx-auto flex max-w-5xl items-center justify-between">
            <a href="/" className="text-lg font-bold">
              GTA 6 Hub
            </a>
            <div className="flex gap-6 text-sm">
              <a href="/guias">Guías</a>
              <a href="/mapa">Mapa</a>
              <a href="/personajes">Personajes</a>
            </div>
          </nav>
        </header>
        <main className="mx-auto max-w-5xl px-6 py-10">{children}</main>
      </body>
    </html>
  );
}