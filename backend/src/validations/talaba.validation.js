const { z } = require('zod');

const createTalabaSchema = z.object({
  ism: z.string().min(3, 'Ism kamida 3 ta belgidan iborat bo‘lishi kerak'),
  email: z.string().email('Email noto‘g‘ri formatda'),
  password: z.string().min(6, 'Parol kamida 6 ta belgidan iborat bo‘lishi kerak')
});

const updateTalabaSchema = z.object({
  ism: z.string().min(3, 'Ism kamida 3 ta belgidan iborat bo‘lishi kerak').optional(),
  email: z.string().email('Email noto‘g‘ri formatda').optional(),
  password: z.string().min(6, 'Parol kamida 6 ta belgidan iborat bo‘lishi kerak').optional()
});

module.exports = { createTalabaSchema, updateTalabaSchema };