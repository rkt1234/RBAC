import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createBlog = async (blogData, authorId) => {
  const blog = await prisma.blog.create({
    data: {
      ...blogData,
      authorId,
    },
  });
  return blog;
};

export const getAllBlogs = async () => {
  const blogs = await prisma.blog.findMany({
    include: {
      author: {
        select: { id: true, name: true, email: true },
      },
    },
  });
  return blogs;
};

export const getBlogById = async (id) => {
  const blog = await prisma.blog.findUnique({
    where: { id: parseInt(id) },
    include: {
      author: {
        select: { id: true, name: true, email: true },
      },
    },
  });
  return blog;
};

export const updateBlog = async (id, blogData) => {
  const blog = await prisma.blog.update({
    where: { id: parseInt(id) },
    data: blogData,
  });
  return blog;
};

export const deleteBlog = async (id) => {
  await prisma.blog.delete({
    where: { id: parseInt(id) },
  });
};
