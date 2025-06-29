"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DropEvent = void 0;
const Event_1 = require("../Event");
;
class DropEvent extends Event_1.Event {
    constructor(piece, pos, id) {
        super("drop", id);
        this.data = { piece, pos };
    }
}
exports.DropEvent = DropEvent;
//# sourceMappingURL=DropEvent.js.map