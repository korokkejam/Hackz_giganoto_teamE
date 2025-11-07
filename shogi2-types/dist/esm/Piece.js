;
export class PieceType {
    name;
    movable;
    after_promotion;
    image;
    animation;
    jumpable;
    constructor(name, movable, jumpable, after_promotion) {
        this.name = name;
        this.movable = movable;
        this.after_promotion = after_promotion;
        this.image = undefined;
        this.animation = { seconds: 0.1, operation: { 0: 0, 100: 100 } };
        this.jumpable = jumpable;
    }
}
;
;
;
//# sourceMappingURL=Piece.js.map