import express from 'express';
import {
  createBlogController,
  getAllBlogsController,
  getBlogByIdController,
  updateBlogController,
  deleteBlogController
} from '../controllers/blogController.js';
import { authenticateUser } from '../middlewares/authMiddleware.js';
import { authorizeRoles } from '../middlewares/roleMiddleware.js';
import { validateRequest } from '../middlewares/validateRequest.js';
import { createBlogSchema, updateBlogSchema } from '../validators/blogValidator.js';

const router = express.Router();

router.get('/', authenticateUser, getAllBlogsController);
router.get('/:id', authenticateUser, getBlogByIdController);

router.post('/', authenticateUser, authorizeRoles('ADMIN'), validateRequest(createBlogSchema), createBlogController);
router.put('/:id', authenticateUser, authorizeRoles('ADMIN'), validateRequest(updateBlogSchema), updateBlogController);
router.delete('/:id', authenticateUser, authorizeRoles('ADMIN'), deleteBlogController);

export default router;
