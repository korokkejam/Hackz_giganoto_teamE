// 駒の位置情報
export interface Position {
    x: number;
    y: number;
}

// 駒の情報
export interface Piece {
    id: string;
    type: string;
    owner: "sente" | "gote";
    position: Position | null;
    isPromoted: boolean;
}

// 盤面全体の情報
export interface GameState {
    pieces: Piece[];
    turn: "sente" | "gote";
    history: Move[];
}

// 移動履歴
export interface Move {
    pieceId: string;
    from: Position | null;
    to: Position | null;
}

// 各コマンドの返り値定義
export interface CommandResult<T = undefined> {
    data?: T;
}
