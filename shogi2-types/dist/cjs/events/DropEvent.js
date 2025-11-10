"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DropEvent = void 0;
const Event_1 = require("../Event");
class DropEvent extends Event_1.Event {
    constructor(square) {
        super();
        this.square = square;
        this.type = "drop";
    }
}
exports.DropEvent = DropEvent;
//# sourceMappingURL=DropEvent.js.map