import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.43.91:8000/api',
});

// 1) Request interceptor: attach the access token
api.interceptors.request.use(config => {
  const token = localStorage.getItem('access');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});




export default api;

