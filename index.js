import express from 'express';
import {PrismaClient} from './generated/prisma/index.js';

import dotenv from 'dotenv';
dotenv.config();

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.get('/users', async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.get('/users/:id', async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.params.id },
    include: { posts: true },
  });
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json(user);
});

app.post('/users', async (req, res) => {
  const { firstName, lastName, emailAddress, username } = req.body;
  try {
    const newUser = await prisma.user.create({
      data: { firstName, lastName, emailAddress, username },
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/posts', async (req, res) => {
  const posts = await prisma.post.findMany({
    where: { isDeleted: false },
    include: { author: true },
  });
  res.json(posts);
});

app.get('/posts/:id', async (req, res) => {
  const post = await prisma.post.findUnique({
    where: { id: req.params.id },
    include: { author: true },
  });
  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }
  res.json(post);
});

app.post('/posts', async (req, res) => {
  const { title, content, authorId } = req.body;
  try {
    const newPost = await prisma.post.create({
      data: { title, content, authorId },
    });
    res.status(201).json(newPost);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.put('/posts/:id', async (req, res) => {
  const { title, content } = req.body;
  try {
    const updatedPost = await prisma.post.update({
      where: { id: req.params.id },
      data: { title, content },
    });
    res.json(updatedPost);
  } catch (error) {
    res.status(400).json({ error: 'Post not found or update failed' });
  }
});

app.delete('/posts/:id', async (req, res) => {
  try {
    const deletedPost = await prisma.post.update({
      where: { id: req.params.id },
      data: { isDeleted: true },
    });
    res.json({ message: 'Post marked as deleted', post: deletedPost });
  } catch (error) {
    res.status(400).json({ error: 'Post not found or delete failed' });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(` Server running on http://localhost:${PORT}`);
});