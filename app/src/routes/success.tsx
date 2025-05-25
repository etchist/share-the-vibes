import React from 'react';
import { createFileRoute, Link, useLocation } from '@tanstack/react-router';
import { motion } from 'framer-motion';
import {
  Card,
  Title,
  Text,
  Button,
  Group,
  Stack,
  ThemeIcon,
  Container,
} from '@mantine/core';
import { IconCheck, IconHome, IconPencilPlus } from '@tabler/icons-react';

interface LocationState {
  email?: string;
}

export const SuccessPage: React.FC = () => {
  const location = useLocation();
  const { email } = (location.state as LocationState) || {};

  return (
    <Container size="md" py="xl">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card withBorder shadow="md" radius="lg">
          <Stack align="center" gap="lg" p="xl">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
            >
              <ThemeIcon size={80} radius="xl" color="green" variant="light">
                <IconCheck size={40} />
              </ThemeIcon>
            </motion.div>

            <Stack align="center" gap="sm">
              <Title order={1} ta="center">
                Story Submitted Successfully!
              </Title>

              <Text c="dimmed" size="lg" ta="center" maw={400}>
                Thanks for sharing your coding horror story. We've sent a
                verification email to{' '}
                <Text span fw={500} c="dark">
                  {email || 'your email address'}
                </Text>
                .
              </Text>

              <Text c="dimmed" size="lg" ta="center">
                Please check your inbox and click the verification link to
                publish your story.
              </Text>
            </Stack>

            <Group mt="lg">
              <Button
                component={Link}
                to="/"
                variant="light"
                leftSection={<IconHome size={18} />}
              >
                Back to Home
              </Button>

              <Button
                component={Link}
                to="/submit"
                variant="filled"
                leftSection={<IconPencilPlus size={18} />}
              >
                Share Another Story
              </Button>
            </Group>
          </Stack>
        </Card>
      </motion.div>
    </Container>
  );
};
export const Route = createFileRoute('/success')({
  component: SuccessPage,
});
