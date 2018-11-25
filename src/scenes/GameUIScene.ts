import { GameObjects } from "phaser";
import GameData from "../GameData";
import { BaseGameScene } from "./BaseGameScene";

export class GameUIScene extends BaseGameScene {
    public pointsLabel: GameObjects.Text;
    public ppsRatioLabel: GameObjects.Text;

    constructor() {
        super({ key: GameUIScene.name });
    }

    public create() {
        const style = { color: this.textColor, align: "left", fontSize: 20, lineSpacing: 10 };
        const uiWidth = (GameData.tileSize * GameData.boardWidthTileMultiplier) + 5;
        this.pointsLabel = this.add.text(uiWidth, 2, "", style);
        this.ppsRatioLabel = this.add.text(uiWidth, 100, "", style);
        this.displayPoints();

        this.time.addEvent({ delay: 1000, loop: true, paused: false, callback: this.displayPPS, callbackScope: this });
        this.game.events.addListener(GameData.gamePointsChangedEvent, this.displayPoints, this);
    }

    public displayPoints() {
        this.pointsLabel.text = `POINTS\n${GameData.gamePoints}`;
        this.displayPPS();
    }

    private displayPPS() {
        if (GameData.startTime) {
            const now = new Date();
            const seconds = (now.getTime() - GameData.startTime.getTime()) / 1000;

            const pps = GameData.gamePoints / seconds;
            this.ppsRatioLabel.text = `POINTS PER SEC\n${pps.toFixed(2)}`;
        }
    }
}
