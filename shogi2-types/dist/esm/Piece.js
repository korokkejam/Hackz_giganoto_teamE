;
export class PieceType {
    name;
    movable;
    before_promotion;
    after_promotion;
    image;
    animation;
    jumpable;
    constructor(name, movable, jumpable) {
        this.name = name;
        this.movable = movable;
        this.before_promotion = undefined;
        this.after_promotion = undefined;
        this.image = undefined;
        this.animation = { seconds: 0.1, operation: { 0: 0, 100: 100 } };
        this.jumpable = jumpable;
    }
}
;
;
;
//# sourceMappingURL=Piece.js.map