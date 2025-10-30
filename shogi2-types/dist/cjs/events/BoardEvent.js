"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoardEvent = void 0;
const index_1 = require("../index");
class BoardEvent extends index_1.Event {
    constructor(board) {
        super();
        this.type = "board";
        this.board = board;
    }
}
exports.BoardEvent = BoardEvent;
//# sourceMappingURL=BoardEvent.js.map