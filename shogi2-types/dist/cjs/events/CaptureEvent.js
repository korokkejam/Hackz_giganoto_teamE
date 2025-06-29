"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CaptureEvent = void 0;
const Event_1 = require("../Event");
;
class CaptureEvent extends Event_1.Event {
    constructor(piece1, piece2, pos1, pos2, id) {
        super("capture", id);
        this.data = { piece1, piece2, pos1, pos2 };
    }
}
exports.CaptureEvent = CaptureEvent;
//# sourceMappingURL=CaptureEvent.js.map