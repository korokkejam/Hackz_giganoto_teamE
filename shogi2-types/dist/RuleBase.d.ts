import { Game, CommandResult } from './types';
export declare abstract class RuleBase<T = undefined> {
    protected readonly raw: any;
    protected game: Game;
    constructor(raw: any, gameState: Game);
    abstract execute(): CommandResult<T>;
}
