;
export class PieceType {
    name;
    id;
    movable;
    after_promotion;
    image;
    animation;
    jumpable;
    constructor(id, name, movable, jumpable, after_promotion) {
        this.id = id;
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