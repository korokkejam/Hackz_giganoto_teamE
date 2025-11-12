"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shogi2_types_1 = require("shogi2-types");
class Jojo extends shogi2_types_1.ModBase {
    onStart(data, _event, _sender, _updater) {
        const board = (0, shogi2_types_1.createBoard)(15, 15);
        data.board = board;
        const request = new shogi2_types_1.BoardRequest("both", board, "exclude");
        return { r: [request], e: [] };
    }
}
exports.default = Jojo;
;
