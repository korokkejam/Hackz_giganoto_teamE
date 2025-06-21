
import { GameState, CommandResult } from '../commonTypes';

// 抽象クラス
export abstract class CommandBase<T = undefined> {
    abstract type: string; // 抽象フィールド
    
    protected gameState: GameState;
    
    constructor(protected readonly raw: any, gameState: GameState) {
        this.gameState = gameState;
    }

    // 抽象メソッド
    abstract execute(): CommandResult<T>;
}