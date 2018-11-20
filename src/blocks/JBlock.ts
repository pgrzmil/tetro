import { Scene } from "phaser";
import { Block } from "./Block";

export class JBlock extends Block {
    protected numberOfStates = 4;

    public rotateClockwise() {
        switch (this.position) {
            case 0:
                this.tiles[0].x = this.tiles[2].x - this.tileSize;
                this.tiles[0].y = this.tiles[2].y + this.tileSize;
                this.tiles[1].x = this.tiles[2].x;
                this.tiles[1].y = this.tiles[2].y + this.tileSize;
                this.tiles[3].x = this.tiles[2].x;
                this.tiles[3].y = this.tiles[2].y - this.tileSize;
                this.position = 1;
                break;
            case 1:
                this.tiles[0].x = this.tiles[2].x - this.tileSize;
                this.tiles[0].y = this.tiles[2].y - this.tileSize;
                this.tiles[1].x = this.tiles[2].x - this.tileSize;
                this.tiles[1].y = this.tiles[2].y;
                this.tiles[3].x = this.tiles[2].x + this.tileSize;
                this.tiles[3].y = this.tiles[2].y;
                this.position = 2;
                break;
            case 2:
                this.tiles[0].x = this.tiles[2].x + this.tileSize;
                this.tiles[0].y = this.tiles[2].y - this.tileSize;
                this.tiles[1].x = this.tiles[2].x;
                this.tiles[1].y = this.tiles[2].y + this.tileSize;
                this.tiles[3].x = this.tiles[2].x;
                this.tiles[3].y = this.tiles[2].y - this.tileSize;
                this.position = 3;
                break;
            default:
                this.tiles[0].x = this.tiles[2].x + this.tileSize;
                this.tiles[0].y = this.tiles[2].y + this.tileSize;
                this.tiles[1].x = this.tiles[2].x - this.tileSize;
                this.tiles[1].y = this.tiles[2].y;
                this.tiles[3].x = this.tiles[2].x + this.tileSize;
                this.tiles[3].y = this.tiles[2].y;
                this.position = 0;
                break;
        }
    }

    public rotateCounterClockwise() {
        this.position = this.previousPosition - 1 < 0 ? 0 : this.previousPosition - 1;
        super.rotateCounterClockwise();
    }

    protected createBlock(scene: Scene, originX: number, originY: number) {
        this.tiles = [
            this.createTile(scene, originX + this.tileSize, originY + this.tileSize),
            this.createTile(scene, originX - this.tileSize, originY),
            this.createTile(scene, originX, originY),
            this.createTile(scene, originX + this.tileSize, originY),
        ];
    }
}
