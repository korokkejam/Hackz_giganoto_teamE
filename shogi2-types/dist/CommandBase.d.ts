import { Game, CommandResult } from './types';
export declare abstract class CommandBase<T = undefined> {
    protected readonly raw: any;
    abstract type: string;
    protected game: Game;
    constructor(raw: any, game: Game);
    abstract execute(): CommandResult<T>;
}
