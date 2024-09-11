import { Link } from 'wouter';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function Header() {
  const { user, logout, logoutMutation } = useContext(AuthContext);

  const handleLogout = () => {
    if (logoutMutation && typeof logoutMutation === 'function') {
      logoutMutation();
    } else {
      console.error('logoutMutation is not a function');
      logout();
    }
  };

  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">Incident Tracker</Link>
        <nav>
          {user ? (
            <>
              <Link href="/dashboard" className="mr-4">Dashboard</Link>
              <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded">Logout</button>
            </>
          ) : (
            <Link href="/login" className="bg-green-500 px-4 py-2 rounded">Login</Link>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
