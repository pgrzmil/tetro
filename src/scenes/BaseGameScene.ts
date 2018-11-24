import { Scene } from "phaser";

export class BaseGameScene extends Scene {

    protected textColor = "#222222";
    protected backgroundColor = 0xf8f8f8;
    protected gameBoardColor = 0xeeeeee;

    protected get width() {
        return this.game.config.width as number;
    }
    protected get height() {
        return this.game.config.height as number;
    }

    public create() {
        this.setBackground();
    }

    protected setBackground() {
        const graphics = this.add.graphics();
        graphics.fillStyle(this.backgroundColor, 1);
        graphics.fillRect(0, 0, this.width, this.height);
    }
}
