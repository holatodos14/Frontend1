import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getIncidents, updateIncidentStatus } from '../../services/api'

function ManageIncidents() {
  const queryClient = useQueryClient()
  const { data: incidents, isLoading, error } = useQuery({
    queryKey: ['incidents'],
    queryFn: getIncidents
  })

  const mutation = useMutation({
    mutationFn: updateIncidentStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['incidents'] })
    },
  })

  const handleStatusChange = (id, newStatus) => {
    mutation.mutate({ id, status: newStatus })
  }

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error loading incidents: {error.message}</div>

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Manage Incidents</h1>
      <ul>
        {incidents.map((incident) => (
          <li key={incident.id} className="mb-4 p-4 border rounded">
            <h2 className="font-bold">{incident.title}</h2>
            <p>{incident.description}</p>
            <p>Current Status: {incident.status}</p>
            <select
              value={incident.status}
              onChange={(e) => handleStatusChange(incident.id, e.target.value)}
              className="mt-2 p-2 border rounded"
            >
              <option value="open">Open</option>
              <option value="in progress">In Progress</option>
              <option value="closed">Closed</option>
            </select>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ManageIncidents