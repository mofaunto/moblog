import client from './client';

export const getTalabalar = async () => {
  const response = await client.get('/talabalar');
  return response.data.data;
};