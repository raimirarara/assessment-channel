import { getOAuth2Client } from '@/lib/OAuthclient';
import { google } from 'googleapis';

export async function fetchTopRevenueVideos(token: string) {
  const oauth2Client = getOAuth2Client(token);
  const youtubeAnalytics = google.youtubeAnalytics({ version: 'v2', auth: oauth2Client });
  try {
    const response = await youtubeAnalytics.reports.query({
      // チャンネルID (自分のチャンネルを指定する場合は'channel==MINE')
      ids: 'channel==MINE',
      // 分析開始日
      startDate: '2024-01-01',
      // 分析終了日
      endDate: '2024-12-31',
      // ディメンション：動画
      dimensions: 'day',
      // 必要なメトリクス：視聴回数、推定収益、広告収益、Redパートナー収益、総収益、広告インプレッション数、CPM、再生ベースのCPM、収益化再生回数
      metrics: 'views,estimatedMinutesWatched,averageViewDuration,averageViewPercentage',
      // 結果を推定収益の降順でソート
      // 取得する最大結果数
      maxResults: 10,
    });

    console.log(response.data);

    return response.data;
  } catch (error) {
    console.error('Error fetching top revenue videos:', error);
  }
}
