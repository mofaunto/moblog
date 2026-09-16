const path = require('path');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const talabaRoutes = require('./src/routes/talaba.routes');
const postRoutes = require('./src/routes/post.routes');
const authRoutes = require('./src/routes/auth.routes');

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/talabalar', talabaRoutes);
app.use('/posts', postRoutes);
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
  res.json({ success: true, message: 'Blog API ishlamoqda' });
});

module.exports = app;