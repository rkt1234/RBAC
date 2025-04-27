import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import blogRoutes from './routes/blogRoutes.js';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);

// Health Check
app.get('/', (req, res) => {
  res.send('RBAC Blog Platform Backend is Running!');
});

export default app;
