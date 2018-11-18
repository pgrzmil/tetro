import { Input, GameObjects, Time } from "phaser";
import { BaseGameScene } from "./BaseGameScene";
import GameData from "../GameData";
import { Block } from "../blocks/Block";
import { IBlock, JBlock, LBlock, SBlock, ZBlock, TBlock } from "../blocks";

export class GameScene extends BaseGameScene {

  private cursors: Input.Keyboard.CursorKeys;
  private currentBlock: Block;
  private laidTiles: GameObjects.Sprite[];

  private startX = 0;
  private startY = 0;
  private tileSize = 32;

  private lastRotation: number = 0;
  private lastSlide: number = 0;
  private lastDescend: number = 0;
  private lastQuickDescend: number = 0;

  private descendInterval = 750;
  private quickDescendInterval = 25;
  private rotationInterval = 125;
  private slideInterval = 50;

  constructor() {
    super({ key: "GameScene" });
  }

  public create() {
    super.create();

    this.scene.launch("GameUIScene");
    this.sound.add("tick");

    this.startX = (this.width - this.tileSize) / 2;
    this.startY = -this.tileSize;
    this.laidTiles = [];
    GameData.gamePoints = 0;

    this.addControls();
    this.currentBlock = this.generateBlock();
    // TODO: Add background music
    // TODO: Add button for muting backround music and sound effects
  }

  public update(time: number, delta: number) {
    if (time - this.lastDescend >= this.descendInterval) {
      this.lastDescend = time;
      this.descendBlock();
    }

    if (this.cursors.space.isDown && time - this.lastRotation >= this.rotationInterval) {
      this.lastRotation = time;
      this.rotateBlockClockwise();
    }

    if (this.cursors.down.isDown && time - this.lastQuickDescend >= this.quickDescendInterval) {
      this.lastQuickDescend = time;
      this.descendBlock();
    }

    if (time - this.lastSlide >= this.slideInterval) {
      this.lastSlide = time;
      if (this.cursors.right.isDown) {
        this.slideBlock(this.tileSize);
      } else if (this.cursors.left.isDown) {
        this.slideBlock(-this.tileSize);
      }
    }
  }

  private rotateBlockClockwise() {
    this.currentBlock.rotateClockwise();
    if (this.willCollide()) {
      this.currentBlock.rotateCounterClockwise();
    } else {
      if (this.currentBlock.x < 0) {
        this.currentBlock.slide(-this.currentBlock.x);
      } else if (this.currentBlock.maxx >= this.width) {
        this.currentBlock.slide(-(this.currentBlock.maxx - this.width + this.tileSize));
      }
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
    if (!this.willCollide(deltaX) && this.currentBlock.maxx + deltaX < this.width && this.currentBlock.x + deltaX >= 0) {
      this.currentBlock.slide(deltaX);
    }
  }

  private descendBlock() {
    if (this.willCollide(0, this.tileSize) || (this.currentBlock.y + this.tileSize) >= this.height) {
      this.laidTiles.push(...this.currentBlock.tiles);
      GameData.gamePoints += this.currentBlock.pointValue;
      this.sound.play("tick");
      this.checkFullLines();

      if (this.laidTiles.some(tile => tile.y === 0)) {
        this.scene.start("GameOverScene");
        // TODO: Add highscore
      }
      this.currentBlock = this.generateBlock();
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
        // TODO: Add animation on line break
        // TODO: Add sound on line break
        // remove line
        this.laidTiles = this.laidTiles.filter(tile => line.indexOf(tile) === -1);
        // move rest of blocks down
        this.laidTiles.filter(tile => tile.y < y).forEach(tile => tile.y += this.tileSize);
        removedLines++;
      }
    });

    // TODO: Add bonus for number of lines
    GameData.gamePoints += removedLines * 100;
  }

  private willCollide(deltaX: number = 0, deltaY: number = 0): boolean {
    return this.currentBlock.tiles.some(tile => {
      return this.laidTiles.some(block => block.x === tile.x + deltaX && block.y === tile.y + deltaY);
    });
  }

  private addControls() {
    this.cursors = this.input.keyboard.createCursorKeys();
    // TODO: addd pausing game using ESC key
  }
}
