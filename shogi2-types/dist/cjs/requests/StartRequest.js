"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StartRequest = void 0;
const index_1 = require("../index");
class StartRequest extends index_1.Request {
    constructor(to, importance) {
        super();
        this.type = "start";
        this.to = to;
        this.importance = importance;
    }
}
exports.StartRequest = StartRequest;
//# sourceMappingURL=StartRequest.js.map