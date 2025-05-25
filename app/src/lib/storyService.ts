import { supabase } from './supabaseClient';
import { getPopularTags } from './tagService';

export interface Story {
  id: string;
  title: string;
  content: string;
  email: string;
  created_at: string;
  tags: string[];
  views: number;
  featured: boolean;
  verified: boolean;
  outcome: 'positive' | 'negative' | 'neutral';
}

export interface StoryPreview {
  id: string;
  title: string;
  content: string;
  created_at: string;
  tags: string[];
  views: number;
  featured: boolean;
  outcome: 'positive' | 'negative' | 'neutral';
}

// Get featured stories 
export async function getFeaturedStories(): Promise<StoryPreview[]> {
  const { data, error } = await supabase
    .from('stories')
    .select('id, title, content, created_at, tags, views, featured, outcome')
    .eq('featured', true)
    .eq('verified', true)
    .order('created_at', { ascending: false })
    .limit(3);

  if (error) {
    console.error('Error fetching featured stories:', error);
    return [];
  }

  return formatStoryPreviews(data || []);
}

// Get recent stories
export async function getRecentStories(limit = 9, skip = 0): Promise<StoryPreview[]> {
  const { data, error } = await supabase
    .from('stories')
    .select('id, title, content, created_at, tags, views, featured, outcome')
    .eq('verified', true)
    .order('created_at', { ascending: false })
    .range(skip, skip + limit - 1);

  if (error) {
    console.error('Error fetching recent stories:', error);
    return [];
  }

  return formatStoryPreviews(data || []);
}

// Get single story by ID
export async function getStoryById(id: string): Promise<Story | null> {
  const { data, error } = await supabase
    .from('stories')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching story:', error);
    return null;
  }

  // Increment views
  if (data) {
    await supabase
      .from('stories')
      .update({ views: (data.views || 0) + 1 })
      .eq('id', id);
    
    // Update the views count in the returned data
    data.views = (data.views || 0) + 1;
  }

  return data;
}

// Create a new story
export async function createStory(story: Omit<Story, 'id' | 'created_at' | 'views' | 'featured' | 'verified'>): Promise<string | null> {
  // Add the story to the database
  const { data, error } = await supabase
    .from('stories')
    .insert([
      { 
        ...story, 
        views: 0, 
        featured: false, 
        verified: false // stories start unverified until email confirmation
      }
    ])
    .select('id')
    .single();

  if (error) {
    console.error('Error creating story:', error);
    return null;
  }

  // Update tag counts
  if (story.tags && story.tags.length > 0) {
    await updateTagCounts(story.tags);
  }

  return data?.id || null;
}

// Helper function to update tag counts when a new story is created
async function updateTagCounts(tags: string[]): Promise<void> {
  // Get existing tags to check which ones need to be inserted vs updated
  const existingTags = await getPopularTags();
  const existingTagNames = existingTags.map(tag => tag.name);

  for (const tag of tags) {
    if (existingTagNames.includes(tag)) {
      // Update existing tag count
      await supabase
        .from('tags')
        .update({ count: supabase.rpc('increment', { x: 1 }) })
        .eq('name', tag);
    } else {
      // Insert new tag
      await supabase
        .from('tags')
        .insert([{ name: tag, count: 1 }]);
    }
  }
}

// Helper function to format story previews and truncate content
function formatStoryPreviews(stories: any[]): StoryPreview[] {
  return stories.map(story => ({
    ...story,
    content: truncateContent(story.content)
  }));
}

// Helper function to truncate content for previews
function truncateContent(content: string): string {
  // Remove HTML tags and limit to 200 characters
  const plainText = content.replace(/<[^>]*>/g, '');
  if (plainText.length <= 200) return plainText;
  return plainText.substring(0, 200) + '...';
}