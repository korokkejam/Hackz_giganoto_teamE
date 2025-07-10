import { Game } from './types';
import { CommandBase } from './CommandBase';
export type CommandConstructor = new (game: Game) => CommandBase;
export declare function createCommand(CommandClass: CommandConstructor, game: Game): CommandBase;
