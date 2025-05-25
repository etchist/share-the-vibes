import { Button, Flex, Group, Title } from '@mantine/core';

export default function HeaderMegaMenu() {
  return (
    <header>
      <Flex justify="space-between" align="center" p="xs">
        <Title order={3} textWrap="wrap">
          Vibe Coding Horrors
        </Title>
        <Group justify="end" wrap="nowrap">
          <Button>Read more</Button>
          <Button variant="default">Submit horror</Button>
        </Group>
      </Flex>
    </header>
  );
}
