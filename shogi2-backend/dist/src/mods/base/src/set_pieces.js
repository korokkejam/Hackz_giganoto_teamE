"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = set_pieces;
const piece_generate_1 = require("./piece_generate");
function set_pieces(board) {
    board.squares = board.squares.map((square) => {
        const { x, y } = square.position;
        const d = piece_generate_1.pieces.find((p) => p.x === x && p.y === y);
        if (d) {
            square.piece = generate({ x: d.x, y: d.y }, d.type, d.player);
        }
        return square;
    });
}
;
function generate(position, type, player) {
    return {
        position,
        type,
        id: crypto.randomUUID(),
        player
    };
}
