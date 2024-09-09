import api from './api'

export function login(credentials) {
  return api.post('/auth/login', credentials)
}

export function register(userData) {
  return api.post('/auth/register', userData)
}