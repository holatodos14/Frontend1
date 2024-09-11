import axios from 'axios'

const API_URL = 'http://localhost:3000/api/'

export const login = async (data) => {
  try {
    const res = await axios.post('http://localhost:3000/api/auth/login', data)
    return res.data
  } catch (error) {
    console.error('Error logging in:', error.response ? error.response.data : error.message)
    throw error
  }
}

export const getMyInformation = async () => {
  try {
    const token = localStorage.getItem('tokenLogin');
    if (!token) {
      throw new Error('No authentication token found');
    }
    
    const info = await axios.get('http://localhost:3000/api/auth/me', {
      headers: { Authorization: token },
    });
    
    return info.data;
  } catch (error) {
    console.error('Error fetching user information:', error.response ? error.response.data : error.message);
    throw error;
  }
};

export const getIncidents = async () => {
  try {
    const incidents = await axios.get('http://localhost:3000/api/incidents')
    return incidents.data
  } catch (error) {
    console.error('Error fetching incidents:', error.response ? error.response.data : error.message)
    throw error
  }
}

export const createIncident = async (data) => {
  try {
    const createIncident = await axios.post('http://localhost:3000/api/incidents/', data)
    return createIncident.data
  } catch (error) {
    console.error('Error creating incident:', error.response ? error.response.data : error.message)
    throw error
  }
}

// Modified updateIncidentStatus using axios directly
export const updateIncidentStatus = async (id, status) => {
  try {
    const response = await axios.put(`${API_URL}/incidents/${id}`, { status })
    return response.data
  } catch (error) {
    console.error(`Error updating status for incident ${id}:`, error.response ? error.response.data : error.message)
    throw error
  }
}
