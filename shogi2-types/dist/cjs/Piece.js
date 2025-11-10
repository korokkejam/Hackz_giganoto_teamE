"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PieceType = void 0;
;
class PieceType {
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
exports.PieceType = PieceType;
;
;
;
//# sourceMappingURL=Piece.js.map