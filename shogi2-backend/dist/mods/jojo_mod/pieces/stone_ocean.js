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
exports.stone_ocean_pieces = void 0;
exports.stone_ocean_pieces = [
    {
        name: "緑坊",
        id: "green baby",
        src: "",
        movable: {
            absolute: [],
            relative: [[0, 1]],
            func: ""
        },
        jumpable: false,
        promotion: undefined,
        promotion_callback: "",
        promotion_msg: [],
        king: false
    },
    {
        name: "白蛇",
        id: "white snake",
        src: "",
        movable: {
            absolute: [],
            relative: [[1, 1], [1, 0], [1, -1], [0, 1], [0, -1], [-1, 1], [-1, 0], [-1, -1]],
            func: ""
        },
        jumpable: false,
        promotion: {
            name: "緑月",
            id: "c-moon",
            src: "",
            movable: {
                absolute: [],
                relative: [[2, 0], [1, 0], [-1, 0], [-2, 0], [0, 2], [0, 1], [0, -1], [0, -2], [2, 2], [1, 1], [-1, -1], [-2, -2], [2, -2], [1, -1], [-1, 1], [-2, 2]],
                func: ""
            },
            jumpable: false,
            promotion: {
                name: "楽園",
                id: "made-in-heaven",
                src: "",
                movable: {
                    absolute: [],
                    relative: __spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray([], __spreadArray([], Array(8), true).map(function (_, i) { return [0, i + 1]; }), true), __spreadArray([], Array(8), true).map(function (_, i) { return [i + 1, 0]; }), true), __spreadArray([], Array(8), true).map(function (_, i) { return [0, -i - 1]; }), true), __spreadArray([], Array(8), true).map(function (_, i) { return [-i - 1, 0]; }), true), __spreadArray([], Array(8), true).map(function (_, i) { return [i + 1, i + 1]; }), true), __spreadArray([], Array(8), true).map(function (_, i) { return [i + 1, -i - 1]; }), true), __spreadArray([], Array(8), true).map(function (_, i) { return [-i - 1, i + 1]; }), true), __spreadArray([], Array(8), true).map(function (_, i) { return [-i - 1, -i - 1]; }), true),
                    func: ""
                },
                jumpable: false,
                promotion: undefined,
                promotion_callback: "",
                promotion_msg: [],
                king: false
            },
            promotion_callback: "",
            promotion_msg: [],
            king: false
        },
        promotion_callback: "",
        promotion_msg: ["\"彼\"の遺志を継ぐものですか？", "はい", "いいえ"],
        king: false
    },
    {
        name: "悪会社",
        id: "bad-campany",
        src: "",
        movable: {
            absolute: [],
            relative: [[0, 1]],
            func: ""
        },
        jumpable: false,
        promotion: undefined,
        promotion_callback: "",
        promotion_msg: [],
        king: false
    }
];
