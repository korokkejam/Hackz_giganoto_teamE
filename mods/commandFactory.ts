import { GameState } from './commonTypes';
import { CommandBase } from './base/CommandBase';
import { commandRegistry, CommandConstructor } from './commandRegistry';

// Command execution function
export function createCommand<TCommand extends {type: string}, TResult = undefined>(raw: TCommand, gameState: GameState): CommandBase<TResult> {
    const CommandClass: CommandConstructor | undefined = commandRegistry[raw.type];
    if (!CommandClass) {
        throw new Error(`Unknown command type: ${raw.type}`);
    }

    return new CommandClass(raw, gameState) as CommandBase<TResult>;
}
