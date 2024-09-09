import axios from 'axios'

const API_URL = 'http://localhost:3000/api/'

const api = axios.create({
  baseURL: API_URL,
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export function getIncidents() {
  return api.get('/incidents')
}

export function createIncident(incidentData) {
  return api.post('/incidents', incidentData)
}

export function updateIncidentStatus(id, status) {
  return api.put(`/incidents/${id}`, { status })
}
export default api