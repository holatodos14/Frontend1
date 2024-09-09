import { Link } from 'wouter'
import { useQuery } from '@tanstack/react-query'
import { getIncidents } from '../../services/api'
import IncidentList from '../../components/IncidentList'

function Dashboard() {
  const { data: incidents, isLoading, error } = useQuery({
    queryKey: ['incidents'],
    queryFn: getIncidents
  })

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading incidents: {error.message}</div>

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>
      <Link href="/report-incident" className="bg-green-500 text-white px-4 py-2 rounded mb-4 inline-block">
        Report New Incident
      </Link>
      <IncidentList incidents={incidents} />
    </div>
  )
}

export default Dashboard