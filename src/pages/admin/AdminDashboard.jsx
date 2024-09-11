import { Link } from 'wouter'
import { useQuery } from '@tanstack/react-query'
import { getIncidents } from '../../services/api'
import IncidentList from '../../components/IncidentList'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'

function AdminDashboard() {
  const { data: incidents, isLoading, error } = useQuery({
    queryKey: ['incidents'],
    queryFn: getIncidents
  })

  const { user, logout, logoutMutation } = useContext(AuthContext)
  const isLoggingOut = logoutMutation.isLoading;

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading incidents: {error.message}</div>

  return (
    <div className="container mx-auto mt-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <div>
          <span className="mr-4">Welcome, {user.username}</span>
          <button 
            onClick={logout} 
            disabled={isLoggingOut}
            className="bg-red-500 text-white px-4 py-2 rounded disabled:bg-red-300"
          >
            {isLoggingOut ? 'Logging out...' : 'Logout'}
          </button>
        </div>
      </div>
      <Link href="/admin/manage-incidents" className="bg-blue-500 text-white px-4 py-2 rounded mb-4 inline-block">
        Manage Incidents
      </Link>
      <IncidentList incidents={incidents} />
    </div>
  )
}

export default AdminDashboard
