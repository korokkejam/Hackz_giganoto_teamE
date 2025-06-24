"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pieces = exports.pawn = exports.bishop = exports.rook = exports.king2 = exports.king1 = exports.gold_general = exports.silver_general = exports.knight = exports.lance = void 0;
var dark_king = {
    src: "",
    name: "魔王",
    movable: {
        relative: __spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray([], __spreadArray([], Array(8), true).map(function (_, i) { return [0, i + 1]; }), true), __spreadArray([], Array(8), true).map(function (_, i) { return [i + 1, 0]; }), true), __spreadArray([], Array(8), true).map(function (_, i) { return [0, -i - 1]; }), true), __spreadArray([], Array(8), true).map(function (_, i) { return [-i - 1, 0]; }), true), __spreadArray([], Array(8), true).map(function (_, i) { return [i + 1, i + 1]; }), true), __spreadArray([], Array(8), true).map(function (_, i) { return [i + 1, -i - 1]; }), true), __spreadArray([], Array(8), true).map(function (_, i) { return [-i - 1, i + 1]; }), true), __spreadArray([], Array(8), true).map(function (_, i) { return [-i - 1, -i - 1]; }), true),
        absolute: [],
        func: ""
    },
    jumpable: false,
    promotion: undefined,
    promotion_callback: "",
    promotion_msg: [],
    king: true
};
var dragon_king = {
    src: "",
    name: "龍王",
    movable: {
        relative: __spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray([], __spreadArray([], Array(8), true).map(function (_, i) { return [0, i + 1]; }), true), __spreadArray([], Array(8), true).map(function (_, i) { return [i + 1, 0]; }), true), __spreadArray([], Array(8), true).map(function (_, i) { return [0, -i - 1]; }), true), __spreadArray([], Array(8), true).map(function (_, i) { return [-i - 1, 0]; }), true), [[1, 1], [1, -1], [-1, 1], [-1, -1]], false),
        absolute: [],
        func: ""
    },
    jumpable: false,
    promotion: undefined,
    promotion_callback: "",
    promotion_msg: [],
    king: false
};
var promoted_bishop = {
    src: "",
    name: "龍馬",
    movable: {
        relative: __spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray([], __spreadArray([], Array(8), true).map(function (_, i) { return [i + 1, i + 1]; }), true), __spreadArray([], Array(8), true).map(function (_, i) { return [i + 1, -i - 1]; }), true), __spreadArray([], Array(8), true).map(function (_, i) { return [-i - 1, i + 1]; }), true), __spreadArray([], Array(8), true).map(function (_, i) { return [-i - 1, -i - 1]; }), true), [[0, 1], [0, -1], [-1, 0], [1, 0]], false),
        absolute: [],
        func: ""
    },
    jumpable: false,
    promotion: undefined,
    promotion_callback: "",
    promotion_msg: [],
    king: false
};
var promoted_silver = {
    src: "",
    name: "成銀",
    movable: {
        relative: [[1, 1], [0, 1], [-1, 1], [1, 0], [-1, 0], [0, -1]],
        absolute: [],
        func: ""
    },
    jumpable: false,
    promotion: undefined,
    promotion_callback: "",
    promotion_msg: [],
    king: false
};
var promoted_knight = {
    src: "",
    name: "成桂",
    movable: {
        relative: [[1, 1], [0, 1], [-1, 1], [1, 0], [-1, 0], [0, -1]],
        absolute: [],
        func: ""
    },
    jumpable: false,
    promotion: undefined,
    promotion_callback: "",
    promotion_msg: [],
    king: false
};
var promoted_lance = {
    src: "",
    name: "成香",
    movable: {
        relative: [[1, 1], [0, 1], [-1, 1], [1, 0], [-1, 0], [0, -1]],
        absolute: [],
        func: ""
    },
    jumpable: false,
    promotion: undefined,
    promotion_callback: "",
    promotion_msg: [],
    king: false
};
var lance = {
    src: "",
    name: "香",
    movable: {
        relative: __spreadArray([], Array(8), true).map(function (_, i) { return [0, i + 1]; }),
        absolute: [[1, 3]],
        func: ""
    },
    jumpable: false,
    promotion: promoted_lance,
    promotion_callback: "",
    promotion_msg: [],
    king: false
};
exports.lance = lance;
var knight = {
    src: "",
    name: "桂",
    movable: {
        relative: [[1, 2], [-1, 2]],
        absolute: [],
        func: ""
    },
    jumpable: true,
    promotion: promoted_knight,
    promotion_callback: "",
    promotion_msg: [],
    king: false
};
exports.knight = knight;
var silver_general = {
    src: "",
    name: "銀",
    movable: {
        relative: [[1, 1], [0, 1], [-1, 1], [-1, -1], [1, -1]],
        absolute: [],
        func: ""
    },
    jumpable: false,
    promotion: promoted_silver,
    promotion_callback: "",
    promotion_msg: ["成りますか？", "嫌じゃないかもしれない", "嫌です"],
    king: false
};
exports.silver_general = silver_general;
var gold_general = {
    src: "",
    name: "金",
    movable: {
        relative: [[1, 1], [0, 1], [-1, 1], [1, 0], [-1, 0], [0, -1]],
        absolute: [],
        func: ""
    },
    jumpable: false,
    promotion: undefined,
    promotion_callback: "",
    promotion_msg: [],
    king: false
};
exports.gold_general = gold_general;
var promoted_pawn = {
    src: "",
    name: "と金",
    movable: {
        relative: [[1, 1], [0, 1], [-1, 1], [1, 0], [-1, 0], [0, -1]],
        absolute: [],
        func: ""
    },
    jumpable: false,
    promotion: undefined,
    promotion_callback: "",
    promotion_msg: [],
    king: false
};
var king1 = {
    src: "",
    name: "王",
    movable: {
        relative: [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]],
        absolute: [],
        func: ""
    },
    jumpable: false,
    promotion: dark_king,
    promotion_callback: "",
    promotion_msg: ["更なる力が欲しいか？", "欲しい", "欲しくない"],
    king: true
};
exports.king1 = king1;
var king2 = {
    src: "",
    name: "玉",
    movable: {
        relative: [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]],
        absolute: [],
        func: ""
    },
    jumpable: false,
    promotion: dark_king,
    promotion_callback: "",
    promotion_msg: ["更なる力が欲しいか？", "欲しい", "欲しくない"],
    king: true
};
exports.king2 = king2;
var rook = {
    src: "",
    name: "飛",
    movable: {
        relative: __spreadArray(__spreadArray(__spreadArray(__spreadArray([], __spreadArray([], Array(8), true).map(function (_, i) { return [0, i + 1]; }), true), __spreadArray([], Array(8), true).map(function (_, i) { return [i + 1, 0]; }), true), __spreadArray([], Array(8), true).map(function (_, i) { return [0, -i - 1]; }), true), __spreadArray([], Array(8), true).map(function (_, i) { return [-i - 1, 0]; }), true),
        absolute: [],
        func: ""
    },
    jumpable: false,
    promotion: dragon_king,
    promotion_callback: "",
    promotion_msg: [],
    king: false
};
exports.rook = rook;
var bishop = {
    src: "",
    name: "角",
    movable: {
        relative: __spreadArray(__spreadArray(__spreadArray(__spreadArray([], __spreadArray([], Array(8), true).map(function (_, i) { return [i + 1, i + 1]; }), true), __spreadArray([], Array(8), true).map(function (_, i) { return [i + 1, -i - 1]; }), true), __spreadArray([], Array(8), true).map(function (_, i) { return [-i - 1, i + 1]; }), true), __spreadArray([], Array(8), true).map(function (_, i) { return [-i - 1, -i - 1]; }), true),
        absolute: [],
        func: ""
    },
    jumpable: false,
    promotion: promoted_bishop,
    promotion_callback: "",
    promotion_msg: [],
    king: false
};
exports.bishop = bishop;
var pawn = {
    src: "",
    name: "歩",
    movable: {
        relative: [[0, 1]],
        absolute: [],
        func: ""
    },
    jumpable: false,
    promotion: promoted_pawn,
    promotion_callback: "",
    promotion_msg: [],
    king: false
};
exports.pawn = pawn;
var pieces = [lance, knight, silver_general, gold_general, king1, king2, rook, bishop, pawn,];
exports.pieces = pieces;
