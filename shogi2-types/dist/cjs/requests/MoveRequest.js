"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoveRequest = void 0;
const Request_1 = require("../Request");
class MoveRequest extends Request_1.Request {
    constructor(to, importance, piece, position2) {
        super();
        this.type = "move";
        this.importance = importance;
        this.to = to;
        this.piece = piece;
        this.position2 = position2;
    }
}
exports.MoveRequest = MoveRequest;
//# sourceMappingURL=MoveRequest.js.map