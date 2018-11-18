import { Scene } from "phaser";

export class LoadScene extends Scene {
  constructor() {
    super({ key: "LoadScene" });
  }

  public preload() {
    this.load.image("playIcon", "../../assets/play-64.png");
    this.load.image("block", "../../assets/block-32.png");
    this.load.audio("tick", "../../assets/tickSound.wav");
    this.load.audio("click", "../../assets/click.wav");
    this.load.audio("lineBreak", "../../assets/lineBreak.wav");
    this.load.audio("background", "../../assets/background.mp3");
  }

  public create() {
    const backgroundSound = this.sound.add("background", { volume: 0.1, loop: true });
    backgroundSound.play();

    this.scene.start("MenuScene");
  }
}
