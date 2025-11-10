"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerRequest = void 0;
const Request_1 = require("../Request");
class PlayerRequest extends Request_1.Request {
    constructor(to, importance, data) {
        super();
        this.type = "player";
        this.to = to;
        this.importance = importance;
        this.data = data;
    }
}
exports.PlayerRequest = PlayerRequest;
//# sourceMappingURL=PlayerRequest.js.map