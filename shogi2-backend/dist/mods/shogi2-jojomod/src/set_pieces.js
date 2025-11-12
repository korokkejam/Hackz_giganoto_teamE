"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = set_pieces;
const piece_generate_1 = require("./piece_generate");
function set_pieces(board) {
    piece_generate_1.pieces.forEach((p) => {
        const piece = {
            position: { x: p.x, y: p.y },
            type: p.type,
            player: p.player,
            id: crypto.randomUUID()
        };
        board.squares = board.squares.map((square) => {
            if (square.position.x === p.x && square.position.y === p.y) {
                square.piece = piece;
            }
            return square;
        });
    });
}
