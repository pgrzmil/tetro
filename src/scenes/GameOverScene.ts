import { BaseGameScene } from "./BaseGameScene";
import GameData from "../GameData";

export class GameOverScene extends BaseGameScene {
    protected textStyle = { color: this.textColor, align: "center", fontSize: 28 };

    constructor() {
        super({ key: "GameOverScene" });
    }

    public create() {
        super.create();

        this.add.text((this.width / 2) - 15, 30, "tetro", this.textStyle);
        this.add.text((this.width / 2) - 50, 200, "Game over", this.textStyle);
        this.add.text((this.width / 2) - 140, 250, `You earned ${GameData.gamePoints} points`, this.textStyle);

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
