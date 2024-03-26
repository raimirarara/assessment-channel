import { Group, Paper, SimpleGrid, Text } from '@mantine/core';
import {
  IconUserPlus,
  IconDiscount2,
  IconReceipt2,
  IconCoin,
  IconArrowUpRight,
  IconArrowDownRight,
} from '@tabler/icons-react';
import classes from './StatsGrid.module.css';
import { youtube_v3 } from 'googleapis';

const icons = {
  user: IconUserPlus,
  discount: IconDiscount2,
  receipt: IconReceipt2,
  coin: IconCoin,
};

export function StatsGrid({
  channelList,
}: {
  channelList: youtube_v3.Schema$Channel[] | null | undefined;
}) {
  const subscriberCount = channelList?.[0]?.statistics?.subscriberCount;

  const minRevenueSummaryAd = Number(subscriberCount) * 1 * 2000;
  const maxRevenueSummaryAd = Number(subscriberCount) * 2 * 2000;
  const revenueTieUp = Number(subscriberCount) * 4 * 2000;
  const data = [
    {
      title: '概要欄広告',
      icon: 'receipt',
      value: `${minRevenueSummaryAd.toLocaleString()} ~ ${maxRevenueSummaryAd.toLocaleString()}`,
      unit: '/ 月',
      diff: 34,
    },
    {
      title: 'タイアップ動画',
      icon: 'receipt',
      value: `${revenueTieUp.toLocaleString()}`,
      unit: '/ 動画',
      diff: 34,
    },
    // { title: 'Profit', icon: 'coin', value: '4,145', diff: -13 },
    // { title: 'Coupons usage', icon: 'discount', value: '745', diff: 18 },
    // { title: 'New customers', icon: 'user', value: '188', diff: -30 },
  ] as const;
  const stats = data.map((stat, index) => {
    const Icon = icons[stat.icon];
    const DiffIcon = stat.diff > 0 ? IconArrowUpRight : IconArrowDownRight;

    return (
      <Paper withBorder p="md" radius="md" key={index}>
        <Group justify="space-between">
          <Icon className={classes.icon} size="1.4rem" stroke={1.5} />
        </Group>
        <Group align="flex-end" gap="xs" mt={25}>
          <Text className={classes.text}>{stat.title}</Text>
          <Text className={classes.value} ml={50}>
            <span className={classes.span}>￥</span> {stat.value}{' '}
            <span className={classes.span}>{stat.unit}</span>
          </Text>
          <Text
            c={stat.diff > 0 ? 'teal' : 'red'}
            fz="xl"
            fw={500}
            className={classes.diff}
            ml={50}
          >
            <span>{stat.diff}%</span>
            <DiffIcon size="3rem" stroke={1.5} />
            <Text fz="xs" c="dimmed" mt={7}>
              前月比
            </Text>
          </Text>
        </Group>
      </Paper>
    );
  });
  return (
    <div className={classes.root}>
      <SimpleGrid cols={{ base: 1, xs: 2, md: 1 }}>{stats}</SimpleGrid>
    </div>
  );
}
