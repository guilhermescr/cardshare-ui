import { io } from 'socket.io-client';

const socket = io(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3033', {
  auth: (cb) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      cb({ token });
    } else {
      cb({ token: null });
    }
  },
  transports: ['websocket'],
});

socket.on('connect', () => {
  if (typeof window !== 'undefined') {
    const userId = localStorage.getItem('userId');
    if (userId) {
      socket.emit('join', userId);
    }
  }
});

export default socket;
