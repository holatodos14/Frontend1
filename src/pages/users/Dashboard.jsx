import { Link } from 'wouter'
import { useQuery } from '@tanstack/react-query'
import { getIncidents } from '../../services/api'
import IncidentList from '../../components/IncidentList'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'

function Dashboard() {
  const { user } = useContext(AuthContext)

  const { data: incidents, isLoading: isLoadingIncidents, error } = useQuery({
    queryKey: ['incidents'],
    queryFn: getIncidents,
    enabled: !!user, // Only run the query if there's a user
  })

  if (!user) {
    return <div>Loading user data...</div>
  }

  if (isLoadingIncidents) return <div>Loading incidents...</div>
  if (error) return <div>Error loading incidents: {error.message}</div>

  return (
    <div className="container mx-auto mt-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">User Dashboard</h1>
        <div>
          <span className="mr-4">Welcome, {user.username}</span>
        </div>
      </div>
      <Link href="/report-incident" className="bg-green-500 text-white px-4 py-2 rounded mb-4 inline-block">
        Report New Incident
      </Link>
      {incidents && <IncidentList incidents={incidents} />}
    </div>
  )
}

export default Dashboard
