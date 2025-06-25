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
require("./rooms");
var piece_1 = require("../config/piece");
var GameProcess = /** @class */ (function () {
    function GameProcess(boards) {
        this.game = {
            boards: boards,
            turn: "player1",
            player1_current_board: 0,
            player2_current_board: 0,
            player1_point: 0,
            player2_point: 0,
            player1_redbull: 0,
            player2_redbull: 0,
            history: [],
            player1_storage: [],
            player2_storage: [],
            pieces: __spreadArray([], piece_1.pieces, true)
        };
    }
    GameProcess.prototype.setStorage1 = function (pieces) {
        this.game.player1_storage = pieces;
    };
    GameProcess.prototype.setStorage2 = function (pieces) {
        this.game.player2_storage = pieces;
    };
    GameProcess.prototype.update = function (e, _ws) {
        var d = JSON.parse(e.data);
        switch (d.head) {
        }
    };
    return GameProcess;
}());
exports.default = GameProcess;
