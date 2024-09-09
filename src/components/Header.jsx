import { Link } from 'wouter'
import { useAuth } from '../hooks/useAuth'

function Header() {
  const { user, logout } = useAuth()

  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">Incident Tracker</Link>
        <nav>
          {user ? (
            <>
              <Link href="/dashboard" className="mr-4">Dashboard</Link>
              <button onClick={logout} className="bg-red-500 px-4 py-2 rounded">Logout</button>
            </>
          ) : (
            <Link href="/login" className="bg-green-500 px-4 py-2 rounded">Login</Link>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Header