
// Type definitions
interface Position {
  x: number;
  y: number;
}

interface Piece {
  id: string;
  type: string;
  owner: "sente" | "gote";
  position: Position | null;
  isPromoted: boolean;
}

interface GameState {
  pieces: Piece[];
  turn: "sente" | "gote";
  history: Move[];
}

type Command =
  {
    type: "teleport";
    pieceId: string;
    to: Position;
  }
  {
    // ここに他のコマンドの定義も追加
  };

interface Move {
  type: "teleport"; // ここに他のコマンドを列挙
  pieceId?: string;
  from?: Position | null;
  to?: Position;
  // 必要なプロパティを追加
}

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
