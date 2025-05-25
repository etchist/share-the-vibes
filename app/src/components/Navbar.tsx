import React from 'react';
import { Link, useLocation } from '@tanstack/react-router';
import {
  Group,
  Button,
  ActionIcon,
  Title,
  Container,
  Box,
} from '@mantine/core';
import {
  IconBook2,
  IconMoonStars,
  IconPencilPlus,
  IconSun,
} from '@tabler/icons-react';

interface NavbarProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ theme, toggleTheme }) => {
  const location = useLocation();

  return (
    <Box component="nav" h="100%">
      <Container size="xl" h="100%">
        <Group h="100%" justify="space-between">
          <Group>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <Group gap="xs">
                <IconBook2
                  size={32}
                  style={{ color: 'var(--mantine-color-violet-filled)' }}
                />
                <Title
                  order={1}
                  size="h3"
                  style={{
                    background:
                      'linear-gradient(45deg, var(--mantine-color-violet-filled), var(--mantine-color-indigo-filled))',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Share the Vibes
                </Title>
              </Group>
            </Link>
          </Group>

          <Group>
            <Button
              component={Link}
              to="/submit"
              variant={location.pathname === '/submit' ? 'filled' : 'light'}
              leftSection={<IconPencilPlus size={20} />}
            >
              Share Story
            </Button>

            <ActionIcon
              variant="light"
              size="lg"
              onClick={toggleTheme}
              aria-label={
                theme === 'dark'
                  ? 'Switch to light mode'
                  : 'Switch to dark mode'
              }
            >
              {theme === 'dark' ? (
                <IconSun size={20} />
              ) : (
                <IconMoonStars size={20} />
              )}
            </ActionIcon>
          </Group>
        </Group>
      </Container>
    </Box>
  );
};

export default Navbar;
