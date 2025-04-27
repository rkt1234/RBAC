import {
    createBlog,
    getAllBlogs,
    getBlogById,
    updateBlog,
    deleteBlog,
  } from '../services/blogService.js';
import { io } from '../server.js';


  
  export const createBlogController = async (req, res) => {
    try {
      const blog = await createBlog(req.body, req.user.id);
      io.emit('blog_created', blog);
      res.status(201).json({ message: 'Blog created successfully', blog });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  export const getAllBlogsController = async (req, res) => {
    try {
      const blogs = await getAllBlogs();
      res.status(200).json({ blogs });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  export const getBlogByIdController = async (req, res) => {
    try {
      const blog = await getBlogById(req.params.id);
      if (!blog) {
        return res.status(404).json({ message: 'Blog not found' });
      }
      res.status(200).json({ blog });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  export const updateBlogController = async (req, res) => {
    try {
      const blog = await updateBlog(req.params.id, req.body);
      io.emit('blog_updated', blog);
      res.status(200).json({ message: 'Blog updated successfully', blog });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  export const deleteBlogController = async (req, res) => {
    try {
      await deleteBlog(req.params.id);
      io.emit('blog_deleted', req.params.id);
      res.status(200).json({ message: 'Blog deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  