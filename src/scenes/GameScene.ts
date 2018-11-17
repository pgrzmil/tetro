import { Input, GameObjects, Time } from "phaser";
import { BaseGameScene } from "./BaseGameScene";
import GameData from "../GameData";
import { Block } from "../blocks/Block";
import { IBlock, JBlock, LBlock, SBlock, ZBlock, TBlock } from "../blocks";

export class GameScene extends BaseGameScene {

  private cursors: Input.Keyboard.CursorKeys;
  private currentBlock: Block;
  private descendTimer: Time.TimerEvent;
  private laidTiles: GameObjects.Sprite[];
  private lastUpdate: number = 0;

  private startX = 0;
  private startY = 0;
  private tileSize = 32;
  private updateTime = 800;

  constructor() {
    super({ key: "GameScene" });
  }

  public create() {
    super.create();

    this.startX = (this.width - this.tileSize) / 2;
    GameData.gamePoints = 0;
    this.scene.launch("GameUIScene");

    this.addControls();

    this.laidTiles = [];
    this.currentBlock = this.generateBlock();
    this.descendTimer = this.time.addEvent({ delay: this.updateTime, loop: true, callback: this.descendBlock, callbackScope: this });

    // TODO: Add background music
    // TODO: Add button for muting backround music and sound effects
  }

  public update(time: number, delta: number) {
    if (this.lastUpdate + 40 < time) {
      this.lastUpdate = time;
      if (this.cursors.right.isDown) {
        this.slideBlock(this.tileSize);
      } else if (this.cursors.left.isDown) {
        this.slideBlock(-this.tileSize);
      }

      if (this.cursors.down.isDown) {
        this.descendTimer.paused = true;
        this.descendBlock();
        this.descendTimer.paused = false;
      }
    }
  }

  private rotateBlock() {
    // TODO: add rotation blocking when there are other tiles nearbyc
    this.currentBlock.rotate();
    if (this.currentBlock.x < 0) {
      this.currentBlock.slide(-this.currentBlock.x);
    } else if (this.currentBlock.maxx >= this.width) {
      this.currentBlock.slide(-(this.currentBlock.maxx - this.width + this.tileSize));
    }
  }

  // tslint:disable-next-line:member-ordering
  private blockTypes = [JBlock, LBlock, SBlock, ZBlock, TBlock, IBlock, Block];
  private generateBlock(): Block {
    // TODO: Add preview of next block that will appear
    const BlockType = this.blockTypes[Math.floor(Math.random() * this.blockTypes.length)];
    const block = new BlockType(this, this.startX, this.startY, this.tileSize);
    return block;
  }

  private slideBlock(deltaX: number) {
    if (!this.willCollide(deltaX, 0) && this.currentBlock.maxx + deltaX < this.width && this.currentBlock.x + deltaX >= 0) {
      this.currentBlock.slide(deltaX);
    }
  }

  private descendBlock() {
    if (this.willCollide(0, this.tileSize) || (this.currentBlock.y + this.tileSize) >= this.height) {
      this.descendTimer.remove(null);
      this.laidTiles.push(...this.currentBlock.tiles);
      // TODO: add sound on laying block
      GameData.gamePoints += this.currentBlock.pointValue;

      this.checkFullLines();

      const isTop = this.laidTiles.some(tiles => tiles.y < this.tileSize);
      if (isTop) {
        this.scene.start("GameOverScene");
        // TODO: Add highscore
      } else {
        this.descendTimer = this.time.addEvent({ delay: this.updateTime, loop: true, callback: this.descendBlock, callbackScope: this });
        this.currentBlock = this.generateBlock();
      }
    } else {
      this.currentBlock.descend(this.tileSize);
    }
  }

  private checkFullLines() {
    const tilesPerLine = this.width / this.tileSize;
    const ys = this.laidTiles.map(tile => tile.y).filter((y, index, array) => y && array.indexOf(y) === index).sort((y1, y2) => y1 - y2);

    let removedLines = 0;
    ys.forEach((y) => {
      const line = this.laidTiles.filter(tile => tile.y === y);
      if (line.length === tilesPerLine) {
        line.forEach(tile => tile.destroy());
        // remove line
        // TODO: Add animation on line break
        // TODO: Add sound on line break
        this.laidTiles = this.laidTiles.filter(tile => line.indexOf(tile) === -1);
        // move rest of blocks down
        this.laidTiles.filter(tile => tile.y < y).forEach(tile => tile.y += this.tileSize);
        removedLines++;
      }
    });

    // TODO: Add bonus for number of lines
    GameData.gamePoints += removedLines * 100;
  }

  private willCollide(deltaX: number, deltaY: number): boolean {
    return this.currentBlock.tiles.some(tile => {
      return this.laidTiles.some(block => block.x === tile.x + deltaX && block.y === tile.y + deltaY);
    });
  }

  private addControls() {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.input.keyboard.on("keydown_SPACE", this.rotateBlock, this);
  }
}
