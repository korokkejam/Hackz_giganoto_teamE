import {GameState, Position} from "../commonTypes";
import {CommandBase} from "../base/CommandBase";


export class ChangeBackgroundCommand extends CommandBase { // 抽象クラスを継承
    // typeを決めて、必要なフィールドを追加
    type = "backGround";
    pieceId: string;
    to: Position;

    constructor(raw: any, gameState: GameState) {
        super(raw, gameState);
        this.pieceId = raw.pieceId;
        this.to = raw.to;
    }
    executeCommand(gameState: GameState): GameState {
        return {
            ...gameState,
            pieces: gameState.pieces,
        };
    }
}