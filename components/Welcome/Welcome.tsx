import { Title, Text, Anchor, Button, Group } from '@mantine/core';
import classes from './Welcome.module.css';

export function Welcome() {
  return (
    <>
      <Title className={classes.title} ta="center" mt={100}>
        <Text inherit variant="gradient" component="span" gradient={{ from: 'pink', to: 'yellow' }}>
          査定チャンネル
        </Text>
      </Title>

      <Group justify="center">
        <Button variant="light">今すぐ査定する</Button>
      </Group>
    </>
  );
}
