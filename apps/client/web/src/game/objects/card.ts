export class Card extends Phaser.GameObjects.Image {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string | Phaser.Textures.Texture,
    frame?: string | number
  ) {
    super(scene, x, y, texture, frame);
    this.setInteractive();
    this.setScale(0.5);
    this.scene.add.existing(this);
  }
}
