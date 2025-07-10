import {Game} from './types';
import {CommandBase} from './CommandBase';

export type CommandConstructor = new (game: Game) => CommandBase;

// Command execution function
export function createCommand(CommandClass:CommandConstructor,game:Game):CommandBase{
    return new CommandClass(game) as CommandBase;
}
