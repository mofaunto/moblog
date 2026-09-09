const prisma = require('../prisma');

const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.talaba.findMany({
      include: {
        _count: { select: { posts: true } }
      }
    });
    res.json({ success: true, data: users });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const user = await prisma.talaba.findUnique({
      where: { id },
      include: {
        posts: true,
        _count: { select: { posts: true } }
      }
    });
    if (!user) {
      return res.status(404).json({ success: false, error: 'Foydalanuvchi topilmadi' });
    }
    res.json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const createUser = async (req, res) => {
  try {
    const { ism, email, password } = req.body;
    const user = await prisma.talaba.create({
      data: { ism, email, password }
    });
    res.status(201).json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const user = await prisma.talaba.update({
      where: { id },
      data: req.body
    });
    res.json({ success: true, data: user });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await prisma.talaba.delete({ where: { id } });
    res.json({ success: true, data: { message: 'Foydalanuvchi o\'chirildi' } });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
};