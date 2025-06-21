
// Type definitions

interface Position {
  x: number; // 1〜9
  y: number; // 1〜9
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

// ユーザがteleportコマンドを実行すると発行されるオブジェクト
type Command = {
      type: "teleport";
      pieceId: string;
      to: Position;
};

// 移動履歴オブジェクト
interface Move {
  type: "teleport";
  pieceId: string;
  from: Position | null;
  to: Position;
}

// Command execution functions

// 発行されたCommandオブジェクトが渡される
function executeCommand(command: Command, gameState: GameState): GameState {
  switch (command.type) {
    case "teleport":
      return teleportPiece(command.pieceId, command.to, gameState);
    default:
      return gameState;
  }
}

// teleport処理の実行
function teleportPiece(pieceId: string, to: Position, gameState: GameState): GameState {
  const updatedPieces = gameState.pieces.map(piece => { // gameState.piecesはpieceの配列
    if (piece.id === pieceId) { // テレポート対象の駒だったら
      return { ...piece, position: to }; // 駒の位置: position をtoに更新
    }
    return piece; // それ以外の駒はそのまま
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
    pieces: updatedPieces, // piecesを新しい配列に更新
    history: [...gameState.history, move], // 今回の移動履歴moveをhistoryに追加
  };
  // gameStateを更新
}
