import { Block } from "./Block";
import { PositionMatrixItem } from "./PositionMatrixItem";

export class OBlock extends Block {

    protected positonMatrix: PositionMatrixItem[][] = [
        [
            new PositionMatrixItem(this.tileSize, 0),
            new PositionMatrixItem(0, this.tileSize),
            new PositionMatrixItem(0, 0),
            new PositionMatrixItem(this.tileSize, this.tileSize),
        ],
    ];

    constructor(scene: Phaser.Scene, originX: number, originY: number, tileSize: number) {
        super(scene, originX, originY, tileSize);
        this.createBlock(scene, originX, originY);
    }
}
