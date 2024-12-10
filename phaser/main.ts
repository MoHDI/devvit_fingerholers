import Phaser from 'phaser';

// import { BootScene } from './scenes/BootScene';
// import { LoaderScene } from './scenes/LoaderScene';
// import { NewScene } from './scenes/NewScene'; // Import the NewScene class

// Define the main scene
class MainScene extends Phaser.Scene {
  private ball!: Phaser.Physics.Arcade.Sprite;
  private hand!: Phaser.GameObjects.Sprite;
  private pigs!: Phaser.GameObjects.Sprite;

  constructor() {
    super({ key: 'MainScene' });
  }

  preload(): void {
    // Load any assets required for the main scene
    this.load.image('ball', 'assets/heart.gif');
    this.load.image('hand', 'assets/hand.png');
    this.load.image('pigs', 'assets/crews/crew_1.png');
    this.load.image('machine', 'assets/small_400.png');
    this.load.image('club', 'assets/club_400x240.png');
  }
  create(): void {
    // Add the ball sprite
    this.add.sprite(200, 120, 'club');
    this.ball = this.physics.add.sprite(200, 300, 'pigs');
    this.ball.setSize(30, 30);
    // Add bouncing properties
    this.ball.setCollideWorldBounds(true);
    this.ball.setBounce(1);
    this.ball.setVelocity(150, 150);
    this.add.sprite(200, 120, 'ball');

    // Add a button to switch to the new scene
    // const switchButton = this.add.text(10, 10, 'Enter A-Hole', { color: '#0f0' });
    // switchButton.setInteractive();
    // switchButton.on('pointerdown', () => {
    //   // this.scene.start('NewScene');
    // });
  }

  update(): void {
    // Update game logic here
  }
}

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: 'phaser-game',
  width: 400,
  height: 240,
  backgroundColor: '#000000',
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
      gravity: { x: 0, y: 200 },
    },
  },
 
  // scene: [BootScene, LoaderScene, MainScene, NewScene], 
  scene: [MainScene],
  scale: {
    mode: Phaser.Scale.NONE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  }
};

const game = new Phaser.Game(config);
