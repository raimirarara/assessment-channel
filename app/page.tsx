import { getServerSession, Session } from 'next-auth';
import { Flex, Grid, GridCol, Text, Title } from '@mantine/core';
import { Navbar } from '@/components/Navbar/Navbar';
import { StatsGrid } from '@/components/StatsGrid/StatsGrid';
import { StatsRing } from '@/components/StatsRIng';
import { fetchChannelList } from '@/actions/fetchChannelList';
import { redirect } from 'next/navigation';
import { fetchTopRevenueVideos } from '@/actions/fetchTopRevenueVideos';
import { authOptions } from '@/lib/OAuthclient';

export default async function HomePage() {
  const session: (Session & { accessToken: string }) | null = await getServerSession(authOptions);
  if (!session) {
    redirect('/signin');
  }
  console.log('session', session);
  const channelList = await fetchChannelList(session.accessToken);
  console.log('channelList', channelList);

  const youtubeTitle = channelList?.[0]?.snippet?.title;
  // const topRevenueVideos = await fetchTopRevenueVideos(session.token);
  // console.log('topRevenueVideos', topRevenueVideos);
  return (
    <>
      <Flex>
        <Navbar />
        <Grid gutter="xs">
          <GridCol>
            <Title m={'lg'}>{youtubeTitle}で得られる収益</Title>
            <StatsGrid channelList={channelList} />
          </GridCol>
          <GridCol>
            <StatsRing channelList={channelList} />
          </GridCol>
        </Grid>
      </Flex>
    </>
  );
}
