import { Game, CommandResult } from './types';

// 抽象クラス
export abstract class CommandBase<T> {
    abstract type: string; // 抽象フィールド
    
    protected game: Game;
    
    constructor(protected readonly raw: any, game: Game) {
        this.game = game;
    }

    // 抽象メソッド
    abstract execute(): CommandResult<T>;
}
