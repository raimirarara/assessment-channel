import { google } from "googleapis";
import { getOAuth2Client } from "./OAuthclient";

export async function fetchAnalyticsData(token: string) {
    const oauth2Client = getOAuth2Client(token);
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
