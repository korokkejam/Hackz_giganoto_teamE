
import { Piece, Move, GameState, CommandResult } from '../commonTypes';

// 抽象クラス
export abstract class CommandBase<T = undefined> {
    abstract type: string; // 抽象フィールド
    
    protected pieces: Piece[];
    protected turn: "sente" | "gote";
    protected history: Move[];
    
    constructor(protected readonly raw: any, protected readonly gameState: GameState) {
        this.pieces = gameState.pieces;
        this.turn = gameState.turn;
        this.history = gameState.history;
    }

    // 抽象メソッド
    abstract executeCommand(state: GameState): CommandResult<T>;
}