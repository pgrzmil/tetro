import { GameObjects } from "phaser";
import { Block } from "./blocks/Block";

export class Board extends Phaser.Events.EventEmitter {
    public static readonly lineBrakeEvent = "LineBrakeEvent";
    public static readonly blockLaidEvent = "BlockLaidEvent";
    public static readonly boardFullEvent = "BoardFullEvent";
    public static readonly blockDescendEvent = "BlockDescendEvent";
    public static readonly blockWillBeLaidEvent = "BlockWillBeLaidEvent";

    public height: number;
    public width: number;

    private laidTiles: GameObjects.Sprite[];
    private currentBlock: Block;

    private tileSize = 0;
    private startX = 0;
    private startY = 0;

    constructor(height: number, width: number, tileSize: number) {
        super();
        this.height = height;
        this.width = width;
        this.tileSize = tileSize;

        this.startX = (this.width / 2) - this.tileSize;
        this.laidTiles = [];
    }

    public setCurrentBlock(block: Block) {
        this.currentBlock = block;
        this.currentBlock.rotateRandomly();
        this.currentBlock.setOrigin(this.startX, this.startY);
    }

    public rotateBlockClockwise() {
        this.currentBlock.rotateClockwise();
        if (this.willCollide() || this.currentBlock.y + this.tileSize >= this.height) {
            this.currentBlock.rotateCounterClockwise();
        } else {
            if (this.currentBlock.x < 0) {
                this.currentBlock.slide(-this.currentBlock.x);
            } else if (this.currentBlock.maxx >= this.width) {
                this.currentBlock.slide(-(this.currentBlock.maxx - this.width + this.tileSize));
            }
        }
    }

    public slideBlock(deltaX: number) {
        if (!this.willCollide(deltaX) && this.currentBlock.maxx + deltaX < this.width && this.currentBlock.x + deltaX >= 0) {
            this.currentBlock.slide(deltaX);
        }
    }

    public descendBlock() {
        if (this.willCollide(0, this.tileSize) || (this.currentBlock.y + this.tileSize) >= this.height) {
            this.laidTiles.push(...this.currentBlock.tiles);

            const removedLinesCount = this.checkFullLines();
            this.emit(removedLinesCount > 0 ? Board.lineBrakeEvent : Board.blockLaidEvent, removedLinesCount);

            if (this.laidTiles.some(tile => tile.y === 0)) {
                this.emit(Board.boardFullEvent);
            }
        } else {
            this.currentBlock.descend(this.tileSize);
            this.emit(Board.blockDescendEvent);

            if (this.willCollide(0, this.tileSize) || (this.currentBlock.y + this.tileSize) >= this.height) {
                this.emit(Board.blockWillBeLaidEvent);
            }
        }
    }

    private checkFullLines(): number {
        const tilesPerLine = this.width / this.tileSize;
        const ys = this.laidTiles.map(tile => tile.y).filter((y, index, array) => y && array.indexOf(y) === index).sort((y1, y2) => y1 - y2);

        let removedLines = 0;
        ys.forEach((y) => {
            const line = this.laidTiles.filter(tile => tile.y === y);
            if (line.length === tilesPerLine) {
                line.forEach(tile => tile.destroy());
                // remove line
                this.laidTiles = this.laidTiles.filter(tile => line.indexOf(tile) === -1);
                // move rest of blocks down
                this.laidTiles.filter(tile => tile.y < y).forEach(tile => tile.y += this.tileSize);
                removedLines++;
            }
        });

        return removedLines;
    }

    private willCollide(deltaX: number = 0, deltaY: number = 0): boolean {
        return this.currentBlock.tiles.some(tile => {
            return this.laidTiles.some(block => block.x === tile.x + deltaX && block.y === tile.y + deltaY);
        });
    }
}
