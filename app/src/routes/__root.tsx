import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import {
  AppShell,
  Container,
  createTheme,
  MantineProvider,
  useMantineColorScheme,
} from '@mantine/core';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const theme = createTheme({
  primaryColor: 'violet',
  fontFamily: 'Inter, sans-serif',
  headings: {
    fontFamily: 'Inter, sans-serif',
  },
  components: {
    Button: {
      defaultProps: {
        size: 'md',
      },
    },
    Card: {
      defaultProps: {
        padding: 'lg',
        radius: 'md',
      },
    },
  },
});

export const RootRoute = () => {
  const { colorScheme, setColorScheme } = useMantineColorScheme();

  const toggleTheme = () => {
    setColorScheme(colorScheme === 'dark' ? 'light' : 'dark');
  };
  return (
    <MantineProvider theme={theme} defaultColorScheme="auto">
      <AppShell
        header={{ height: 60 }}
        padding="md"
        styles={{
          main: {
            paddingLeft: 'var(--mantine-spacing-md)',
            paddingRight: 'var(--mantine-spacing-md)',
          },
        }}
      >
        <AppShell.Header>
          <Navbar theme={colorScheme} toggleTheme={toggleTheme} />
        </AppShell.Header>

        <AppShell.Main>
          <Container size="xl" px={0}>
            <Outlet />
          </Container>
        </AppShell.Main>

        <AppShell.Footer>
          <Footer />
        </AppShell.Footer>
      </AppShell>
      <TanStackRouterDevtools />
    </MantineProvider>
  );
};
export const Route = createRootRoute({
  component: RootRoute,
});
