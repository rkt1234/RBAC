import axios from 'axios';

const API = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/blogs`,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const fetchBlogs = () => API.get('/');

export const createBlog = (blogData) => API.post('/', blogData);

export const updateBlog = (id, updatedData) => API.put(`/${id}`, updatedData);

export const deleteBlog = (id) => API.delete(`/${id}`);