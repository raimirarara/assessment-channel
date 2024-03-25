'use server';

import { fetchAnalyticsData } from "@/lib/fetchAnalyticsData";
import { JWT } from "next-auth/jwt";

export async function fetchYouTubeData(token: string) {
  const analyticsData = await fetchAnalyticsData(token);
  console.log('analyticsData:', analyticsData);
  return analyticsData;
}
