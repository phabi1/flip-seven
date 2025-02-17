import { } from 'phaser';
import { Socket } from 'socket.io-client';
import { GameScene } from './scenes/game.scene';
import { JoinScene } from './scenes/join.scene';
import { PreloadScene } from './scenes/preload.scene';
import { container } from './services/container';

export function setup(id: string, socket: Socket, containerId: string = 'game') {
  if (typeof window === 'undefined') {
    return null;
  }

  container.set('gameId', id);
  container.set('socket', socket);

  const config = {
    type: Phaser.AUTO,
    parent: containerId,
    width: window.innerWidth,
    height: window.innerHeight,
    scene: [PreloadScene, JoinScene, GameScene],
    scale: {
      
    }
  };

  const game = new Phaser.Game(config);

  return game;
}
