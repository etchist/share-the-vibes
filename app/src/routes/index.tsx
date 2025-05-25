import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  getFeaturedStories,
  getRecentStories,
  StoryPreview,
} from '../lib/storyService';
import { getPopularTags, Tag } from '../lib/tagService';
import {
  Container,
  Title,
  Text,
  Grid,
  TextInput,
  Group,
  Stack,
  Loader,
  Paper,
} from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import StoryCard from '../components/StoryCard';
import FeaturedStory from '../components/FeaturedStory';
import TagBadge from '../components/TagBadge';

import { createFileRoute, useSearch } from '@tanstack/react-router';

const HomePage: React.FC = () => {
  const [featuredStories, setFeaturedStories] = useState<StoryPreview[]>([]);
  const [recentStories, setRecentStories] = useState<StoryPreview[]>([]);
  const [popularTags, setPopularTags] = useState<Tag[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      const [featured, recent, tags] = await Promise.all([
        getFeaturedStories(),
        getRecentStories(),
        getPopularTags(),
      ]);

      setFeaturedStories(featured);
      setRecentStories(recent);
      setPopularTags(tags);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const filteredStories = recentStories.filter((story) => {
    // if (selectedTag && !story.tags.includes(selectedTag)) {
    //   return false;
    // }

    if (searchQuery) {
      const query = (searchQuery ?? '').toLowerCase();
      return (
        story.title.toLowerCase().includes(query) ||
        story.content.toLowerCase().includes(query) ||
        story.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    return true;
  });

  // const handleTagSelect = (tag: string) => {
  //   setSelectedTag((prevTag) => (prevTag === tag ? null : tag));
  // };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <Stack gap="xl">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Stack ta="center" gap="md">
          <Title
            order={1}
            size="h1"
            style={{
              fontSize: '3rem',
              background:
                'linear-gradient(45deg, var(--mantine-color-violet-filled), var(--mantine-color-indigo-filled))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Share the Vibes
          </Title>
          <Text size="lg" c="dimmed" maw={800} mx="auto">
            Share your experiences with vibe-based coding — the triumphs, the
            disasters, and everything in between. Because sometimes sharing the vibes leads to unexpected places!
          </Text>
        </Stack>
      </motion.div>

      {isLoading ? (
        <Paper p="xl" withBorder>
          <Group justify="center">
            <Loader size="lg" />
          </Group>
        </Paper>
      ) : (
        featuredStories.length > 0 && (
          <FeaturedStory story={featuredStories[0]} />
        )
      )}

      <Stack gap="lg">
        <Group justify="space-between" align="flex-start" wrap="wrap">
          <Title order={2}>Recent Stories</Title>

          <Group align="flex-start" wrap="wrap">
            <form onSubmit={handleSearch} style={{ flex: 1, minWidth: 200 }}>
              <TextInput
                placeholder="Search stories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                leftSection={<IconSearch size={16} />}
              />
            </form>

            <Group gap="xs" wrap="wrap">
              {popularTags.slice(0, 5).map((tag) => (
                <TagBadge
                  key={tag.id}
                  tag={tag.name}
                  count={tag.count}
                  clickable
                // selected={selectedTag === tag.name}
                // onSelect={handleTagSelect}
                />
              ))}
            </Group>
          </Group>
        </Group>

        {isLoading ? (
          <Paper p="xl" withBorder>
            <Group justify="center">
              <Loader size="lg" />
            </Group>
          </Paper>
        ) : filteredStories.length > 0 ? (
          <Grid>
            {filteredStories.map((story, index) => (
              <Grid.Col key={story.id} span={{ base: 12, sm: 6, lg: 4 }}>
                <StoryCard story={story} index={index} />
              </Grid.Col>
            ))}
          </Grid>
        ) : (
          <Paper p="xl" withBorder>
            <Text ta="center" size="lg" c="dimmed">
              {searchQuery
                ? 'No stories found matching your filters. Try adjusting your search or tags.'
                : 'No stories found. Be the first to share your coding story!'}
            </Text>
          </Paper>
        )}
      </Stack>
    </Stack>
  );
};

export const Route = createFileRoute('/')({
  component: HomePage,
});
