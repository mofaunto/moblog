const prisma = require('../prisma');

const getAllPosts = async (req, res) => {
  try {
    const { published, sortBy } = req.query;
    const where = {};
    if (published !== undefined) {
      where.published = published === 'true';
    }

    const allowedSortFields = ['createdAt', 'likes', 'viewCount'];
    let orderBy = { createdAt: 'desc' };
    if (sortBy && allowedSortFields.includes(sortBy)) {
      orderBy = { [sortBy]: 'desc' };
    }

    const posts = await prisma.post.findMany({
      where,
      include: {
        author: {
          select: { id: true, ism: true, email: true }
        }
      },
      orderBy
    });
    res.json({ success: true, data: posts });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const getPostById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const post = await prisma.post.findUnique({
      where: { id },
      include: { author: true }
    });
    if (!post) {
      return res.status(404).json({ success: false, error: 'Post topilmadi' });
    }
    res.json({ success: true, data: post });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const createPost = async (req, res) => {
  try {
    const { title, content, published } = req.body;
    const authorId = req.user.userId;
    const post = await prisma.post.create({
      data: {
        title,
        content,
        authorId,
        published: published !== undefined ? published : false
      }
    });
    res.status(201).json({ success: true, data: post });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const updatePost = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const post = await prisma.post.findUnique({ where: { id } });

    if (post.authorId !== req.user.userId) {
      return res.status(403).json({
        success: false,
        error: 'Bu postni o‘zgartirishga ruxsatingiz yo‘q'
      });
    }

    await prisma.post.update({
      where: { id },
      data: req.body
    });
    res.json({ success: true, data: post });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const post = await prisma.post.findUnique({ where: { id } });

    if (!post) {
      return res.status(404).json({ success: false, error: 'Post topilmadi' });
    }

    if (post.authorId !== req.user.userId) {
      return res.status(403).json({
        success: false,
        error: 'Bu postni o‘chirishga ruxsatingiz yo‘q'
      });
    }

    await prisma.post.delete({ where: { id } });
    res.json({ success: true, data: { message: 'Post o‘chirildi' } });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost
};