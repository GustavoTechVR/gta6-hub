// app/sitemap.ts
import { MetadataRoute } from 'next';
import { getPublishedGuides } from '@/lib/supabase';

// Next.js genera automáticamente /sitemap.xml a partir de este archivo.
// Esto es clave: cada vez que agregues una guía nueva en Supabase, aparece
// automáticamente en el sitemap sin que toques código.

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://tu-dominio.com'; // cambia esto cuando tengas dominio real

  const guides = await getPublishedGuides();

  const guideUrls = guides.map((guide) => ({
    url: `${baseUrl}/guias/${guide.slug}`,
    lastModified: new Date(guide.updated_at),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const staticUrls = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 1 },
    { url: `${baseUrl}/guias`, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.9 },
    { url: `${baseUrl}/mapa`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.9 },
  ];

  return [...staticUrls, ...guideUrls];
}

// app/robots.ts (crea este archivo aparte en la misma carpeta app/)
// export default function robots() {
//   return {
//     rules: { userAgent: '*', allow: '/' },
//     sitemap: 'https://tu-dominio.com/sitemap.xml',
//   };
// }