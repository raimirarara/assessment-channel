'use server';
import { NextApiRequest } from 'next';
import { getToken } from 'next-auth/jwt';

// APIルートまたはgetServerSideProps内で使用
const secret = process.env.NEXTAUTH_SECRET;

export async function fetchYouTubeData({ req }: { req: NextApiRequest }) {
  const token = await getToken({ req, secret });
  console.log('called');
  if (token) {
    // トークンを使ってYouTube APIを叩く
    const response = await fetch(
      'https://www.googleapis.com/youtube/v3/channels?part=id&mine=true',
      {
        headers: {
          Authorization: `Bearer ${token.accessToken}`,
        },
      }
    );
    const data = await response.json();
    return data;
  }
  return null;
}
