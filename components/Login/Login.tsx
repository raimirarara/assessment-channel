'use client';
import { fetchYouTubeData } from '@/actions/fetchYoutubeData';
import { Button } from '@mantine/core';
import { useSession, signIn } from 'next-auth/react';

export default function Login() {
  const { data: session, status } = useSession();

  const handleClick = async () => {
    try {
      const response = await fetch('/api/youtube');
      const data = await response.json();
      console.log(data); // データの処理
    } catch (error) {
      console.error('データの取得に失敗しました', error);
    }
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status !== 'authenticated') {
    return (
      <div>
        <p>あなたはログインしていません</p>
        <button onClick={() => signIn()}>Googleでログイン</button>
      </div>
    );
  }
  return (
    <>
      <div>ようこそ、{session.user?.name}さん</div>
      <Button onClick={handleClick}>YouTube</Button>
    </>
  );
}
