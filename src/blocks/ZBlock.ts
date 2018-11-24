import { Block } from "./Block";
import { PositionMatrixItem } from "./PositionMatrixItem";

export class ZBlock extends Block {

    protected positonMatrix: PositionMatrixItem[][] = [
        [
            new PositionMatrixItem(this.tileSize, this.tileSize),
            new PositionMatrixItem(0, this.tileSize),
            new PositionMatrixItem(0, 0),
            new PositionMatrixItem(-1 * this.tileSize, 0),
        ],
        [
            new PositionMatrixItem(-1 * this.tileSize, this.tileSize),
            new PositionMatrixItem(-1 * this.tileSize, 0),
            new PositionMatrixItem(0, 0),
            new PositionMatrixItem(0, -1 * this.tileSize),
        ],
    ];

}
