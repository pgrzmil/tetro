import { Input, Sound } from "phaser";
import { BaseGameScene } from "./BaseGameScene";
import GameData from "../GameData";
import { Block } from "../blocks/Block";
import { IBlock, JBlock, LBlock, SBlock, ZBlock, TBlock, OBlock } from "../blocks";
import { Board } from "../Board";
import { GameUIScene, MenuScene } from "./";

export class GameScene extends BaseGameScene {

  private cursors: Input.Keyboard.CursorKeys;
  private tickSound: Sound.BaseSound;
  private lineBreakSound: Sound.BaseSound;

  private readonly tileSize = GameData.tileSize;
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

  private board: Board;

  constructor() {
    super({ key: GameScene.name });
  }

  public create() {
    super.create();

    GameData.gamePoints = 0;
    this.scene.launch(GameUIScene.name);
    this.addControls();

    this.tickSound = this.sound.add("tick");
    this.lineBreakSound = this.sound.add("lineBreak", { volume: 0.2 });

    this.board = new Board(this.height, this.tileSize * GameData.boardWidthTileMultiplier, this.tileSize);

    this.board.on(Board.blockLaidEvent, this.onLaidBlock, this);
    this.board.on(Board.lineBrakeEvent, this.onLineBreak, this);
    this.board.on(Board.boardFullEvent, this.gameOver, this);
    this.board.on(Board.blockWillBeLaidEvent, () => this.blockQuickDescend = true, this);
    this.board.on(Board.blockDescendEvent, () => this.blockQuickDescend = false, this);

    this.board.setCurrentBlock(this.generateBlock());
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
      this.board.descendBlock();
    }

    if (this.cursors.space.isDown && time - this.lastRotation >= this.rotationInterval) {
      this.lastRotation = time;
      this.board.rotateBlockClockwise();
    }

    if (this.cursors.down.isDown && !this.blockQuickDescend && time - this.lastQuickDescend >= this.quickDescendInterval) {
      this.lastQuickDescend = time;
      this.board.descendBlock();
    }

    if (time - this.lastSlide >= this.slideInterval) {
      this.lastSlide = time;
      if (this.cursors.right.isDown) {
        this.board.slideBlock(this.tileSize);
      } else if (this.cursors.left.isDown) {
        this.board.slideBlock(-this.tileSize);
      }
    }
  }

  private onLineBreak(numberOfLines: number) {
    this.lineBreakSound.play();
    const multiplier = [0, 1, 1.5, 2, 2.5];
    GameData.gamePoints += this.pointsPerLine * numberOfLines * multiplier[numberOfLines];
    this.blockQuickDescend = false;
    this.board.setCurrentBlock(this.generateBlock());
  }

  private onLaidBlock() {
    GameData.gamePoints += this.pointsPerBlock;
    this.tickSound.play();
    this.blockQuickDescend = false;
    this.board.setCurrentBlock(this.generateBlock());
  }

  private gameOver() {
    this.scene.remove(GameUIScene.name);
    this.scene.start(MenuScene.name, { showPoints: true });
  }

  protected setBackground() {
    super.setBackground();

    const graphics = this.add.graphics();
    graphics.fillStyle(this.gameBoardColor, 1);
    graphics.fillRect(0, 0, this.board.width, this.height);
  }

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
