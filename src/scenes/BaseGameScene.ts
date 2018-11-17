import { GameObjects, Scene } from "phaser";

export class BaseGameScene extends Scene {

    protected textColor = "#222222";

    protected get width() {
        return this.game.config.width as number;
    }
    protected get height() {
        return this.game.config.height as number;
    }

    public create() {
        this.setBackground();
    }

    private setBackground() {
        const graphics = this.add.graphics();
        graphics.fillStyle(0xeeeeee, 1);
        graphics.fillRect(0, 0, this.width, this.height);
    }
}
