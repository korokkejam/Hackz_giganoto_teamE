"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGameData = createGameData;
const index_1 = require("./index");
;
function createGameData(w, h) {
    return {
        board: (0, index_1.createBoard)(w, h),
        piece_types: [],
        turn: "player1"
    };
}
//# sourceMappingURL=Game.js.map