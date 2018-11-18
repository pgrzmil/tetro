import { Scene } from "phaser";
import { Block } from "./Block";

export class ZBlock extends Block {

    public rotateClockwise() {
        if (this.position) {
            this.tiles[0].x = this.tiles[2].x - this.tileSize;
            this.tiles[0].y = this.tiles[2].y + this.tileSize;
            this.tiles[1].x = this.tiles[2].x - this.tileSize;
            this.tiles[1].y = this.tiles[2].y;
            this.tiles[3].x = this.tiles[2].x;
            this.tiles[3].y = this.tiles[2].y - this.tileSize;
            this.position = 0;
        } else {
            this.tiles[0].x = this.tiles[2].x + this.tileSize;
            this.tiles[0].y = this.tiles[2].y + this.tileSize;
            this.tiles[1].x = this.tiles[2].x;
            this.tiles[1].y = this.tiles[2].y + this.tileSize;
            this.tiles[3].x = this.tiles[2].x - this.tileSize;
            this.tiles[3].y = this.tiles[2].y;
            this.position = 1;
        }
    }

    protected createBlock(scene: Scene, originX: number, originY: number) {
        this.tiles = [
            this.createTile(scene, originX + this.tileSize, originY + this.tileSize),
            this.createTile(scene, originX, originY + this.tileSize),
            this.createTile(scene, originX, originY),
            this.createTile(scene, originX - this.tileSize, originY),
        ];
    }
}
