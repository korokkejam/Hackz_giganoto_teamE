"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CaptureEvent = void 0;
const Event_1 = require("../Event");
class CaptureEvent extends Event_1.Event {
    constructor(piece) {
        super();
        this.type = "capture";
        this.piece = piece;
    }
}
exports.CaptureEvent = CaptureEvent;
;
//# sourceMappingURL=CaptureEvent.js.map