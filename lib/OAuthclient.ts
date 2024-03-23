import { google } from 'googleapis';

const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URL
);

export const getOAuth2Client = (accessToken: string) => {
  oauth2Client.setCredentials({
    access_token: accessToken,
  });
  return oauth2Client;
};
