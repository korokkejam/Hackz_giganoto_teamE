"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TurnRequest = void 0;
const Request_1 = require("../Request");
class TurnRequest extends Request_1.Request {
    constructor(to, importance, player, seconds) {
        super();
        this.to = to;
        this.importance = importance;
        this.player = player;
        this.type = "turn";
        this.seconds = seconds;
    }
}
exports.TurnRequest = TurnRequest;
//# sourceMappingURL=TurnRequest.js.map