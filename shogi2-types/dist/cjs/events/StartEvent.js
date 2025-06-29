"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StartEvent = void 0;
const Event_1 = require("../Event");
;
class StartEvent extends Event_1.Event {
    constructor(id) {
        super("start", id);
        this.data = {};
    }
}
exports.StartEvent = StartEvent;
//# sourceMappingURL=StartEvent.js.map