import { CommandResult, GameState, Move, Position} from '../commonTypes';
import {CommandBase} from '../base/CommandBase';

interface KillResult {
    gameState: GameState;
}

export class KillCommand extends CommandBase<KillResult> {
    // 抽象クラスを継承
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
    async execute(): Promise<CommandResult<KillResult>> {
        const updatedPieces = this.gameState.pieces.map(piece => {
            if (piece.id === this.pieceId) {
                return { ...piece, position: this.to };
            }
            return piece;
        });

        const movedPiece = this.gameState.pieces.find(p => p.id === this.pieceId);
        const move: Move = {
            pieceId: this.pieceId,
            from: null,
            to: null,
        };

        return {
            data: {
                gameState: {
                    ...this.gameState,
                    pieces: updatedPieces,
                    history: [...this.gameState.history, move],
                },
            },
        };
    }
}