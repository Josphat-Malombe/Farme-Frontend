import axios from 'axios';

const api = axios.create({
  baseURL: 'https://farme-backend.onrender.com/api',
});

// 1) Request interceptor: attach the access token
api.interceptors.request.use(config => {
  const token = localStorage.getItem('access');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});




export default api;

