import Phaser from 'phaser';

export class NewScene extends Phaser.Scene {
  constructor() {
    super({ key: 'NewScene' });
  }

  create(): void {
    // Add content for the new scene
    this.add.text(100, 100, 'This is the new scene', { color: '#fff' });
    this.add.image(200, 200, 'newImage');
    this.add.sprite(200, 160, 'machine');
    
    // Add a button to switch back to the main scene
    const switchButton = this.add.text(10, 10, 'Main Menu', { color: '#0f0' });
    switchButton.setInteractive();
    switchButton.on('pointerdown', () => {
      this.scene.start('MainScene');
    });
  }

  update(): void {
    // Update game logic for the new scene
  }
}