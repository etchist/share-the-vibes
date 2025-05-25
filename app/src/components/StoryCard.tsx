import React from 'react';
import { Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import { Card, Text, Group, Badge, Button, Stack } from '@mantine/core';
import {
  IconEye,
  IconArrowRight,
  IconThumbUp,
  IconThumbDown,
  IconMinus,
} from '@tabler/icons-react';
import { StoryPreview } from '../lib/storyService';
import TagBadge from './TagBadge';
import { formatDate } from '../lib/utils';

interface StoryCardProps {
  story: StoryPreview;
  featured?: boolean;
  index?: number;
}

const StoryCard: React.FC<StoryCardProps> = ({
  story,
  featured = false,
  index = 0,
}) => {
  const outcomeConfig = {
    positive: {
      icon: IconThumbUp,
      color: 'teal',
      label: 'Success Story',
    },
    negative: {
      icon: IconThumbDown,
      color: 'red',
      label: 'Learning Experience',
    },
    neutral: {
      icon: IconMinus,
      color: 'gray',
      label: 'Mixed Results',
    },
  }[story.outcome];

  const OutcomeIcon = outcomeConfig.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      style={{ height: '100%' }}
    >
      <Card
        shadow="sm"
        withBorder
        h="100%"
        style={{
          display: 'flex',
          flexDirection: 'column',
          background: featured
            ? 'linear-gradient(45deg, var(--mantine-color-violet-1), var(--mantine-color-indigo-1))'
            : undefined,
        }}
      >
        <Stack justify="space-between" style={{ flex: 1 }}>
          <div>
            <Group gap="xs" mb="md">
              {featured && (
                <Badge variant="light" color="violet" size="sm">
                  Featured
                </Badge>
              )}
              <Badge
                variant="light"
                color={outcomeConfig.color}
                size="sm"
                leftSection={<OutcomeIcon size={12} />}
              >
                {outcomeConfig.label}
              </Badge>
            </Group>

            <Text fw={700} size="lg" lineClamp={2} mb="sm">
              {story.title}
            </Text>

            <Text c="dimmed" size="sm" lineClamp={3} mb="md">
              {story.content}
            </Text>

            <Group gap="xs" wrap="wrap" mb="md">
              {story.tags.slice(0, 3).map((tag) => (
                <TagBadge key={tag} tag={tag} />
              ))}
              {story.tags.length > 3 && (
                <Text size="xs" c="dimmed">
                  +{story.tags.length - 3} more
                </Text>
              )}
            </Group>
          </div>

          <Group justify="space-between" align="center">
            <Group gap="xs">
              <IconEye
                size={16}
                style={{ color: 'var(--mantine-color-dimmed)' }}
              />
              <Text size="sm" c="dimmed">
                {story.views}
              </Text>
              <Text size="sm" c="dimmed">
                •
              </Text>
              <Text size="sm" c="dimmed">
                {formatDate(story.created_at)}
              </Text>
            </Group>

            <Button
              component={Link}
              to={`/story/${story.id}`}
              variant="light"
              size="sm"
              rightSection={<IconArrowRight size={16} />}
            >
              Read more
            </Button>
          </Group>
        </Stack>
      </Card>
    </motion.div>
  );
};

export default StoryCard;
