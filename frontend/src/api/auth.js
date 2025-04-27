import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api/auth', // Your backend URL
});

export const signup = (userData) => API.post('/signup', userData);
export const login = (userData) => API.post('/login', userData);
