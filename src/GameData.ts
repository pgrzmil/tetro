import Game from "./Game";

class GameData {
    public readonly gamePointsChangedEvent = "GamePointsChangedEvent";
    private static instance: GameData;

    private constructor() { }

    public static get Instance() {
        return this.instance || (this.instance = new this());
    }

    private _gamePoints: number = 0;
    get gamePoints() {
        return this._gamePoints;
    }
    set gamePoints(val) {
        this._gamePoints = val;
        Game.events.emit(this.gamePointsChangedEvent);
    }
}

export default GameData.Instance;
