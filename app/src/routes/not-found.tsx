import React from 'react';
import {
  Container,
  Title,
  Text,
  Button,
  Stack,
  ThemeIcon,
} from '@mantine/core';
import { IconFileAlert, IconHome } from '@tabler/icons-react';
import { Link, createFileRoute } from '@tanstack/react-router';

const NotFoundPage: React.FC = () => {
  return (
    <Container size="sm" py="xl">
      <Stack align="center" gap="lg">
        <ThemeIcon size={100} radius="xl" variant="light" color="gray">
          <IconFileAlert size={50} />
        </ThemeIcon>

        <Stack align="center" gap="sm">
          <Title order={1} size="h1">
            404
          </Title>

          <Title order={2} size="h3">
            Oops! This page isn't in our codebase.
          </Title>

          <Text c="dimmed" size="lg" ta="center" maw={400}>
            Looks like you've encountered a coding horror of your own – the page
            you're looking for doesn't exist.
          </Text>
        </Stack>

        <Button
          component={Link}
          to="/"
          size="lg"
          leftSection={<IconHome size={20} />}
        >
          Back to Home
        </Button>
      </Stack>
    </Container>
  );
};

export const Route = createFileRoute('/not-found')({
  component: NotFoundPage,
});
