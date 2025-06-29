import { Game, CommandResult } from './types';
export declare abstract class CommandBase<T> {
    protected readonly raw: any;
    abstract type: string;
    protected game: Game;
    constructor(raw: any, game: Game);
    abstract execute(): CommandResult<T>;
}
