import Phaser from 'phaser';

import { BootScene } from './scenes/BootScene';
import { LoaderScene } from './scenes/LoaderScene';
import { NewScene } from './scenes/NewScene'; // Import the NewScene class

// Define the main scene
class MainScene extends Phaser.Scene {
  private ball!: Phaser.Physics.Arcade.Sprite;
  private hand!: Phaser.GameObjects.Sprite;
  private pigs!: Phaser.GameObjects.Sprite;
  private club!: Phaser.GameObjects.Sprite;

  constructor() {
    super({ key: 'MainScene' });
  }

  // preload(): void {
  //   // Load any assets required for the main scene
  //   this.load.image('ball', 'assets/heart.gif');
  //   this.load.image('hand', 'assets/hand.png');
  //   this.load.image('pigs', 'assets/crews/crew_1.png');
  //   this.load.image('machine', 'assets/small_400.png');
  //   this.load.image('club', 'assets/club_400x240.png');
  // }
  create(): void {
    // Add the ball sprite
    // this.add.sprite(200, 120, 'club');
    this.club = this.add.sprite(this.cameras.main.width / 2, this.cameras.main.height / 2, 'club').setOrigin(0.5);
    this.ball = this.physics.add.sprite(200, 300, 'pigs');
    this.ball.setSize(30, 30);
    // Add bouncing properties
    this.ball.setCollideWorldBounds(true);
    this.ball.setBounce(1);
    this.ball.setVelocity(150, 150);
    // this.add.sprite(200, 120, 'ball');

    // Add a button to switch to the new scene
    // const switchButton = this.add.bitmapText(10, 10, 'Enter A-Hole');
    const switchButton = this.add.text(10, 10, 'Enter A-Hole', { color: '#0f0' });
//  this.add.bitmapText(20, 10, 'mslight', 'Come on tex', 16);

    // this.add.text(20, 30, 'Enter A-Hole', { color: '#0f0' });
    switchButton.setInteractive();
    switchButton.on('pointerdown', () => {
      this.scene.start('NewScene');
    });
    this.scale.on('resize', this.resize, this)
    this.events.on('shutdown', () => {
      this.scale.off('resize', this.resize, this);
    });
this.resize(this.scale.gameSize)
  }

  update(): void {
    // Update game logic here
  }
  resize(gameSize: Phaser.Structs.Size): void {
    const width = gameSize.width;
    const height = gameSize.height;
    // Update the world bounds
    this.physics.world.setBounds(0, 0, width, height);

    // Update the ball's collideWorldBounds property
    if (this.ball) {
      this.ball.setCollideWorldBounds(true);
    }
    // Center the club sprite
    if (this.club) {
      this.club.setPosition(width / 2, height / 2);
      this.club.displayWidth = width;
      this.club.displayHeight = height;
      // this.club.scaleY = this.club.scaleX; // Maintain aspect ratio
    }
  }


 
//   globalEventEmitter.once(
//     'gameOver',
//     (data: { isNewHighscore: boolean; newScore: number; highscore: number; attempts: number }) => {
//         this.scale.off('resize', this.resize, this)
//         this.scene.run('GameOver', data)
//     }
// )
 
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
 
  scene: [BootScene, LoaderScene, MainScene, NewScene], 
  // scene: [MainScene],
  scale: {
    mode: Phaser.Scale.EXPAND,
    autoCenter: Phaser.Scale.RESIZE,
  },
  pixelArt: true, // Enable pixel art rendering
};

const game = new Phaser.Game(config);
