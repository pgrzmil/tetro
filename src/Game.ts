import { GameScene, LoadScene, MenuScene, GameUIScene } from "./scenes";

class Game extends Phaser.Game {
  private static instance: Game;

  private constructor() {
    const config = {
      height: 640,
      parent: "content",
      physics: {
        arcade: {
          // debug: true,
          gravity: { y: 0 },
        },
        default: "arcade",
      },
      pixelArt: false,
      scene: [LoadScene, MenuScene, GameScene, GameUIScene],
      type: 0,
      width: 500,
      zoom: 1,
    };

    super(config);
  }

  public static get Instance() {
    return this.instance || (this.instance = new this());
  }
}

export default Game.Instance;
