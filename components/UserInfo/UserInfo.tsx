import { Title, Text, Anchor, Button, Group } from '@mantine/core';
import { auth, currentUser } from '@clerk/nextjs';
import { getChannelStatistics } from '@/actions/getChannelStatistics';

export default async function UserInfo() {
  // Get the userId from auth() -- if null, the user is not signed in
  const { userId } = auth();
  if (userId) {
    // Query DB for user specific information or display assets only to signed in users
  }
  const user = await currentUser();

  const statistics = await getChannelStatistics();
  return (
    <>
      <Text inherit variant="gradient" component="span" gradient={{ from: 'pink', to: 'yellow' }}>
        {JSON.stringify(user)}
      </Text>
      {JSON.stringify(statistics)}
    </>
  );
}
