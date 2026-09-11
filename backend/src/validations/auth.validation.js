const { z } = require('zod');

const registerSchema = z.object({
  ism: z.string().min(3, 'Ism kamida 3 ta belgidan iborat bo‘lishi kerak'),
  email: z.string().email('Email noto‘g‘ri formatda'),
  password: z.string().min(6, 'Parol kamida 6 ta belgidan iborat bo‘lishi kerak')
});

const loginSchema = z.object({
  email: z.string().email('Email noto‘g‘ri formatda'),
  password: z.string().min(1, 'Parol kiritilishi shart')
});

module.exports = { registerSchema, loginSchema };