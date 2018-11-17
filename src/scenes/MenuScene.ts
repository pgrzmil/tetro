import { BaseGameScene } from "./BaseGameScene";

export class MenuScene extends BaseGameScene {

  protected textStyle = { color: this.textColor, align: "center", fontSize: 28 };

  constructor() {
    super({ key: "MenuScene" });
  }

  public create() {
    super.create();

    this.add.text((this.width / 2) - 15, 30, "tetro", this.textStyle);

    const playButton = this.add.image(this.width / 2 + 32, this.height / 2, "playIcon");
    playButton.setInteractive();
    playButton.on("pointerdown", this.playClick, this);

    this.input.keyboard.on("keydown_SPACE", this.playClick, this);
    this.input.keyboard.on("keydown_ENTER", this.playClick, this);
  }

  private playClick() {
    this.scene.start("GameScene");
  }
}
