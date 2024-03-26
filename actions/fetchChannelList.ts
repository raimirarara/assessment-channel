'use server';

import { getOAuth2Client } from '@/lib/OAuthclient';
import { google } from 'googleapis';
export async function fetchChannelList(accessToken: string) {
  const oauth2Client = getOAuth2Client(accessToken);
  // トークンを使ってYouTube APIを叩く
  const service = google.youtube('v3');
  // Promiseを使用して非同期処理を行う
  try {
    const response = await service.channels
      .list({
        auth: oauth2Client,
        part: ['snippet', 'statistics'],
        mine: true,
      })
      .then((res) => res.data);

    const channels = response.items;
    return channels;
  } catch (err) {
    console.log('The API returned an error: ' + err);
    return null; // エラーが発生した場合はnullを返す
  }
}
