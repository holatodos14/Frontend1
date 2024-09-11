import { useState, useContext } from 'react'
import { useLocation } from 'wouter'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createIncident } from '../../services/api'
import { AuthContext } from '../../context/AuthContext'

function ReportIncident() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [location, setLocation] = useState('')
  const [, setLocationHook] = useLocation()
  const queryClient = useQueryClient()
  const { user } = useContext(AuthContext)

  const mutation = useMutation({
    mutationFn: createIncident,
    onSuccess: () => {
      queryClient.invalidateQueries('incidents')
      setLocationHook('/dashboard')
    },
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    mutation.mutate({ title, description, location, userId: user.id })
  }

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Report New Incident</h1>
      <form onSubmit={handleSubmit} className="max-w-md">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Incident Title"
          className="w-full p-2 mb-4 border rounded"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Incident Description"
          className="w-full p-2 mb-4 border rounded"
        />
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Location"
          className="w-full p-2 mb-4 border rounded"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Submit Incident
        </button>
      </form>
    </div>
  )
}

export default ReportIncident