import React, { useState, useEffect } from 'react';
import { useParams, Link, createFileRoute } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { getStoryById, Story } from '../lib/storyService';
import TagBadge from '../components/TagBadge';
import { formatDate } from '../lib/utils';
import {
  Card,
  Group,
  Title,
  Text,
  Button,
  Stack,
  Loader,
  Container,
  ActionIcon,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconArrowLeft, IconShare, IconEye } from '@tabler/icons-react';

const StoryPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [story, setStory] = useState<Story | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStory = async () => {
      if (!id) return;

      setIsLoading(true);
      const fetchedStory = await getStoryById(id);
      setStory(fetchedStory);
      setIsLoading(false);
    };

    fetchStory();
    window.scrollTo(0, 0);
  }, [id]);

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: story?.title || 'Share the Vibes',
          text: `Check out this story on Share the Vibes: ${story?.title}`,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        notifications.show({
          message: 'Link copied to clipboard!',
          color: 'green',
        });
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  if (isLoading) {
    return (
      <Card withBorder p="xl">
        <Group justify="center">
          <Loader size="lg" />
        </Group>
      </Card>
    );
  }

  if (!story) {
    return (
      <Card withBorder p="xl">
        <Stack align="center" gap="md">
          <Title order={2}>Story Not Found</Title>
          <Text c="dimmed">
            The story you're looking for doesn't exist or has been removed.
          </Text>
          <Button
            component={Link}
            to="/"
            variant="light"
            leftSection={<IconArrowLeft size={16} />}
          >
            Back to home
          </Button>
        </Stack>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Stack gap="lg">
        <Group>
          <Button
            component={Link}
            to="/"
            variant="subtle"
            leftSection={<IconArrowLeft size={16} />}
          >
            Back to stories
          </Button>
        </Group>

        <Card withBorder shadow="sm">
          <Stack gap="lg">
            <div>
              <Title order={1} size="h2" mb="md">
                {story.title}
              </Title>

              <Group gap="xs" wrap="wrap" mb="lg">
                {story.tags.map((tag) => (
                  <TagBadge key={tag} tag={tag} />
                ))}
              </Group>

              <Group justify="space-between" align="center">
                <Group gap="xs" c="dimmed">
                  <Text size="sm">{formatDate(story.created_at)}</Text>
                  <Text size="sm">•</Text>
                  <Group gap={4}>
                    <IconEye size={16} />
                    <Text size="sm">{story.views} views</Text>
                  </Group>
                </Group>

                <ActionIcon
                  variant="light"
                  onClick={handleShare}
                  size="lg"
                  aria-label="Share story"
                >
                  <IconShare size={18} />
                </ActionIcon>
              </Group>
            </div>

            <div
              className="prose dark:prose-invert"
              dangerouslySetInnerHTML={{ __html: story.content }}
              style={{
                maxWidth: '100%',
              }}
            />
          </Stack>
        </Card>
      </Stack>
    </motion.div>
  );
};

export const Route = createFileRoute('/story')({
  component: StoryPage,
});
