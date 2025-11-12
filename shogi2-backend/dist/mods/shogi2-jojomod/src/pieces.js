"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lance = exports.silver = exports.gold = exports.pawn = exports.knight = exports.rook = exports.bishop = exports.king2 = exports.king1 = void 0;
const shogi2_types_1 = require("shogi2-types");
exports.king1 = new shogi2_types_1.PieceType("king", "王", {
    absolute: [],
    relative: [{ x: 1, y: 1 }, { x: 1, y: -1 }, { x: -1, y: 1 }, { x: -1, y: -1 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 0 }, { x: 0, y: -1 }]
}, false);
exports.king2 = new shogi2_types_1.PieceType("king", "玉", {
    absolute: [],
    relative: [{ x: 1, y: 1 }, { x: 1, y: -1 }, { x: -1, y: 1 }, { x: -1, y: -1 }, { x: 1, y: 0 }, { x: 0, y: 1 }, { x: -1, y: 0 }, { x: 0, y: -1 }]
}, false);
const promoted_bishop = new shogi2_types_1.PieceType("promoted_bishop", "竜馬", {
    absolute: [],
    relative: [
        { x: 1, y: 1 }, { x: 2, y: 2 }, { x: 3, y: 3 }, { x: 4, y: 4 }, { x: 5, y: 5 }, { x: 6, y: 6 }, { x: 7, y: 7 }, { x: 8, y: 8 },
        { x: 1, y: -1 }, { x: 2, y: -2 }, { x: 3, y: -3 }, { x: 4, y: -4 }, { x: 5, y: -5 }, { x: 6, y: -6 }, { x: 7, y: -7 }, { x: 8, y: -8 },
        { x: -1, y: 1 }, { x: -2, y: 2 }, { x: -3, y: 3 }, { x: -4, y: 4 }, { x: -5, y: 5 }, { x: -6, y: 6 }, { x: -7, y: 7 }, { x: -8, y: 8 },
        { x: -1, y: -1 }, { x: -2, y: -2 }, { x: -3, y: -3 }, { x: -4, y: -4 }, { x: -5, y: -5 }, { x: -6, y: -6 }, { x: -7, y: -7 }, { x: -8, y: -8 },
        { x: 0, y: 1 }, { x: 0, y: -1 }, { x: 1, y: 0 }, { x: -1, y: 0 }
    ]
}, false);
exports.bishop = new shogi2_types_1.PieceType("bishop", "角", {
    absolute: [],
    relative: [
        { x: 1, y: 1 }, { x: 2, y: 2 }, { x: 3, y: 3 }, { x: 4, y: 4 }, { x: 5, y: 5 }, { x: 6, y: 6 }, { x: 7, y: 7 }, { x: 8, y: 8 },
        { x: 1, y: -1 }, { x: 2, y: -2 }, { x: 3, y: -3 }, { x: 4, y: -4 }, { x: 5, y: -5 }, { x: 6, y: -6 }, { x: 7, y: -7 }, { x: 8, y: -8 },
        { x: -1, y: 1 }, { x: -2, y: 2 }, { x: -3, y: 3 }, { x: -4, y: 4 }, { x: -5, y: 5 }, { x: -6, y: 6 }, { x: -7, y: 7 }, { x: -8, y: 8 },
        { x: -1, y: -1 }, { x: -2, y: -2 }, { x: -3, y: -3 }, { x: -4, y: -4 }, { x: -5, y: -5 }, { x: -6, y: -6 }, { x: -7, y: -7 }, { x: -8, y: -8 },
    ]
}, false, promoted_bishop);
const promoted_rook = new shogi2_types_1.PieceType("promoted_rook", "竜王", {
    absolute: [],
    relative: [
        { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 }, { x: 4, y: 0 }, { x: 5, y: 0 }, { x: 6, y: 0 }, { x: 7, y: 0 }, { x: 8, y: 0 },
        { x: -1, y: 0 }, { x: -2, y: 0 }, { x: -3, y: 0 }, { x: -4, y: 0 }, { x: -5, y: 0 }, { x: -6, y: 0 }, { x: -7, y: 0 }, { x: -8, y: 0 },
        { x: 0, y: 1 }, { x: 0, y: 2 }, { x: 0, y: 3 }, { x: 0, y: 4 }, { x: 0, y: 5 }, { x: 0, y: 6 }, { x: 0, y: 7 }, { x: 0, y: 8 },
        { x: 0, y: -1 }, { x: 0, y: -2 }, { x: 0, y: -3 }, { x: 0, y: -4 }, { x: 0, y: -5 }, { x: 0, y: -6 }, { x: 0, y: -7 }, { x: 0, y: -8 },
        { x: 1, y: 1 }, { x: 1, y: -1 }, { x: -1, y: 1 }, { x: -1, y: -1 }
    ]
}, false);
exports.rook = new shogi2_types_1.PieceType("rook", "飛", {
    absolute: [],
    relative: [
        { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 }, { x: 4, y: 0 }, { x: 5, y: 0 }, { x: 6, y: 0 }, { x: 7, y: 0 }, { x: 8, y: 0 },
        { x: -1, y: 0 }, { x: -2, y: 0 }, { x: -3, y: 0 }, { x: -4, y: 0 }, { x: -5, y: 0 }, { x: -6, y: 0 }, { x: -7, y: 0 }, { x: -8, y: 0 },
        { x: 0, y: 1 }, { x: 0, y: 2 }, { x: 0, y: 3 }, { x: 0, y: 4 }, { x: 0, y: 5 }, { x: 0, y: 6 }, { x: 0, y: 7 }, { x: 0, y: 8 },
        { x: 0, y: -1 }, { x: 0, y: -2 }, { x: 0, y: -3 }, { x: 0, y: -4 }, { x: 0, y: -5 }, { x: 0, y: -6 }, { x: 0, y: -7 }, { x: 0, y: -8 },
    ]
}, false, promoted_rook);
const promoted_knight = new shogi2_types_1.PieceType("promoted_knight", "成桂", {
    absolute: [],
    relative: [{ x: 1, y: 1 }, { x: 0, y: 1 }, { x: -1, y: 1 }, { x: 1, y: 0 }, { x: -1, y: 0 }, { x: 0, y: -1 }]
}, false);
exports.knight = new shogi2_types_1.PieceType("knight", "桂", {
    absolute: [],
    relative: [{ x: 1, y: 2 }, { x: -1, y: 2 }]
}, true, promoted_knight);
const promoted_pawn = new shogi2_types_1.PieceType("promoted_pawn", "と金", {
    absolute: [],
    relative: [{ x: 1, y: 1 }, { x: 0, y: 1 }, { x: -1, y: 1 }, { x: 1, y: 0 }, { x: -1, y: 0 }, { x: 0, y: -1 }]
}, false);
exports.pawn = new shogi2_types_1.PieceType("pawn", "歩", {
    absolute: [],
    relative: [{ x: 0, y: 1 }]
}, false, promoted_pawn);
exports.gold = new shogi2_types_1.PieceType("gold", "金", {
    absolute: [],
    relative: [{ x: 1, y: 1 }, { x: 0, y: 1 }, { x: -1, y: 1 }, { x: 1, y: 0 }, { x: -1, y: 0 }, { x: 0, y: -1 }]
}, false);
exports.silver = new shogi2_types_1.PieceType("silver", "銀", {
    absolute: [],
    relative: [{ x: 1, y: 1 }, { x: 0, y: 1 }, { x: -1, y: 1 }, { x: 1, y: -1 }, { x: -1, y: -1 }]
}, false);
const promoted_lance = new shogi2_types_1.PieceType("promoted_lance", "成香", {
    absolute: [],
    relative: [{ x: 1, y: 1 }, { x: 0, y: 1 }, { x: -1, y: 1 }, { x: 1, y: 0 }, { x: -1, y: 0 }, { x: 0, y: -1 }]
}, false);
exports.lance = new shogi2_types_1.PieceType("lance", "香", {
    absolute: [],
    relative: [{ x: 0, y: 1 }, { x: 0, y: 2 }, { x: 0, y: 3 }, { x: 0, y: 4 }, { x: 0, y: 5 }, { x: 0, y: 6 }, { x: 0, y: 7 }, { x: 0, y: 8 },]
}, false, promoted_lance);
