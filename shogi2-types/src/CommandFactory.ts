import {Game} from './types';
import {CommandBase} from './CommandBase';

export type CommandConstructor = new (raw: any, game: Game) => CommandBase<any>;

// Command execution function
export function createCommand<TCommand,TResult=any>(CommandClass:CommandConstructor,raw:TCommand,game:Game):CommandBase<TResult>{
    return new CommandClass(raw, game) as CommandBase<TResult>;
}
