import { AuthenticationForm } from '@/components/AuthenticationForm';
import { authOptions } from '@/lib/OAuthclient';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function SignInPage() {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect('/');
  }
  return (
    <div>
      <AuthenticationForm />
    </div>
  );
}
