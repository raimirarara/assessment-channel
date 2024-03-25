import { getOAuth2Client } from '@/lib/OAuthclient';
import { google } from 'googleapis';
import { NextApiRequest } from 'next';
import { JWT, getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

// APIルートまたはgetServerSideProps内で使用
const secret = process.env.NEXTAUTH_SECRET;

export const dynamic = 'force-dynamic'; // defaults to auto
export async function GET(req: NextApiRequest) {
  const token = await getToken({ req, secret });
  if (token) {
    const channels = await fetchYouTubeData(token);
    console.log('channels:', channels);
    const reportTypes = await getReportTypes(token);
    console.log('reportTypes:', reportTypes);

    // const createdJob = await createJob(token);
    // console.log('createdJob:', createdJob);

    const jobs = await listJobs(token);
    console.log('jobs:', jobs);

    const analyticsData = await fetchAnalyticsData(token);
    console.log('analyticsData:', analyticsData);

    return NextResponse.json(channels);
  } else {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}

export async function fetchYouTubeData(token: JWT) {
  const oauth2Client = getOAuth2Client(token.accessToken as string);
  // トークンを使ってYouTube APIを叩く
  const service = google.youtube('v3');
  // Promiseを使用して非同期処理を行う
  try {
    const response = await service.channels
      .list({
        auth: oauth2Client,
        part: ['snippet', 'contentDetails', 'statistics'],
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

// YouTube Reporting APIへのリクエスト実行
async function getReportTypes(token: JWT) {
  try {
    const oauth2Client = getOAuth2Client(token.accessToken as string);
    const response = await oauth2Client.request({
      url: 'https://youtubereporting.googleapis.com/v1/reportTypes',
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('The API returned an error: ', error);
    return null;
  }
}

async function createJob(token: JWT) {
  try {
    const oauth2Client = getOAuth2Client(token.accessToken as string);
    const response = await oauth2Client.request({
      url: 'https://youtubereporting.googleapis.com/v1/jobs',
      method: 'POST',
      data: {
        name: 'MyFirstJob', // ジョブの名前
        reportTypeId: 'channel_demographics_a1', // レポートタイプID
        // 他に必要なパラメータがあればここに追加
      },
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('Job created:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('Failed to create job:', error.response ? error.response.data : error);
    return null;
  }
}

async function listJobs(token: JWT) {
  try {
    const oauth2Client = getOAuth2Client(token.accessToken as string);
    const res = await oauth2Client.request({
      url: 'https://youtubereporting.googleapis.com/v1/jobs',
      method: 'GET', // HTTPメソッド
    });

    console.log('Jobs list:', res.data);
    return res.data; // ジョブリストを返す
  } catch (err: any) {
    console.error('Failed to retrieve jobs list:', err.message);
    return null; // エラーが発生した場合はnullを返す
  }
}

async function fetchAnalyticsData(token: JWT) {
  const oauth2Client = getOAuth2Client(token.accessToken as string);
  const youtubeAnalytics = google.youtubeAnalytics({ version: 'v2', auth: oauth2Client });

  try {
    const response = await youtubeAnalytics.reports.query({
      // チャンネルID (自分のチャンネルを指定する場合は'channel==MINE')
      endDate: '2024-12-31', // 終了日
      ids: 'channel==MINE', // 自分のチャンネルIDを指定
      metrics: 'views,estimatedMinutesWatched', // 取得したいメトリック
      startDate: '2024-01-01', // 開始日
    });

    console.log(response.data);
    return response.data;
  } catch (error: any) {
    console.error('The API returned an error: ', error.message);
    throw error; // エラーを再スローして、呼び出し側で処理できるようにする
  }
}
