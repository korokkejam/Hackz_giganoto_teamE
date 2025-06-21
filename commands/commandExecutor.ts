import { GameState, Command, Move, Position, Piece } from './commandTypes';

// Command execution function
export function executeCommand(command: Command, gameState: GameState): GameState {
  switch (command.type) {
    case "teleport":
      return teleportPiece(command.pieceId, command.to, gameState);

    //ここに他のコマンドの関数を追加
    
    default:
      return gameState;
  }
}

// Command handler functions
function teleportPiece(pieceId: string, to: Position, gameState: GameState): GameState {
  const updatedPieces = gameState.pieces.map(piece => {
    if (piece.id === pieceId) {
      return { ...piece, position: to };
    }
    return piece;
  });

  const movedPiece = gameState.pieces.find(p => p.id === pieceId);
  const move: Move = {
    type: "teleport",
    pieceId,
    from: movedPiece?.position ?? null,
    to,
  };

  return {
    ...gameState,
    pieces: updatedPieces,
    history: [...gameState.history, move],
  };
}

// 以降に他のコマンドの関数本体を追加
