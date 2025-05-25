import React from 'react';
import { Link } from '@tanstack/react-router';
import {
  Container,
  Group,
  Stack,
  Text,
  ActionIcon,
  Title,
  Box,
} from '@mantine/core';
import { IconBrandGithub, IconBrandTwitter } from '@tabler/icons-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box component="footer" py="xl">
      <Container size="xl">
        <Group justify="space-between" align="flex-start">
          <Stack gap="md" maw={400}>
            <Title
              order={3}
              style={{
                background:
                  'linear-gradient(45deg, var(--mantine-color-violet-filled), var(--mantine-color-indigo-filled))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Share the Vibes
            </Title>
            <Text c="dimmed" size="sm">
              Share your coding journey and experiences with the community.
              Let's learn from each other's stories!
            </Text>
            <Group>
              <ActionIcon
                component="a"
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                variant="light"
                size="lg"
              >
                <IconBrandGithub style={{ width: '70%', height: '70%' }} />
              </ActionIcon>
              <ActionIcon
                component="a"
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                variant="light"
                size="lg"
              >
                <IconBrandTwitter style={{ width: '70%', height: '70%' }} />
              </ActionIcon>
            </Group>
          </Stack>

          <Stack gap="xs">
            <Text fw={700} mb="xs">
              Quick Links
            </Text>
            <Text
              component={Link}
              to="/"
              c="dimmed"
              style={{ textDecoration: 'none' }}
            >
              Home
            </Text>
            <Text
              component={Link}
              to="/submit"
              c="dimmed"
              style={{ textDecoration: 'none' }}
            >
              Share Story
            </Text>
          </Stack>

          <Stack gap="xs">
            <Text fw={700} mb="xs">
              Legal
            </Text>
            <Text
              component={Link}
              to="/privacy"
              c="dimmed"
              style={{ textDecoration: 'none' }}
            >
              Privacy Policy
            </Text>
            <Text
              component={Link}
              to="/terms"
              c="dimmed"
              style={{ textDecoration: 'none' }}
            >
              Terms of Service
            </Text>
          </Stack>
        </Group>

        <Text ta="center" c="dimmed" mt="xl" size="sm">
          © {currentYear} Share the Vibes. All rights reserved.
        </Text>
      </Container>
    </Box>
  );
};

export default Footer;
