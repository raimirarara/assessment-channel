import { getOAuth2Client } from '@/lib/OAuthclient';
import { google } from 'googleapis';
import { NextApiRequest } from 'next';
import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

// APIルートまたはgetServerSideProps内で使用
const secret = process.env.NEXTAUTH_SECRET;

export const dynamic = 'force-dynamic'; // defaults to auto
export async function GET(request: NextApiRequest) {
  const data = await fetchYouTubeData({ req: request });
  console.log(JSON.stringify(data));
  return NextResponse.json(data);
}

export async function fetchYouTubeData({ req }: { req: NextApiRequest }) {
  const token = await getToken({ req, secret });

  console.log('called');
  if (token) {
    const oauth2Client = getOAuth2Client(token.accessToken as string);
    // トークンを使ってYouTube APIを叩く
    const service = google.youtube('v3');
    service.channels.list(
      {
        auth: oauth2Client,
        part: [' snippet', 'contentDetails', 'statistics'],
        forUsername: 'GoogleDevelopers',
      },
      function (err: any, response: any) {
        if (err) {
          console.log('The API returned an error: ' + err);
          return;
        }
        var channels = response.data.items;
        if (channels.length == 0) {
          console.log('No channel found.');
        } else {
          console.log(
            "This channel's ID is %s. Its title is '%s', and " + 'it has %s views.',
            channels[0].id,
            channels[0].snippet.title,
            channels[0].statistics.viewCount
          );
        }
      }
    );
  }
  return null;
}
