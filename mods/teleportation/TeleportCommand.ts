import { GameState, Move, Position, Piece } from '../commonTypes';
import { CommandBase } from '../base/CommandBase';

export class TeleportCommand extends CommandBase {
  type = "teleport";
  pieceId: string;
  to: Position;
  
  constructor(raw: any, gameState: GameState) {
    super(raw, gameState);
    this.pieceId = raw.pieceId;
    this.to = raw.to;
  }

  // Command handler functions
  executeCommand(gameState: GameState): GameState {
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
      ...gameState,
      pieces: updatedPieces,
      history: [...gameState.history, move],
    };
  }
}