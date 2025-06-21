import { GameState, Move, Position } from '../commonTypes';
import { CommandBase } from '../base/CommandBase';

export class TeleportCommand extends CommandBase { // 抽象クラスを継承
  // typeを決めて、必要なフィールドを追加
  type = "teleport";
  pieceId: string;
  to: Position;
  
  constructor(raw: any, gameState: GameState) {
    super(raw, gameState);
    this.pieceId = raw.pieceId;
    this.to = raw.to;
  }

  // コマンドの機能本体
  executeCommand(gameState: GameState): GameState {
    const updatedPieces = gameState.pieces.map(piece => {
      if (piece.id === this.pieceId) {
        return { ...piece, position: this.to };
      }
      return piece;
    });

    // @ts-ignore
    const movedPiece = gameState.pieces.find(p => p.id === this.pieceId);
    const move: Move = {
      pieceId: this.pieceId,
      from: movedPiece?.position ?? null,
      to: this.to,
    };

    return {
      ...gameState,
      pieces: updatedPieces,
      history: [...gameState.history, move],
    };
  }
}