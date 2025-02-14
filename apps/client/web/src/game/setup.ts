import {} from 'phaser';
import { PreloadScene } from './scenes/preload.scene';
import { GameScene } from './scenes/game.scene';
export function setup (container: string) {
    const config = {
        type: Phaser.AUTO,
        parent: container,
        width: 800,
        height: 600,
        scene: [PreloadScene, GameScene]
    }

    return new Phaser.Game(config);
}