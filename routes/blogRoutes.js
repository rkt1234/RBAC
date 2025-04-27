import express from 'express';
import {
  createBlogController,
  getAllBlogsController,
  getBlogByIdController,
  updateBlogController,
  deleteBlogController,
} from '../controllers/blogController.js';

import { authenticateUser } from '../middlewares/authMiddleware.js';
import { authorizeRoles } from '../middlewares/roleMiddleware.js';

const router = express.Router();

// Public: View blogs (for any authenticated user)
router.get('/', authenticateUser, getAllBlogsController);
router.get('/:id', authenticateUser, getBlogByIdController);

// Admin Only: Create, Update, Delete blogs
router.post('/', authenticateUser, authorizeRoles('ADMIN'), createBlogController);
router.put('/:id', authenticateUser, authorizeRoles('ADMIN'), updateBlogController);
router.delete('/:id', authenticateUser, authorizeRoles('ADMIN'), deleteBlogController);

export default router;
