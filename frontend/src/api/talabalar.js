import client from './client';

export const getTalabalar = async () => {
  const response = await client.get('/talabalar');
  return response.data.data;
};

export const getTalabaById = async (id) => {
  const response = await client.get(`/talabalar/${id}`);
  return response.data.data;
};

export const createTalaba = async (talaba) => {
  const response = await client.post('/talabalar', talaba);
  return response.data.data;
};

export const updateTalaba = async (id, talaba) => {
  const response = await client.put(`/talabalar/${id}`, talaba);
  return response.data.data;
};

export const deleteTalaba = async (id) => {
  const response = await client.delete(`/talabalar/${id}`);
  return response.data.data;
};