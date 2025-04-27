import { createServer } from 'http';
import { Server } from 'socket.io';
import app from './app.js';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 5000;

// Create HTTP server manually
const server = createServer(app);

// Create WebSocket server
export const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"]
  }
});


// Listen to WebSocket connections
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Start HTTP + WebSocket server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
