import { Player, Pos } from "./index";
export interface Piece {
    position: Pos;
    type: PieceType;
    id: string;
    player: Player;
}
export declare class PieceType {
    name: string;
    movable: Movable;
    after_promotion: PieceType | undefined;
    image: string | undefined;
    animation: Animation;
    jumpable: boolean;
    constructor(name: string, movable: Movable, jumpable: boolean, after_promotion?: PieceType);
}
export interface Movable {
    absolute: Pos[];
    relative: Pos[];
}
export interface Animation {
    seconds: number;
    operation: Record<number, number>;
}
