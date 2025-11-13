"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const shogi2_types_1 = require("shogi2-types");
const lodash_1 = require("lodash");
const set_pieces_1 = __importDefault(require("./set_pieces"));
class Jojo extends shogi2_types_1.ModBase {
    onStart(d, _before, _event, _sender, _updater) {
        const data = (0, lodash_1.cloneDeep)(d);
        const board = (0, shogi2_types_1.createBoard)(15, 15);
        (0, set_pieces_1.default)(board);
        data.board = board;
        const request = new shogi2_types_1.BoardRequest("both", board, "exclude");
        return { r: [{ request, data }], e: [] };
    }
}
exports.default = Jojo;
;
