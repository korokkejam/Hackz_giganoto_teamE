"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SquareRequest = void 0;
const Request_1 = require("../Request");
class SquareRequest extends Request_1.Request {
    constructor(to, importance, square) {
        super();
        this.to = to;
        this.importance = importance;
        this.type = "square";
        this.square = square;
    }
}
exports.SquareRequest = SquareRequest;
;
//# sourceMappingURL=SquareRequest.js.map