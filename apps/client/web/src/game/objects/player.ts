export class Player extends Phaser.GameObjects.Text {
  constructor(scene: Phaser.Scene, x: number, y: number, name: string) {
    super(scene, x, y, name, { color: '#ffffff' });
    scene.add.existing(this);

    this.data.set('playerId', name);
  }
}
