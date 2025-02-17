import { Scene } from 'phaser';
import { Socket } from 'socket.io-client';
import { GameSceneData } from '../models/game-scene-data.model.js';
import { Table } from '../objects/table.js';
import { container } from '../services/container.js';

export class GameScene extends Scene {
  private socket: Socket;
  private gameId = '';
  private playerId = '';
  private table: Table;

  constructor() {
    super('game');
    this.socket = container.get<Socket>('socket');
    this.table = new Table(this);
  }

  create() {
    this.bindSocketEvents();
  }

  init(data: GameSceneData) {
    this.gameId = container.get('gameId');
    this.playerId = data.playerId;
    this.socket.emit('game', { gameId: this.gameId });
  }

  private bindSocketEvents() {
    this.socket.on('game', (data) => {
      const players = data.players;
      this.table.setPlayers(players);
    });

    this.socket.on('player-joined', (data) => {
      console.log(data);
    });

    this.socket.on('player-left', (data) => {
      console.log(data);
    });
  }
}
