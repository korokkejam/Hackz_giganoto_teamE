import { GameState } from './commonTypes';
import { CommandBase } from './base/CommandBase';
import { CococomaiCommand } from './cococomai/CococomaiCommand';
import { KillCommand } from './kill/KillCommand';
import { PlaySoundCommand } from './playsound/PlaySoundCommand';
import { TeleportCommand } from './teleportation/TeleportCommand';
import { ChangeBackgroundCommand } from './changeBackgournd/changeBackgounrd';
// ここに新しいコマンドを追加

export type CommandConstructor = new (raw: any, gameState: GameState) => CommandBase<any>;

export const commandRegistry: Record<string, CommandConstructor> = {
    cococomai: CococomaiCommand,
    kill: KillCommand,
    playSound: PlaySoundCommand,
    teleport: TeleportCommand,
    changeBackground: ChangeBackgroundCommand,
    // 他のコマンドもここに追加
};
