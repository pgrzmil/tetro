import { GameObjects } from "phaser";
import GameData from "../GameData";
import { BaseGameScene } from "./BaseGameScene";

export class GameUIScene extends BaseGameScene {
    public pointsLabel: GameObjects.Text;

    constructor() {
        super({ key: GameUIScene.name });
    }

    public create() {
        const style = { color: this.textColor, align: "left", fontSize: 20, lineSpacing: 10 };
        const uiWidth = (GameData.tileSize * 10) + 5;
        this.pointsLabel = this.add.text(uiWidth, 2, "", style);
        this.displayPoints();
        this.game.events.addListener(GameData.gamePointsChangedEvent, this.displayPoints, this);
    }

    public displayPoints() {
        this.pointsLabel.text = `POINTS\n${GameData.gamePoints}`;
    }
}
