export class Handle extends Phaser.GameObjects.Container {
    constructor(
        scene: Phaser.Scene,
        x: number,
        y: number,
    ) {
        super(scene, x, y);
        this.scene.add.existing(this);
    }

    create() {
        
    }
}