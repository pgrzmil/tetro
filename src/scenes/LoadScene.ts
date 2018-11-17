import { Scene } from "phaser";

export class LoadScene extends Scene {
  constructor() {
    super({ key: "LoadScene" });
  }

  public preload() {
    this.load.image("playIcon", "../../assets/play-64.png");
    this.load.image("block", "../../assets/block-32.png");
  }

  public create() {
    this.scene.start("MenuScene");
  }
}
