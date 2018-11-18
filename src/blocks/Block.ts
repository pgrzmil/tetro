import { GameObjects, Scene } from "phaser";

export class Block {

    get x(): number {
        return Math.min(...this.tiles.map(tile => tile.x));
    }

    get maxx(): number {
        return Math.max(...this.tiles.map(tile => tile.x));
    }

    get y(): number {
        return Math.max(...this.tiles.map(tile => tile.y));
    }

    get pointValue(): number {
        return this.tilePointValue * this.tiles.length;
    }
    public tiles: GameObjects.Sprite[];

    protected previousPosition = 0;
    protected _position = 0;
    get position() {
        return this._position;
    }
    set position(val) {
        this.previousPosition = this._position;
        this._position = val;
    }

    protected tileSize = 0;
    private tilePointValue = 5;

    constructor(scene: Scene, originX: number, originY: number, tileSize: number) {
        this.tileSize = tileSize;
        this.createBlock(scene, originX, originY);
    }

    public slide(deltaX: number) {
        this.tiles.forEach(tile => tile.x += deltaX);
    }

    public descend(deltaY: number) {
        this.tiles.forEach(tile => tile.y += deltaY);
    }

    // TODO: refactor rotation logic
    public rotateClockwise() {
    }

    public rotateCounterClockwise() {
        this.rotateClockwise();
    }

    protected createBlock(scene: Scene, originX: number, originY: number) {
        this.tiles = [
            this.createTile(scene, originX, originY),
            this.createTile(scene, originX + this.tileSize, originY),
            this.createTile(scene, originX, originY + this.tileSize),
            this.createTile(scene, originX + this.tileSize, originY + this.tileSize),
        ];
    }

    protected createTile(scene: Scene, x: number, y: number): GameObjects.Sprite {
        const tile = scene.add.sprite(x, y, "block");
        tile.setOrigin(0, 0);
        return tile;
    }
}
