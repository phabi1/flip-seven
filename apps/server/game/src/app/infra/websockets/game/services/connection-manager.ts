import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';

@Injectable()
export class ConnectionManager {
  private connections: Map<string, Socket> = new Map();

  addConnection(key: string, client: Socket) {
    this.connections.set(key, client);
  }

  removeConnection(key: string) {
    this.connections.delete(key);
  }

  getConnection(key: string): Socket {
    if (this.connections.has(key)) {
      return this.connections.get(key) as Socket;
    }
    throw new Error('Connection not found');
  }
}
