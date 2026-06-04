import api from '../lib/api.js'

export function registerUser({ username, email, password }) {
  return api.post('/auth/register', { username, email, password })
}

export function loginUser({ email, password }) {
  return api.post('/auth/login', { email, password })
}
