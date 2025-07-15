import { useAuth } from '@/context/AuthContext';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

function Home() {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <nav>
      {isAuthenticated ? (
        <>
          <span>Welcome, {user?.name}</span>
          <span>You are logged as {user?.email}</span>
          <Button onClick={logout}>Logout</Button>
        </>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </nav>
  );
}
export default Home;
