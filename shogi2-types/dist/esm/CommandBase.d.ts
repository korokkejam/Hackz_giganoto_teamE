import { CommandEvent } from './events/CommandEvent';
import { ReturnRequest } from './ModBase';
import { Game } from './types';
export declare abstract class CommandBase {
    abstract type: string;
    protected game: Game;
    constructor(game: Game);
    abstract execute(raw: CommandEvent, game: Game): ReturnRequest[] | void;
}
