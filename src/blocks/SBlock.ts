import { Block } from "./Block";
import { PositionMatrixItem } from "./PositionMatrixItem";

export class SBlock extends Block {

    protected positonMatrix: PositionMatrixItem[][] = [
        [
            new PositionMatrixItem(-1 * this.tileSize, this.tileSize),
            new PositionMatrixItem(0, this.tileSize),
            new PositionMatrixItem(0, 0),
            new PositionMatrixItem(this.tileSize, 0),
        ],
        [
            new PositionMatrixItem(-1 * this.tileSize, -1 * this.tileSize),
            new PositionMatrixItem(-1 * this.tileSize, 0),
            new PositionMatrixItem(0, 0),
            new PositionMatrixItem(0, this.tileSize),
        ],
    ];
}
