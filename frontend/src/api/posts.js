import client from './client';

export const getPosts = async () => {
  const response = await client.get('/posts');
  return response.data.data;
};