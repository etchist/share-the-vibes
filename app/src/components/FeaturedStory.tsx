import React from 'react';
import { Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import {
  Card,
  Text,
  Group,
  Badge,
  Button,
  Stack,
  Container,
} from '@mantine/core';
import { IconArrowRight } from '@tabler/icons-react';
import { StoryPreview } from '../lib/storyService';
import TagBadge from './TagBadge';
import { formatDate } from '../lib/utils';

interface FeaturedStoryProps {
  story: StoryPreview;
}

const FeaturedStory: React.FC<FeaturedStoryProps> = ({ story }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card
        shadow="lg"
        radius="lg"
        style={{
          background:
            'linear-gradient(45deg, var(--mantine-color-violet-filled), var(--mantine-color-indigo-filled))',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.2)',
            backdropFilter: 'blur(4px)',
          }}
        />

        <Container size="lg" style={{ position: 'relative', zIndex: 1 }}>
          <Stack gap="lg">
            <Badge
              variant="filled"
              color="gray"
              size="lg"
              style={{
                background: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(4px)',
                width: 'fit-content',
              }}
            >
              Featured Story
            </Badge>

            <Text size="xl" fw={700} c="white" style={{ fontSize: '2rem' }}>
              {story.title}
            </Text>

            <Text c="white" opacity={0.9} size="lg" lineClamp={3}>
              {story.content}
            </Text>

            <Group gap="xs" wrap="wrap">
              {story.tags.map((tag) => (
                <Badge
                  key={tag}
                  size="lg"
                  style={{
                    background: 'rgba(255, 255, 255, 0.2)',
                    color: 'white',
                    backdropFilter: 'blur(4px)',
                  }}
                >
                  {tag}
                </Badge>
              ))}
            </Group>

            <Group justify="space-between" align="center">
              <Text c="white" opacity={0.8}>
                {formatDate(story.created_at)}
              </Text>

              <Button
                component={Link}
                to={`/story/${story.id}`}
                variant="white"
                size="md"
                rightSection={<IconArrowRight size={18} />}
              >
                Read the full story
              </Button>
            </Group>
          </Stack>
        </Container>
      </Card>
    </motion.div>
  );
};

export default FeaturedStory;
