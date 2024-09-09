/* eslint-disable react/prop-types */

function IncidentList({ incidents }) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Your Incidents</h2>
      <ul>
        {incidents.map((incident) => (
          <li key={incident.id} className="mb-2 p-2 border rounded">
            <h3 className="font-bold">{incident.title}</h3>
            <p>{incident.description}</p>
            <p>Status: {incident.status}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default IncidentList