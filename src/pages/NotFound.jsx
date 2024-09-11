import { Link } from 'wouter'

function NotFound() {
  return (
    <div className="container mx-auto text-center mt-8">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="text-xl mb-4">Oops! The page you’re looking for doesn’t exist.</p>
      <Link href="/" className="bg-blue-500 text-white px-4 py-2 rounded">
        Go Home
      </Link>
    </div>
  )
}

export default NotFound