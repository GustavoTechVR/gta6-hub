// lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// lib/types.ts (puedes poner esto en un archivo separado lib/types.ts)
export interface Guide {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  category: 'economia' | 'mapa' | 'personajes' | 'misiones' | 'coleccionables';
  cover_image_url: string | null;
  published: boolean;
  published_at: string | null;
  updated_at: string;
  created_at: string;
}

export interface Character {
  id: string;
  slug: string;
  name: string;
  description: string;
  role: 'protagonista' | 'antagonista' | 'secundario' | null;
  image_url: string | null;
  created_at: string;
}

export interface GameLocation {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  region: string | null;
  lat: number | null;
  lng: number | null;
  category: 'tienda' | 'coleccionable' | 'mision' | 'evento' | null;
  created_at: string;
}

export interface EconomyTip {
  id: string;
  title: string;
  description: string;
  mechanic_type: 'lavado_dinero' | 'comercio' | 'inversion' | 'robo' | null;
  created_at: string;
}

// Funciones helper de acceso a datos (usar en Server Components)

export async function getPublishedGuides(category?: string) {
  let query = supabase
    .from('guides')
    .select('*')
    .eq('published', true)
    .order('published_at', { ascending: false });

  if (category) {
    query = query.eq('category', category);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data as Guide[];
}

export async function getGuideBySlug(slug: string) {
  const { data, error } = await supabase
    .from('guides')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single();

  if (error) return null;
  return data as Guide;
}

export async function getAllLocations() {
  const { data, error } = await supabase.from('locations').select('*');
  if (error) throw error;
  return data as GameLocation[];
}

export async function getAllCharacters() {
  const { data, error } = await supabase
    .from('characters')
    .select('*')
    .order('created_at', { ascending: true });

  if (error) throw error;
  return data as Character[];
}

export async function getCharacterBySlug(slug: string) {
  const { data, error } = await supabase
    .from('characters')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) return null;
  return data as Character;
}