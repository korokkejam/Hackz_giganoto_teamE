import { GameState, CommandResult } from "../commonTypes";
import { CommandBase } from "../base/CommandBase";

interface ChangeBackgroundResult {
    color: string;
}

export class ChangeBackgroundCommand extends CommandBase<ChangeBackgroundResult> { // 抽象クラスを継承
    // typeを決めて、必要なフィールドを追加
    type = "changeBackground";
    color: string;
    
    constructor(raw: any, gameState: GameState) {
        super(raw, gameState);
        this.color = raw.color || '#ffffff'; // デフォルトは白
    }

    async execute(): Promise<CommandResult<ChangeBackgroundResult>> {
        return {
            data:
            {
                color: this.color,
            },
        };
    }
}
