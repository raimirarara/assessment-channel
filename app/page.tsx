import { Welcome } from '../components/Welcome/Welcome';
import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import Login from '@/components/Login/Login';
import Logout from '@/components/Logout/Logout';

export default function HomePage(page: { data: any }) {
  return (
    <>
      <Welcome />
      <ColorSchemeToggle />
      <Login />
      <Logout />
    </>
  );
}
