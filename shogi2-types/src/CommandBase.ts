import { CommandEvent } from './events/CommandEvent';
import { ReturnRequest } from './ModBase';
import { Game } from './types';

// 抽象クラス
export abstract class CommandBase {
    abstract type: string; // 抽象フィールド
    
    protected game: Game;
    
    constructor(game: Game) {
        this.game = game;
    }

    // 抽象メソッド
    abstract execute(raw:CommandEvent,game:Game): ReturnRequest[]|void;
}
