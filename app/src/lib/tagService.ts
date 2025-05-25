import { supabase } from './supabaseClient';

export interface Tag {
  id: string;
  name: string;
  count: number;
}

// Get popular tags for filtering stories
export async function getPopularTags(limit = 20): Promise<Tag[]> {
  const { data, error } = await supabase
    .from('tags')
    .select('*')
    .order('count', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching tags:', error);
    return [];
  }

  return data || [];
}

// Get suggested tags for autocomplete
export async function getSuggestedTags(query: string): Promise<string[]> {
  if (!query || query.length < 2) return [];
  
  const { data, error } = await supabase
    .from('tags')
    .select('name')
    .ilike('name', `%${query}%`)
    .order('count', { ascending: false })
    .limit(5);

  if (error) {
    console.error('Error fetching tag suggestions:', error);
    return [];
  }

  return data?.map(tag => tag.name) || [];
}