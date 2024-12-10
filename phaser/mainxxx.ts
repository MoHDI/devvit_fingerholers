import Phaser from 'phaser';

class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MainScene' });
  }

  preload(): void {
    // Load assets
    this.load.image('logo', 'assets/crews/crew_1.png'); // Ensure you have a logo.png in the assets folder
  }

  create(): void {
    // Add a sprite
    this.add.image(400, 300, 'logo');

    // Add some text
    this.add.text(400, 500, 'Hello, Phaser!', { font: '32px Arial', color: '#ffffff' }).setOrigin(0.5);
  }

  update(): void {
    // Update game logic here
  }
}

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: 'phaser-game',
  width: 800,
  height: 600,
  backgroundColor: '#000000',
  scene: [MainScene],
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  }
};

const game = new Phaser.Game(config);