"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EndRequest = void 0;
const Request_1 = require("../Request");
class EndRequest extends Request_1.Request {
    constructor(to, importance, winner) {
        super();
        this.to = to;
        this.type = "end";
        this.importance = importance;
        this.winner = winner;
    }
}
exports.EndRequest = EndRequest;
//# sourceMappingURL=EndRequest.js.map