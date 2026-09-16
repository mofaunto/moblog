const prisma = require('../prisma');
const bcrypt = require('bcryptjs');

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


const getMe = async (req, res) => {
  try {
    const user = await prisma.talaba.findUnique({
      where: { id: req.user.userId },
      include: {
        _count: { select: { posts: true } }
      }
    });
    if (!user) {
      return res.status(404).json({ success: false, error: 'Foydalanuvchi topilmadi' });
    }
    const { password, ...userWithoutPassword } = user;
    res.json({ success: true, data: userWithoutPassword });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const createUser = async (req, res) => {
  try {
    const { ism, email, password } = req.body;

    const existing = await prisma.talaba.findUnique({ where: { email } });
    if (existing) {
      return res.status(400).json({
        success: false,
        error: 'Bu email allaqachon ro‘yxatdan o‘tgan'
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.talaba.create({
      data: { ism, email, password: hashedPassword }
    });

    const { password: _, ...userWithoutPassword } = user;
    res.status(201).json({ success: true, data: userWithoutPassword });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const existing = await prisma.talaba.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ success: false, error: 'Foydalanuvchi topilmadi' });
    }

    if (id !== req.user.userId) {
      return res.status(403).json({
        success: false,
        error: 'Boshqa foydalanuvchini o‘zgartirishga ruxsatingiz yo‘q'
      });
    }

    const data = {};
    if (req.body.ism !== undefined) data.ism = req.body.ism;
    if (req.body.email !== undefined) data.email = req.body.email;

    if (req.body.password) {
      data.password = await bcrypt.hash(req.body.password, 10);
    }

    const user = await prisma.talaba.update({
      where: { id },
      data
    });

    const { password: _, ...userWithoutPassword } = user;
    res.json({ success: true, data: userWithoutPassword });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const existing = await prisma.talaba.findUnique({ where: { id } });
    if (!existing) {
      return res.status(404).json({ success: false, error: 'Foydalanuvchi topilmadi' });
    }

    if (id !== req.user.userId) {
      return res.status(403).json({
        success: false,
        error: 'Boshqa foydalanuvchini o‘chirishga ruxsatingiz yo‘q'
      });
    }

    await prisma.talaba.delete({ where: { id } });
    res.json({ success: true, data: { message: 'Foydalanuvchi o‘chirildi' } });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const uploadAvatar = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'Fayl yuklanmadi'
      });
    }

    const avatarPath = `/uploads/${req.file.filename}`;

    const user = await prisma.talaba.update({
      where: { id: req.user.userId },
      data: { avatar: avatarPath }
    });

    const { password: _, ...userWithoutPassword } = user;

    res.json({
      success: true,
      data: {
        user: userWithoutPassword,
        avatar: avatarPath
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  getMe,
  createUser,
  updateUser,
  deleteUser,
  uploadAvatar
};