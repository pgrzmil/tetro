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
}
