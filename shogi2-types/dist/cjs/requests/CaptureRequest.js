"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CaptureRequest = void 0;
const Request_1 = require("../Request");
class CaptureRequest extends Request_1.Request {
    constructor(to, importance, piece1, piece2) {
        super();
        this.to = to;
        this.type = "capture";
        this.importance = importance;
        this.piece1 = piece1;
        this.piece2 = piece2;
    }
}
exports.CaptureRequest = CaptureRequest;
//# sourceMappingURL=CaptureRequest.js.map