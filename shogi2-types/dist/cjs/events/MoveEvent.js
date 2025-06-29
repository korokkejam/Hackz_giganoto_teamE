"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoveEvent = void 0;
const Event_1 = require("../Event");
;
class MoveEvent extends Event_1.Event {
    constructor(piece, before_pos, after_pos, id) {
        super("move", id);
        this.data = { piece, before_pos, after_pos };
    }
}
exports.MoveEvent = MoveEvent;
//# sourceMappingURL=MoveEvent.js.map