import axios from 'axios';
import { toast } from 'sonner';

const client = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 5000,
});

client.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

client.interceptors.response.use(
  (response) => response,
  (error) => {
    const data = error.response?.data;
    const message = data?.error || 'Serverda xatolik yuz berdi';

    const url = error.config?.url || '';
    const isAuthEndpoint = url.includes('/auth/login') || url.includes('/auth/register');

    if (!isAuthEndpoint) {
      toast.error(message);
    }

    const customError = new Error(message);
    customError.details = data?.details || [];
    return Promise.reject(customError);
  }
);

export default client;