import { Scene } from 'phaser';

export class PreloadScene extends Scene {
  constructor() {
    super('preload');
  }

  preload() {
    this.load.image('logo', 'assets/images/logo.png');
  }

  create() {
    this.add.image(400, 300, 'logo');
  }
}
