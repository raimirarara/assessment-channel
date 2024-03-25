import { getServerSession } from 'next-auth';
import { Flex, Grid, GridCol } from '@mantine/core';
import { Navbar } from '@/components/Navbar/Navbar';
import { authOptions } from './api/auth/[...nextauth]/route';
import { StatsGrid } from '@/components/StatsGrid/StatsGrid';
import { StatsRing } from '@/components/StatsRIng';
import { fetchYouTubeData } from '@/actions/fetchYoutubeData';
import { redirect } from 'next/navigation';

export default async function HomePage() {
  const session = await getServerSession(authOptions);
  console.log(session);
  if(!session){
    redirect('/signin');
  }
  const youtubeData = await fetchYouTubeData(session?.token);
  console.log("youtubeData", youtubeData);
  return (
    <>
        <Flex>
        <Navbar />
        <Grid gutter="xs">
          <GridCol><StatsGrid /></GridCol>
          <GridCol><StatsRing view={youtubeData.rows[0][0]} /></GridCol>
        </Grid>
        </Flex>
    </>
  );
}
