"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandEvent = void 0;
const Event_1 = require("../Event");
;
class CommandEvent extends Event_1.Event {
    constructor(event, id) {
        super("command", id);
        this.data = event;
    }
}
exports.CommandEvent = CommandEvent;
//# sourceMappingURL=CommandEvent.js.map