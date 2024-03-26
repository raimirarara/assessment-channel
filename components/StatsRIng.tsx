import { RingProgress, Text, SimpleGrid, Paper, Center, Group, rem } from '@mantine/core';
import { IconArrowUpRight, IconArrowDownRight } from '@tabler/icons-react';
import { youtube_v3 } from 'googleapis';

const icons = {
  up: IconArrowUpRight,
  down: IconArrowDownRight,
};

export function StatsRing({
  channelList,
}: {
  channelList: youtube_v3.Schema$Channel[] | null | undefined;
}) {
  const viewCount = Number(channelList?.[0]?.statistics?.viewCount);
  const data = [
    {
      label: '総再生数',
      stats: viewCount.toLocaleString(),
      progress: 65,
      unit: '回',
      color: 'teal',
      icon: 'up',
    },
    { label: '総再生時間', stats: '300', progress: 65, unit: '時間', color: 'teal', icon: 'up' },
    {
      label: '新規登録ユーザ',
      stats: '2,550',
      progress: 72,
      unit: '人',
      color: 'blue',
      icon: 'up',
    },
    {
      label: 'Orders',
      stats: '4,735',
      progress: 52,
      unit: 'orders',
      color: 'red',
      icon: 'down',
    },
  ] as const;

  const stats = data.map((stat) => {
    const Icon = icons[stat.icon];
    return (
      <Paper withBorder radius="md" p="xs" key={stat.label}>
        <Group>
          <RingProgress
            size={80}
            roundCaps
            thickness={8}
            sections={[{ value: stat.progress, color: stat.color }]}
            label={
              <Center>
                <Icon style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
              </Center>
            }
          />

          <div>
            <Text c="dimmed" size="xs" tt="uppercase" fw={700}>
              {stat.label}
            </Text>
            <Center>
              <Text fw={700} size="xl">
                {stat.stats} {stat.unit}
              </Text>
            </Center>
          </div>
        </Group>
      </Paper>
    );
  });

  return <SimpleGrid cols={{ base: 1, sm: 3 }}>{stats}</SimpleGrid>;
}
