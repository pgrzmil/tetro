import { BaseGameScene } from "./BaseGameScene";

export class MenuScene extends BaseGameScene {

  private textStyle = { color: this.textColor, align: "center", fontSize: 24 };

  constructor() {
    super({ key: "MenuScene" });
  }

  public create() {
    super.create();

    this.add.text((this.width / 2) - 15, 30, "tetro", this.textStyle);

    const playButton = this.add.image(this.width / 2 + 32, this.height / 2, "playIcon");
    playButton.setInteractive();
    playButton.on("pointerdown", this.startGame, this);

    this.input.keyboard.on("keydown_SPACE", this.startGame, this);
    this.input.keyboard.on("keydown_ENTER", this.startGame, this);
  }

  private startGame() {
    this.sound.play("click", { volume: 0.1 });
    this.scene.start("GameScene");
  }
}
