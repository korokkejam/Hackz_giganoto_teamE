import { CommandResult, GameState, Move, Position} from '../commonTypes';
import {CommandBase} from '../base/CommandBase';
import {readFileSync} from "node:fs";

interface playSoundResult {
  gameState: GameState;
  sound: string;
}

export class PlaySoundCommand extends CommandBase<playSoundResult> {
  async execute(): Promise<CommandResult<playSoundResult>> {
    throw new Error('Method not implemented.');
  } // 抽象クラスを継承
  // typeを決めて、必要なフィールドを追加
  type = "playSound";
  pieceId: string;
  to: Position;

  constructor(raw: any, gameState: GameState) {
    super(raw, gameState);
    this.pieceId = raw.pieceId;
    this.to = raw.to;
  }

  // コマンドの機能本体
  // @ts-ignore
  executeCommand(gameState: GameState): CommandResult<playSoundResult> { // ←返り値の型をこんなふうにする
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
      data: {
        gameState: {
          ...this.gameState,
          pieces: updatedPieces,
          turn: this.gameState.turn,
          history: [...this.gameState.history, move],
        },
        sound: readFileSync("assets/move.mp3", "utf-8"),
      },
    };
  }
}
