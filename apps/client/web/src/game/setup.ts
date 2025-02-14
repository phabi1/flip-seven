import {} from 'phaser';
import { PreloadScene } from './scenes/preload.scene';
import { GameScene } from './scenes/game.scene';
export function setup(container: string) {
  const config = {
    type: Phaser.AUTO,
    parent: container,
    width: window.innerWidth,
    height: window.innerHeight,
    scene: [PreloadScene, GameScene],
    scale: {
      mode: Phaser.Scale.RESIZE,
      autoCenter: Phaser.Scale.CENTER_BOTH,
    },
  };

  const game = new Phaser.Game(config);

  const onChangeScreen = () => {
    game.scale.resize(window.innerWidth, window.innerHeight);
  };

  const _orientation =
    screen.orientation ||
    (screen as any).mozOrientation ||
    (screen as any).msOrientation;

  _orientation.addEventListener('change', () => onChangeScreen());

  window.addEventListener('resize', () => onChangeScreen());

  return game;
}
