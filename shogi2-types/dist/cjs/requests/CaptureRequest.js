"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CaptureRequest = void 0;
const Request_1 = require("../Request");
class CaptureRequest extends Request_1.Request {
    constructor(to, importance, player1_pieces, player2_pieces) {
        super();
        this.to = to;
        this.type = "capture";
        this.importance = importance;
        this.player1_pieces = player1_pieces;
        this.player2_pieces = player2_pieces;
    }
}
exports.CaptureRequest = CaptureRequest;
//# sourceMappingURL=CaptureRequest.js.map