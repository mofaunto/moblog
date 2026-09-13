import client from './client';

export const registerUser = async (payload) => {
  const response = await client.post('/auth/register', payload);
  return response.data.data;
};

export const loginUser = async (payload) => {
  const response = await client.post('/auth/login', payload);
  return response.data.data;
};