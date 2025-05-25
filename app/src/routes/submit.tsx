import React, { useState, useEffect } from 'react';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { createStory } from '../lib/storyService';
import { motion } from 'framer-motion';
import {
  Card,
  Title,
  Text,
  Stack,
  TextInput,
  Button,
  Paper,
  SegmentedControl,
  Group,
  TagsInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import {
  IconCheck,
  IconThumbUp,
  IconThumbDown,
  IconMinus,
} from '@tabler/icons-react';
import RichTextEditor from '../components/RichTextEditor';
import { useDebouncedValue } from '@mantine/hooks';
import { getSuggestedTags } from '../lib/tagService';

interface FormValues {
  title: string;
  content: string;
  email: string;
  tags: string[];
  outcome: 'positive' | 'negative' | 'neutral';
}

const SubmitStoryPage: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tagSuggestions, setTagSuggestions] = useState<string[]>([]);
  const [tagSearch, setTagSearch] = useState('');
  const [debouncedTagSearch] = useDebouncedValue(tagSearch, 200);

  useEffect(() => {
    let ignore = false;
    const fetchSuggestions = async () => {
      if (debouncedTagSearch.length >= 2) {
        const suggestions = await getSuggestedTags(debouncedTagSearch);
        if (!ignore) setTagSuggestions(suggestions);
      } else {
        setTagSuggestions([]);
      }
    };
    fetchSuggestions();
    return () => { ignore = true; };
  }, [debouncedTagSearch]);

  const form = useForm<FormValues>({
    initialValues: {
      title: '',
      content: '',
      email: '',
      tags: [],
      outcome: 'neutral',
    },
    validate: {
      title: (value) => {
        if (!value.trim()) return 'Title is required';
        if (value.length < 5) return 'Title must be at least 5 characters';
        return null;
      },
      content: (value) => {
        if (!value.trim()) return 'Story content is required';
        if (value.replace(/<[^>]*>/g, '').length < 20) {
          return 'Story content must be at least 20 characters';
        }
        return null;
      },
      email: (value) => {
        if (!value.trim()) return 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return 'Please enter a valid email address';
        }
        return null;
      },
      tags: (value) => {
        if (value.length === 0) return 'Please add at least one tag';
        return null;
      },
    },
  });

  const handleSubmit = async (values: FormValues) => {
    setIsSubmitting(true);

    try {
      const storyId = await createStory({
        title: values.title,
        content: values.content,
        email: values.email,
        tags: values.tags,
        outcome: values.outcome,
      });

      if (storyId) {
        notifications.show({
          title: 'Success!',
          message: 'Your story has been submitted successfully.',
          color: 'green',
          icon: <IconCheck />,
        });

        navigate('/success', {
          state: { email: values.email },
        });
      } else {
        throw new Error('Failed to create story');
      }
    } catch (error) {
      console.error('Error submitting story:', error);
      notifications.show({
        title: 'Error',
        message: 'Something went wrong. Please try again.',
        color: 'red',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Paper radius="lg" withBorder>
        <Card>
          <Stack gap="lg">
            <div>
              <Title order={1} mb="xs">
                Share Your Coding Story
              </Title>
              <Text c="dimmed">
                Share your experience with vibe-based coding - whether it led to
                an elegant solution or a memorable lesson learned.
              </Text>
            </div>

            <form onSubmit={form.onSubmit(handleSubmit)}>
              <Stack gap="md">
                <TextInput
                  label="Title"
                  placeholder="Give your story a catchy title"
                  required
                  {...form.getInputProps('title')}
                />

                <Stack gap="xs">
                  <Text component="label" size="sm" fw={500}>
                    Story Outcome{' '}
                    <span style={{ color: 'var(--mantine-color-red-filled)' }}>
                      *
                    </span>
                  </Text>
                  <SegmentedControl
                    {...form.getInputProps('outcome')}
                    data={[
                      {
                        value: 'positive',
                        label: (
                          <Group gap="xs">
                            <IconThumbUp size={16} />
                            <span>Success Story</span>
                          </Group>
                        ),
                      },
                      {
                        value: 'neutral',
                        label: (
                          <Group gap="xs">
                            <IconMinus size={16} />
                            <span>Mixed Results</span>
                          </Group>
                        ),
                      },
                      {
                        value: 'negative',
                        label: (
                          <Group gap="xs">
                            <IconThumbDown size={16} />
                            <span>Learning Experience</span>
                          </Group>
                        ),
                      },
                    ]}
                  />
                </Stack>

                <Stack gap="xs">
                  <Text component="label" size="sm" fw={500}>
                    Your Story{' '}
                    <span style={{ color: 'var(--mantine-color-red-filled)' }}>
                      *
                    </span>
                  </Text>
                  <RichTextEditor
                    content={form.values.content}
                    onChange={(value) => form.setFieldValue('content', value)}
                  />
                  {form.errors.content && (
                    <Text size="xs" c="red">
                      {form.errors.content}
                    </Text>
                  )}
                </Stack>

                <TagsInput
                  label="Tags"
                  placeholder="Add tags (e.g., javascript, css, bugs)"
                  required
                  maxTags={5}
                  data={tagSuggestions}
                  value={form.values.tags}
                  onChange={(tags) => form.setFieldValue('tags', tags)}
                  searchValue={tagSearch}
                  onSearchChange={setTagSearch}
                  error={form.errors.tags}
                  description="0/5 tags max"
                  clearable
                />

                <TextInput
                  label="Email"
                  placeholder="you@example.com"
                  required
                  {...form.getInputProps('email')}
                  description="We'll send a verification email to publish your story. We won't share your email with anyone."
                />

                <Button type="submit" loading={isSubmitting} fullWidth mt="md">
                  {isSubmitting ? 'Submitting...' : 'Submit Your Story'}
                </Button>
              </Stack>
            </form>
          </Stack>
        </Card>
      </Paper>
    </motion.div>
  );
};

export const Route = createFileRoute('/submit')({
  component: SubmitStoryPage,
});
