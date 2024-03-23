import { currentUser } from '@clerk/nextjs';

import { google } from 'googleapis';
import { redirect } from 'next/navigation';

export async function getChannelStatistics() {
  const user = await currentUser();
  const YOUR_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
  const YOUR_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
  const YOUR_REDIRECT_URL = 'http://localhost:3000';
  const oauth2Client = new google.auth.OAuth2(
    YOUR_CLIENT_ID,
    YOUR_CLIENT_SECRET,
    YOUR_REDIRECT_URL
  );

  // Access scopes for read-only Drive activity.
  const scopes = ['https://www.googleapis.com/auth/youtube.readonly'];

  // Generate a url that asks permissions for the Drive activity scope
  const authorizationUrl = oauth2Client.generateAuthUrl({
    // 'online' (default) or 'offline' (gets refresh_token)
    access_type: 'offline',
    /** Pass in the scopes array defined above.
     * Alternatively, if only one scope is needed, you can pass a scope URL as a string */
    scope: scopes,
    // Enable incremental authorization. Recommended as a best practice.
    include_granted_scopes: true,
    response_type: 'code',
  });

  redirect(authorizationUrl);

  const response = await fetch(
    'https://www.googleapis.com/youtube/v3/channels?part=statistics&mine=true',
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  return response.json();
}
