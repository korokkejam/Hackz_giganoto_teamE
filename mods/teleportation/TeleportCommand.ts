import { CommandResult, GameState, Move, Position } from '../commonTypes';
import { CommandBase } from '../base/CommandBase';

interface TeleportResult {
  gameState: GameState;
}

export class TeleportCommand extends CommandBase<TeleportResult> { // 抽象クラスを継承
  // typeを決めて、必要なフィールドを追加（pieceIDとtoはTeleportCommandに必要なフィールド）
  type = "teleport";
  pieceId: string;
  to: Position;
  
  constructor(raw: any, gameState: GameState) {
    super(raw, gameState);
    this.pieceId = raw.pieceId;
    this.to = raw.to;
  }

  // コマンドの機能本体
  executeCommand(gameState: GameState): CommandResult<TeleportResult> {
    const updatedPieces = gameState.pieces.map(piece => {
      if (piece.id === this.pieceId) {
        return { ...piece, position: this.to };
      }
      return piece;
    });

    const movedPiece = gameState.pieces.find(p => p.id === this.pieceId);
    const move: Move = {
      pieceId: this.pieceId,
      from: movedPiece?.position ?? null,
      to: this.to,
    };

    return {
      data: {
        gameState: {
          pieces: updatedPieces,
          turn: this.gameState.turn,
          history: [...this.gameState.history, move],
        },
      },
    };
  }
}