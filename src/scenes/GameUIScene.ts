import { GameObjects } from "phaser";
import GameData from "../GameData";
import { BaseGameScene } from "./BaseGameScene";

export class GameUIScene extends BaseGameScene {
    public resourcesControl: GameObjects.Text;

    constructor() {
        super({ key: GameUIScene.name });
    }

    public create() {
        const style = { color: this.textColor, align: "left", fontSize: 20, lineSpacing: 10 };
        this.resourcesControl = this.add.text(this.width - 160 + 5, 2, "", style);
        this.displayPoints();
        this.game.events.addListener(GameData.gamePointsChangedEvent, this.displayPoints, this);
    }

    public displayPoints() {
        this.resourcesControl.text = `POINTS\n${GameData.gamePoints}`;
    }
}
