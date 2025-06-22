import { CommandResult, GameState } from './commonTypes';
import { CommandBase } from './base/CommandBase';
import { CococomaiCommand } from './cococomai/CococomaiCommand';
import { KillCommand } from './kill/KillCommand';
import { PlaySoundCommand } from './playsound/PlaySoundCommand';
import { TeleportCommand } from './teleportation/TeleportCommand';
// ここに新しいクラスをインポート

// Command execution function
export function createCommand<TCommand extends {type: string}, TResult = undefined>(raw: TCommand, gameState: GameState): CommandBase<TResult> {
  
  switch (raw.type) {
    case 'cococomai':
      return new CococomaiCommand(raw, gameState) as unknown as CommandBase<TResult>;
    case 'kill':
      return new KillCommand(raw, gameState) as unknown as CommandBase<TResult>;
    case 'playSound':
      return new PlaySoundCommand(raw, gameState) as unknown as CommandBase<TResult>;
    case 'teleport':
      return new TeleportCommand(raw, gameState) as unknown as CommandBase<TResult>;
    // ここに新しいcaseを追加
    
    default:
      throw new Error(`Unknown command type: ${raw.type}`);
  }

}

// フロント側からこの関数を呼び出すことになると思うんだよねー
export function executeCommand<TCommand extends {type: string}, TResult = undefined>(raw: TCommand, gamestate: GameState): CommandResult<TResult> {
  const command = createCommand<TCommand, TResult>(raw, gamestate);
  return command.execute();
}
