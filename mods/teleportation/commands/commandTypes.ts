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

export type Command =
    {
    type: "teleport";
    pieceId: string;
    to: Position;
    }
    {
    // ここに他のコマンドの定義も追加
    };

export interface Move {
    type: "teleport"; // ここに他のコマンドを列挙
    pieceId?: string;
    from?: Position | null;
    to?: Position;
    // 必要なプロパティを追加
}
