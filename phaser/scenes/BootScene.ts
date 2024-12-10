import Phaser from 'phaser';

export class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' });
  }

  preload(): void {
    // Load any assets required for the loader scene
    this.load.image('loaderBackground', 'assets/background.png');
    this.load.image('loaderBar', 'assets/loadingbar.png');
  }

  create(): void {
    // Start the loader scene
    this.scene.start('LoaderScene');
  }
}