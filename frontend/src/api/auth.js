import axios from 'axios';

const API = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/auth`,
});

export const signup = (userData) => API.post('/signup', userData);
export const login = (userData) => API.post('/login', userData);
