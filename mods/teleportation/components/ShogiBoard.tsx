
import React, { useState } from 'react';
import { executeCommand } from '../commands/commandExecutor';
import { GameState, Command, Position } from '../commands/commandTypes';

// Initial game state (example)
const initialGameState: GameState = {
  pieces: [
    // Example pieces
    { id: 'piece1', type: 'FU', owner: 'sente', position: { x: 1, y: 3 }, isPromoted: false },
    { id: 'piece2', type: 'KY', owner: 'gote', position: { x: 9, y: 7 }, isPromoted: false },
    // Add more pieces as needed
  ],
  turn: 'sente',
  history: [],
};

const ShogiBoard: React.FC = () => {
  const [commandMode, setCommandMode] = useState<"teleport" | null>(null);
  const [selectedPieceId, setSelectedPieceId] = useState<string | null>(null);
  const [gameState, setGameState] = useState<GameState>(initialGameState);

  // Handle piece selection
  const handlePieceClick = (pieceId: string) => {
    setSelectedPieceId(pieceId);
  };

  // Handle cell click for teleport command
  const handleCellClick = (x: number, y: number) => {
    if (commandMode === "teleport" && selectedPieceId) {
      const command: Command = {
        type: "teleport",
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
    <div className="shogi-board">
      <h1>将棋アプリ</h1>
      <button onClick={() => setCommandMode("teleport")}>Teleport</button>
      <div className="board">
        {Array.from({ length: 9 }, (_, y) =>
          <div key={y} className="row">
            {Array.from({ length: 9 }, (_, x) =>
              <div
                key={x}
                className="cell"
                onClick={() => handleCellClick(x + 1, y + 1)}
              >
                {/* Display piece if present */}
                {gameState.pieces.find(p => p.position?.x === x + 1 && p.position?.y === y + 1)?.type}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShogiBoard;
