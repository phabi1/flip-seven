import { io, Socket } from 'socket.io-client';

const URL = process.env.NODE_ENV === 'production' ? 'https://api.example.com' : 'http://localhost:3000';

export const socket: Socket = io(URL + '/game');