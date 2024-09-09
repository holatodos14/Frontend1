import { useState } from 'react'
import { useLocation } from 'wouter'
import { useAuth } from '../hooks/useAuth'
import { login } from '../services/auth'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [, setLocation] = useLocation()
  const { login: authLogin } = useAuth()

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const response = await login({ username, password })
      authLogin(response.data.user)
      setLocation('/dashboard')
    } catch (error) {
      console.error('Login failed', error)
    }
  }

  return (
    <div className="container mx-auto mt-8">
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="w-full p-2 mb-4 border rounded"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full p-2 mb-4 border rounded"
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          Login
        </button>
      </form>
    </div>
  )
}

export default Login