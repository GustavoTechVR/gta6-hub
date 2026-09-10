// app/layout.tsx
import type { Metadata } from 'next';
import { Rajdhani } from 'next/font/google';
import './globals.css';
import Header from './components/Header';

const rajdhani = Rajdhani({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-rajdhani',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://tu-dominio.com'),
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
    <html lang="es" className={rajdhani.variable}>
      <body className="min-h-screen antialiased">
        <Header />
        <main className="mx-auto max-w-5xl px-6 py-10">{children}</main>
      </body>
    </html>
  );
}