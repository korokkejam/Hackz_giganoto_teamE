"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoveEvent = void 0;
const Event_1 = require("../Event");
class MoveEvent extends Event_1.Event {
    constructor(piece, to) {
        super();
        this.type = "move";
        this.piece = piece;
        this.to = to;
    }
}
exports.MoveEvent = MoveEvent;
;
//# sourceMappingURL=MoveEvent.js.map