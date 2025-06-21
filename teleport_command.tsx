
import React, { useState } from 'react';

// Type definitions
interface Position {
  x: number;
  y: number;
}

interface Piece {
  id: string;
  type: string;
  owner: 'sente' | 'gote';
  position: Position | null;
  isPromoted: boolean;
}

interface GameState {
  pieces: Piece[];
  turn: 'sente' | 'gote';
  history: Move[];
}

type Command = {
      type: 'teleport';
      pieceId: string;
      to: Position;
};

interface Move {
  type: 'teleport';
  pieceId: string;
  from: Position | null;
  to: Position;
}

// Initial game state (example)
const initialGameState: GameState = {
  pieces: [
    { id: '1', type: 'FU', owner: 'sente', position: { x: 1, y: 3 }, isPromoted: false },
    { id: '2', type: 'OU', owner: 'gote', position: { x: 5, y: 5 }, isPromoted: false },
    // Add more pieces as needed
  ],
  turn: 'sente',
  history: [],
};

// Command execution function
function executeCommand(command: Command, gameState: GameState): GameState {
  switch (command.type) {
    case 'teleport':
      return teleportPiece(command.pieceId, command.to, gameState);
    default:
      return gameState;
  }
}

function teleportPiece(pieceId: string, to: Position, gameState: GameState): GameState {
  const updatedPieces = gameState.pieces.map(piece => {
    if (piece.id === pieceId) {
      return { ...piece, position: to };
    }
    return piece;
  });

  const movedPiece = gameState.pieces.find(p => p.id === pieceId);
  const move: Move = {
    type: 'teleport',
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

// React component
const ShogiBoard: React.FC = () => {
  const [commandMode, setCommandMode] = useState<'teleport' | null>(null);
  const [selectedPieceId, setSelectedPieceId] = useState<string | null>(null);
  const [gameState, setGameState] = useState<GameState>(initialGameState);

  // Handle piece click
  const handlePieceClick = (pieceId: string) => {
    setSelectedPieceId(pieceId);
  };

  // Handle cell click
  const handleCellClick = (x: number, y: number) => {
    if (commandMode === 'teleport' && selectedPieceId) {
      const command: Command = {
        type: 'teleport',
        pieceId: selectedPieceId,
        to: { x, y },
      };

      const newState = executeCommand(command, gameState);
      setGameState(newState);

      // Reset state
      setCommandMode(null);
      setSelectedPieceId(null);
    }
  };

  return (
    <div>
      <button onClick={() => setCommandMode('teleport')}>Teleport</button>
      <div className="board">
        {Array.from({ length: 9 }, (_, y) =>
          <div key={y} className="row">
            {Array.from({ length: 9 }, (_, x) =>
              <div
                key={x}
                className="cell"
                onClick={() => handleCellClick(x + 1, y + 1)}
              >
                {gameState.pieces.find(p => p.position?.x === x + 1 && p.position?.y === y + 1)?.type}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Minimal styling
const styles = `
.board {
  display: grid;
  grid-template-columns: repeat(9, 40px);
  grid-template-rows: repeat(9, 40px);
  gap: 2px;
}

.row {
  display: contents;
}

.cell {
  width: 40px;
  height: 40px;
  background-color: #f0d9b5;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #b58863;
  cursor: pointer;
}

.cell:hover {
  background-color: #b58863;
}
`;

export default ShogiBoard;
