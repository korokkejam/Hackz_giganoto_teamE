import { Game } from './types';
import { CommandBase } from './CommandBase';
export type CommandConstructor = new (raw: any, game: Game) => CommandBase<any>;
export declare function createCommand<TCommand, TResult = any>(CommandClass: CommandConstructor, raw: TCommand, game: Game): CommandBase<TResult>;
