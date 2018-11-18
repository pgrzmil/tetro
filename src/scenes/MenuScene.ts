import { BaseGameScene } from "./BaseGameScene";
import GameData from "../GameData";

export class MenuScene extends BaseGameScene {

  private textStyle = { color: this.textColor, align: "center", fontSize: 24 };
  private showPoints = false;

  constructor() {
    super({ key: "MenuScene" });
  }

  public init(data: any) {
    this.showPoints = data.showPoints;
  }

  public create() {
    super.create();

    this.add.text((this.width / 2) - 15, 30, "tetro", this.textStyle);

    if (this.showPoints) {
      this.add.text((this.width / 2) - 50, 150, "Game over", this.textStyle);
      this.add.text((this.width / 2) - 140, 200, `You earned ${GameData.gamePoints} points`, this.textStyle);
    }

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
