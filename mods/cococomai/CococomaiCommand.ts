import { CommandBase } from '../base/CommandBase';
import { Position, CommandResult } from '../commonTypes';

export class CococomaiCommand extends CommandBase<Position[]> {
    type = 'cococomai';

    execute(): CommandResult<Position[]> {
        const king = this.gameState.pieces.find(
            (p) => p.type === 'king' && p.owner === this.gameState.turn
        );

        if (!king || !king.position) {
            return { data: [] }; // 王がいない場合は空配列
        }

        const { x, y } = king.position;
        const restrictedPositions: Position[] = [];

        for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
                if (dx === 0 && dy === 0) continue;
                const nx = x + dx;
                const ny = y + dy;
                if (nx >= 0 && nx < 9 && ny >= 0 && ny < 9) {
                    restrictedPositions.push({ x: nx, y: ny });
                }
            }
        }

        return {
            data: restrictedPositions,
        };
    }
}
