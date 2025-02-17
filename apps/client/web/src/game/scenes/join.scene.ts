import { Socket } from 'socket.io-client';
import { container } from '../services/container';
import { GameSceneData } from '../models/game-scene-data.model';

export class JoinScene extends Phaser.Scene {
  constructor() {
    super({ key: 'join' });
  }

  create() {
    const socket = container.get<Socket>('socket');
    const gameId = container.get('gameId');

    let playerId = localStorage.getItem('game:' + gameId + ':player');

    if (playerId) {
      this.redirectToGame(playerId);
    }

    const onJoined = (data: any) => {
      localStorage.setItem('game:' + gameId + ':player', data.playerId);
      socket.off('join', onJoined);
      this.redirectToGame(data.playerId);
    };

    socket.on('join', onJoined);
    socket.emit('join', {
      gameId,
      name: 'player 1',
    });
  }

  redirectToGame(playerId: string) {
    this.scene.start('game', { playerId } as GameSceneData);
  }
}
