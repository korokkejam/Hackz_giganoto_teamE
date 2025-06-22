import { CommandResult, GameState, Move, Position } from '../commonTypes';
import { CommandBase } from '../base/CommandBase';
// @ts-ignore
import doubutsuShogiPiece from './doubutsuPiece';

// このクラス(のexecuteCommand)が返すデータの型
interface doubutsuShogi {
    gameState: GameState;
    board: number[][];
}

export class doubutsuShogiEx extends CommandBase<doubutsuShogi> { // 抽象クラスを継承
    // typeを決めて、必要なフィールドを追加（pieceIDとtoはTeleportCommandに必要なフィールド）
    // 必要なら新しいデータ型も定義する（別ファイルに書いてインポート推奨）
    type = "doubutsuShogi";
    pieceId: string;
    to: Position;

    constructor(raw: any, gameState: GameState) {
        super(raw, gameState);
        this.pieceId = raw.pieceId;
        this.to = raw.to;
    }

    // コマンドの機能本体
    execute(): CommandResult<doubutsuShogi> { // ←返り値の型をこんなふうにする
        const updatedPieces = this.gameState.pieces.map(piece => {
            if (piece.id === this.pieceId) {
                return { ...piece, position: this.to };
            }
            return piece;
        });

        const movedPiece = this.gameState.pieces.find(p => p.id === this.pieceId);
        const move: Move = {
            pieceId: this.pieceId,
            from: movedPiece?.position ?? null,
            to: this.to,
        };

        return {
            data: {
                gameState: {
                    pieces: updatedPieces,
                    turn: this.gameState.turn,
                    history: [...this.gameState.history, move],
                },
                board: Array(3).fill(4).map(()=>Array(4).fill(0)),
            },
        };
    }
}