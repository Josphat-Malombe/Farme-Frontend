export function isAuthenticated() {
  return !!localStorage.getItem('token')
}

export function saveAuth(token, user) {
  if (token) {
    localStorage.setItem('token', token)
  }
  if (user) {
    localStorage.setItem('user', JSON.stringify(user))
  }
}

export function getUser() {
  try {
    const user = localStorage.getItem('user')
    if (!user || user === 'undefined') return null
    return JSON.parse(user)
  } catch (e) {
    console.error('Failed to parse user from localStorage:', e)
    return null
  }
}

export function logout() {
  localStorage.removeItem('user')
  localStorage.removeItem('token')
}
