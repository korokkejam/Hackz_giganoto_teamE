import { Player } from "./index";
export interface Piece {
    position: {
        x: number;
        y: number;
    };
    type: PieceType;
    id: string;
    player: Player;
}
export declare class PieceType {
    name: string;
    movable: Movable;
    before_promotion: PieceType | undefined;
    after_promotion: PieceType | undefined;
    image: string | undefined;
    animation: Animation;
    jumpable: boolean;
    constructor(name: string, movable: Movable, jumpable: boolean);
}
export interface Movable {
    absolute: {
        x: number;
        y: number;
    }[];
    relative: {
        x: number;
        y: number;
    }[];
}
export interface Animation {
    seconds: number;
    operation: Record<number, number>;
}
