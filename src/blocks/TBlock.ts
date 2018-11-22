import { Block } from "./Block";
import { PositionMatrixItem } from "./PositionMatrixItem";

export class TBlock extends Block {

    protected positonMatrix: PositionMatrixItem[][] = [
        [
            new PositionMatrixItem(this.tileSize, 0),
            new PositionMatrixItem(0, -1 * this.tileSize),
            new PositionMatrixItem(0, 0),
            new PositionMatrixItem(0, this.tileSize),
        ],
        [
            new PositionMatrixItem(0, -1 * this.tileSize),
            new PositionMatrixItem(-1 * this.tileSize, 0),
            new PositionMatrixItem(0, 0),
            new PositionMatrixItem(this.tileSize, 0),
        ],
        [
            new PositionMatrixItem(-1 * this.tileSize, 0),
            new PositionMatrixItem(0, -1 * this.tileSize),
            new PositionMatrixItem(0, 0),
            new PositionMatrixItem(0, this.tileSize),
        ],
        [
            new PositionMatrixItem(0, this.tileSize),
            new PositionMatrixItem(-1 * this.tileSize, 0),
            new PositionMatrixItem(0, 0),
            new PositionMatrixItem(this.tileSize, 0),
        ],
    ];

    constructor(scene: Phaser.Scene, originX: number, originY: number, tileSize: number) {
        super(scene, originX, originY, tileSize);
        this.createBlock(scene, originX, originY);
    }
}
