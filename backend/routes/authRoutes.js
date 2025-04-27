import express from 'express';
import { signupController, loginController } from '../controllers/authController.js';
import { validateRequest } from '../middlewares/validateRequest.js';
import { signupSchema, loginSchema } from '../validators/authValidator.js';

const router = express.Router();

router.post('/signup', validateRequest(signupSchema), signupController);
router.post('/login', validateRequest(loginSchema), loginController);

export default router;
