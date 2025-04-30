import axios from 'axios';
import Cookies from "js-cookie";

const instance = axios.create({
  baseURL: 'http://74.208.201.97:3000',
  headers: { 'Content-Type': 'application/json' },
});

instance.interceptors.request.use(config => {
  const token = Cookies.get('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

instance.interceptors.response.use(response => {
  console.log('🚀 ~ response:', response);
  return response.data;
});

export const http = instance;

export default http;
