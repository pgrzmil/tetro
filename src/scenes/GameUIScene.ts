import { GameObjects, Scene } from "phaser";
import GameData from "../GameData";
import { BaseGameScene } from "./BaseGameScene";

export class GameUIScene extends BaseGameScene {
    public resourcesControl: GameObjects.Text;

    constructor() {
        super({ key: "GameUIScene" });
    }

    public create() {
        const style = { color: this.textColor, align: "left", fontSize: 20 };
        this.resourcesControl = this.add.text(2, 2, "", style);
        this.displayPoints();
        this.game.events.addListener("GamePointsChangedEvent", this.displayPoints, this);
    }

    public displayPoints() {
        this.resourcesControl.text = `Points: ${GameData.gamePoints}`;
    }
}
