import { Input, GameObjects, Sound } from "phaser";
import { BaseGameScene } from "./BaseGameScene";
import GameData from "../GameData";
import { Block } from "../blocks/Block";
import { IBlock, JBlock, LBlock, SBlock, ZBlock, TBlock, OBlock } from "../blocks";

export class GameScene extends BaseGameScene {

  private cursors: Input.Keyboard.CursorKeys;
  private tickSound: Sound.BaseSound;
  private lineBreakSound: Sound.BaseSound;

  private currentBlock: Block;
  private laidTiles: GameObjects.Sprite[];

  private startX = 0;
  private startY = 0;
  private readonly tileSize = 32;
  private readonly pointsPerBlock = 4;
  private readonly pointsPerLine = 100;

  private lastRotation: number = 0;
  private lastSlide: number = 0;
  private lastDescend: number = 0;
  private lastQuickDescend: number = 0;

  // TODO: Add speed progression
  private descendInterval = 750;
  private quickDescendInterval = 25;
  private rotationInterval = 150;
  private slideInterval = 50;

  private blockQuickDescend = false;

  constructor() {
    super({ key: "GameScene" });
  }

  public create() {
    super.create();

    this.scene.launch("GameUIScene");
    this.tickSound = this.sound.add("tick");
    this.lineBreakSound = this.sound.add("lineBreak", { volume: 0.2 });

    this.startX = (this.width - this.tileSize) / 2;
    this.laidTiles = [];
    GameData.gamePoints = 0;

    this.addControls();
    this.currentBlock = this.generateBlock();
    // TODO: Change game field from taking all game area so there will be place for ui
    // TODO: Add button for muting backround music and sound effects
    // TODO: Add color changing on level progression
  }

  public update(time: number, delta: number) {
    if (this.lastDescend === 0) {
      this.lastDescend = time;
      return;
    }

    if (time - this.lastDescend >= this.descendInterval) {
      this.lastDescend = time;
      this.descendBlock();
    }

    if (this.cursors.space.isDown && time - this.lastRotation >= this.rotationInterval) {
      this.lastRotation = time;
      this.rotateBlockClockwise();
    }

    if (this.cursors.down.isDown && !this.blockQuickDescend && time - this.lastQuickDescend >= this.quickDescendInterval) {
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

  // tslint:disable-next-line:member-ordering
  private blockTypes = [JBlock, LBlock, SBlock, ZBlock, TBlock, IBlock, OBlock];
  private generateBlock(): Block {
    // TODO: Add preview of next block that will appear
    const blockType = this.blockTypes[Math.floor(Math.random() * this.blockTypes.length)];
    return new blockType(this, this.tileSize);
  }

  private addControls() {
    this.cursors = this.input.keyboard.createCursorKeys();
    // TODO: Add pausing game using ESC key
  }
}
