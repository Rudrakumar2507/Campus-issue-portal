import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8080/api',
});

// Attach JWT token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth
export const register = (data) => API.post('/auth/register', data);
export const login = (data) => API.post('/auth/login', data);

// Issues
export const submitIssue = (data) => API.post('/issues', data);
export const getMyIssues = () => API.get('/issues/my');
export const getAllIssues = () => API.get('/issues');
export const updateIssueStatus = (id, status) => API.put(`/issues/${id}/status`, { status });

export default API;
