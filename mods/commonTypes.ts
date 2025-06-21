export interface Position {
    x: number;
    y: number;
}

export interface Piece {
    id: string;
    type: string;
    owner: "sente" | "gote";
    position: Position | null;
    isPromoted: boolean;
}

export interface GameState {
    pieces: Piece[];
    turn: "sente" | "gote";
    history: Move[];
}

export interface Move {
    pieceId: string;
    from: Position | null;
    to: Position;
}

export interface CommandResult<T = undefined> {
    data?: T;
}
