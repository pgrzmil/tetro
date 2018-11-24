import { GameObjects, Scene } from "phaser";
import { PositionMatrixItem } from "./PositionMatrixItem";

export abstract class Block {
    protected tileSize: number = 0;

    protected _tiles: GameObjects.Sprite[];
    get tiles() {
        return this._tiles;
    }

    protected positonMatrix: PositionMatrixItem[][];

    private _position: number = 0;
    private get position(): number {
        return this._position;
    }
    private set position(val: number) {
        // Set position accordingly to postion matrix. Shifting to possible indexes when necessarry
        // i.e when rotationg counter clockwise and value will be less than 0 set last of positions from positionMatrix.
        if (val < 0) {
            this._position = this.positonMatrix.length - 1;
        } else if (val === this.positonMatrix.length) {
            this._position = 0;
        } else {
            this._position = val;
        }

        // Sets origin of tiles using deltas in position matrix. Deltas are computed counting from third tile as it's always in the same spot.
        this.tiles.forEach((tile, index) => {
            tile.x = this.tiles[2].x + this.positonMatrix[this._position][index].deltaX;
            tile.y = this.tiles[2].y + this.positonMatrix[this._position][index].deltaY;
        });
    }

    get x(): number {
        return Math.min(...this.tiles.map(tile => tile.x));
    }

    get maxx(): number {
        return Math.max(...this.tiles.map(tile => tile.x));
    }

    get y(): number {
        return Math.max(...this.tiles.map(tile => tile.y));
    }

    constructor(scene: Scene, originX: number, originY: number, tileSize: number) {
        this.tileSize = tileSize;
    }

    public slide(deltaX: number) {
        this.tiles.forEach(tile => tile.x += deltaX);
    }

    public descend(deltaY: number) {
        this.tiles.forEach(tile => tile.y += deltaY);
    }

    public rotateClockwise() {
        this.position += 1;
    }

    public rotateCounterClockwise() {
        this.position -= 1;
    }

    protected createBlock(scene: Scene, originX: number, originY: number) {
        this._tiles = [this.createTile(scene, originX, originY), this.createTile(scene, originX, originY), this.createTile(scene, originX, originY), this.createTile(scene, originX, originY)];
        this.rotateRandomly();
        this.setOrigin(originX, originY);
    }

    private createTile(scene: Scene, x: number, y: number): GameObjects.Sprite {
        const tile = scene.add.sprite(x, y, "block");
        tile.setOrigin(0, 0);
        return tile;
    }

    private rotateRandomly() {
        this.position = Math.floor(Math.random() * this.positonMatrix.length);
    }

    private setOrigin(originX: number, originY: number) {
        const deltaX = originX - Math.min(...this.tiles.map(tile => tile.x));
        const deltaY = originY - Math.min(...this.tiles.map(tile => tile.y));
        this.tiles.forEach(tile => {
            tile.x += deltaX;
            tile.y += deltaY;
        });
    }
}
