import { CommandBase } from '../base/CommandBase';
import { Position, CommandResult,piece } from '../commonTypes';

interface CococomaiResult {
  restrictedPositions: Position[];
}

export class CococomaiCommand extends CommandBase<CococomaiResult> {
  type = 'cococomai';

  async execute(): Promise<CommandResult<CococomaiResult>> {
    let king:piece|undefined;
    this.gameState.boards.map((board)=>{
      board.map((row)=>{
        row.map((s)=>{
          if (s.piece?.type.king && this.gameState.turn){
            king=s.piece;
          }
        });
      });
    });

    if (!king || !king.position){
      return {data:{restrictedPositions:[]}}; // 王がいない場合は空配列
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
        data: {
            restrictedPositions,
        },
    };
  }
}
