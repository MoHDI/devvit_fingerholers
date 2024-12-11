import Phaser from 'phaser';

export class LoaderScene extends Phaser.Scene {
  constructor() {
    super({ key: 'LoaderScene' });
  }

  preload(): void {
    // Add a background and loading bar
    this.add.image(400, 300, 'loaderBackground');
    const loadingBar = this.add.sprite(400, 300, 'loaderBar');

    // Display the progress of the loading
    this.load.on('progress', (value: number) => {
      loadingBar.setScale(value, 1);
    });

    // this.load.bitmapFont('mslight', 'assets/fonts/Mini-Sans-Light-2X-table-18-20.png', 'assets/fonts/Mini-Sans-Light-2X.fnt');

    // Load all assets required for the game
    this.load.image('ball', 'assets/heart.gif');
    this.load.image('hand', 'assets/hand_point.png');
    this.load.image('pigs', 'assets/crews/crew_1.png');
    this.load.image('machine', 'assets/small_400.png');
    this.load.image('newImage', 'assets/buy.gif');
    this.load.image('club', 'assets/club_400x240.png');
   
  }

  create(): void {
    // Start the main scene
    this.scene.start('MainScene');
  }
}