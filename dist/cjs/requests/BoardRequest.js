"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BoardRequest = void 0;
const Request_1 = require("../Request");
class BoardRequest extends Request_1.Request {
    constructor(to, board, importance) {
        super();
        this.to = to;
        this.type = "board";
        this.board = board;
        this.importance = importance;
    }
}
exports.BoardRequest = BoardRequest;
;
//# sourceMappingURL=BoardRequest.js.map