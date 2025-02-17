import { Input, Scene } from 'phaser';

export class PreloadScene extends Scene {
  constructor() {
    super('preload');
  }

  preload() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    this.add.rectangle(0, 0, width, height, 0x56aaa9);

    const progressBar = this.add.graphics();
    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(240, 270, 320, 50);

    const loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        color: '#ffffff',
      },
    });
    loadingText.setOrigin(0.5, 0.5);

    const percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: '0%',
      style: {
        font: '18px monospace',
        color: '#ffffff',
      },
    });
    percentText.setOrigin(0.5, 0.5);

    const assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 50,
      text: '',
      style: {
        font: '18px monospace',
        color: '#ffffff',
      },
    });
    assetText.setOrigin(0.5, 0.5);

    this.load.on('progress', function (value: number) {
      percentText.setText(value * 100 + '%');
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(250, 280, 300 * value, 30);
    });

    this.load.on('fileprogress', function (file: any) {
      assetText.setText('Loading asset: ' + file.key);
    });
    this.load.on('complete', function () {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      percentText.destroy();
      assetText.destroy();
    });

    this.load.image('logo', 'images/logo.png');
    for (let i = 0; i < 1000; i++) {
      this.load.image('logo' + i, 'images/logo.png');
    }
  }

  create() {
    const logo = this.add.image(400, 300, 'logo');
    logo.setInteractive();
    logo.on(Input.Events.POINTER_DOWN, () => {
      this.scene.start('join');
    });
  }
}
