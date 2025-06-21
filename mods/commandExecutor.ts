import { CommandResult, GameState } from './commonTypes';
import { CommandBase } from './base/CommandBase';
import { TeleportCommand } from './teleportation/TeleportCommand'
// ここに新しいクラスをインポート

// Command execution function
export function createCommand(raw: any, state: GameState): CommandBase<any> {
  
  switch (raw.type) {
    case 'teleport':
      return new TeleportCommand(raw, state);

    // ここに新しいcaseを追加
    
    default:
      throw new Error(`Unknown command type: ${raw.type}`);
  }

}

export function executeCommand(raw: any, gamestate: GameState): CommandResult {
  const command = createCommand(raw, gamestate);
  return command.executeCommand(gamestate);
}
