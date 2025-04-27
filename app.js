import express from 'express';
import cors from 'cors';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes (we will attach soon)

// Health Check
app.get('/', (req, res) => {
  res.send('RBAC Blog Platform Backend is Running!');
});

export default app;
