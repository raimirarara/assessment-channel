'use client';

import {
  Text,
  Paper,
  Group,
  PaperProps,
} from '@mantine/core';
import { signIn } from 'next-auth/react';
import { GoogleButton } from './GoogleButton';

export function AuthenticationForm(props: PaperProps) {
  return (
    <Paper radius="md" p="xl" withBorder {...props}>
      <Text size="lg" fw={500}>
        査定チェンネルにようこそ
      </Text>

      <Group grow mb="md" mt="md">
        <GoogleButton radius="xl" onClick={() => signIn('google')}>Google</GoogleButton>
      </Group>

    </Paper>
  );
}
