
import { Piece, Move, GameState } from '../commonTypes';

export abstract class CommandBase {
    abstract type: string;
    
    protected pieces: Piece[];
    protected turn: "sente" | "gote";
    protected history: Move[];
    
    constructor(protected readonly raw: any, protected readonly gameState: GameState) {
        this.pieces = gameState.pieces;
        this.turn = gameState.turn;
        this.history = gameState.history;
    }

    abstract executeCommand(state: GameState): GameState;
}