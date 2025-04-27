import { io } from 'socket.io-client';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

let socket;

// Prevent multiple sockets in hot reload (development mode)
if (!socket) {
  socket = io(BACKEND_URL, {
    transports: ['websocket'],
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 2000,
  });
}

// Very important: attach socket to window (for dev)
if (true) {
  if (!window.socket) {
    window.socket = socket;
  } else {
    socket = window.socket; // Reuse old socket during hot reload
  }
}

export default socket;
