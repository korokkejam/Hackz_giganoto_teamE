import { CommandResult, GameState, Move, Position} from '../commonTypes';
import {CommandBase} from '../base/CommandBase';

export class KillCommand extends CommandBase {
    execute(): CommandResult<undefined> {
        throw new Error('Method not implemented.');
    } // 抽象クラスを継承
    // typeを決めて、必要なフィールドを追加
    type = "kill";
    pieceId: string;
    to: Position;

    constructor(raw: any, gameState: GameState) {
        super(raw, gameState);
        this.pieceId = raw.pieceId;
        this.to = raw.to;
    }

    // コマンドの機能本体
    // @ts-ignore
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
            from: null,
            to: null,
        };

        return {
            ...gameState,
            pieces: updatedPieces,
            history: [...gameState.history, move],
        };
    }
}