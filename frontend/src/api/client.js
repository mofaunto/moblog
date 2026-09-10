import axios from 'axios';
import { toast } from 'sonner';

const client = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 5000,
});

client.interceptors.response.use(
  (response) => response,
  (error) => {
    const data = error.response?.data;
    const message = data?.error || 'Serverda xatolik yuz berdi';

    toast.error(message);

    const customError = new Error(message);
    customError.details = data?.details || [];
    return Promise.reject(customError);
  }
);

export default client;