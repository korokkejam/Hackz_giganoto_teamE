import { GameState, CommandResult } from './commonTypes';
import { createCommand } from './commandFactory';

// フロント側からこの関数を呼び出すことになると思うんだよねー
export async function executeCommand<TCommand extends {type: string}, TResult = undefined>(raw: TCommand, gamestate: GameState): Promise<CommandResult<TResult>> {
  const command = createCommand<TCommand, TResult>(raw, gamestate);
  return await command.execute();
}
