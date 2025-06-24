"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var wall = {
    name: "壁",
    movable: {
        relative: [],
        absolute: [],
        func: ""
    },
    jumpable: false,
    src: "",
    promotion: undefined,
    promotion_callback: "",
    promotion_msg: [],
    king: false
};
var knight_chess = {
    name: "騎士",
    movable: {
        relative: [[1, 2], [-1, 2], [2, 1], [2, -1], [-2, 1], [-2, -1], [1, -2], [-1, -2]],
        absolute: [],
        func: ""
    },
    jumpable: true,
    src: "",
    promotion: undefined,
    promotion_callback: "",
    promotion_msg: [],
    king: false
};
var redbull = {
    name: "赤牛",
    movable: {
        relative: [[1, 0], [0, 1], [-1, 0], [0, -1]],
        absolute: [[0, 8], [8, 8], [8, 0], [0, 0]],
        func: ""
    },
    jumpable: true,
    src: "",
    promotion: {
        name: "神牛",
        movable: {
            relative: [[1, 0], [0, 1], [-1, 0], [0, -1]],
            absolute: [[0, 8], [8, 8], [8, 0], [0, 0]],
            func: "()=>[Math.floor(Math.random()*9),Math.floor(Math.random()*9)]"
        },
        jumpable: true,
        src: "",
        promotion: undefined,
        promotion_callback: "",
        promotion_msg: [],
        king: false
    },
    promotion_callback: "",
    promotion_msg: ["翼を授かりますか？", "授かる", "授からない"],
    king: false
};
var superman = {
    name: "超人",
    movable: {
        relative: [[2, 2], [-2, 2], [2, -2], [-2, -2]],
        absolute: [],
        func: ""
    },
    jumpable: true,
    src: "",
    promotion: undefined,
    promotion_callback: "",
    promotion_msg: [],
    king: false
};
var ki = {
    name: "奇", movable: {
        relative: [],
        absolute: [],
        func: "()=>[Math.floor(Math.random()*9),Math.floor(Math.random()*9)]"
    },
    jumpable: true,
    src: "",
    promotion: undefined,
    promotion_callback: "",
    promotion_msg: [],
    king: false
};
var pawn = {
    name: "ポ", movable: {
        relative: [[0, 1], [0, 2]],
        absolute: [],
        func: ""
    },
    jumpable: false,
    src: "",
    promotion: undefined,
    promotion_callback: "",
    promotion_msg: [],
    king: false
};
var oh = {
    name: "oh", movable: {
        relative: [[1, 2], [-1, 1]],
        absolute: [],
        func: ""
        //oh!!!
    },
    jumpable: false,
    src: "",
    promotion: undefined,
    promotion_callback: "",
    promotion_msg: [],
    king: false
};
var emoji = {
    name: "🤔", movable: {
        relative: [[0, 1], [1, 0], [-1, 0], [0, -1]],
        absolute: [[0, 0], [0, 8], [8, 0], [8, 8]],
        func: ""
    },
    jumpable: true,
    src: "",
    promotion: undefined,
    promotion_callback: "",
    promotion_msg: [],
    king: false
};
var pieces = [wall, emoji, oh, knight_chess, redbull, superman, pawn, ki];
exports.default = pieces;
