import PropTypes from 'prop-types'

function IncidentList({ incidents = [] }) {
  if (!Array.isArray(incidents)) {
    console.error('Expected incidents to be an array, but received:', incidents)
    return <div>Error: Incidents data is not in the expected format.</div>
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Your Incidents</h2>
      <ul>
        {incidents.length === 0 ? (
          <li>No incidents available</li>
        ) : (
          incidents.map((incident) => (
            <li key={incident.id} className="mb-2 p-2 border rounded">
              <h3 className="font-bold">{incident.title}</h3>
              <p>{incident.description}</p>
              <p>Status: {incident.status}</p>
            </li>
          ))
        )}
      </ul>
    </div>
  )
}

IncidentList.propTypes = {
  incidents: PropTypes.array,
}

export default IncidentList
