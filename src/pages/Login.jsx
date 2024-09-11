import { useState, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { login, loginMutation } = useContext(AuthContext)

  function handleSubmit(e) {
    e.preventDefault()
    console.log("Submitting login form with:", username, password)
    login({ username, password })
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
        <button 
          type="submit" 
          className="w-full bg-blue-500 text-white p-2 rounded"
          disabled={loginMutation.isLoading}
        >
          {loginMutation.isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  )
}

export default Login