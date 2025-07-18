"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReturnEvent = void 0;
const Event_1 = require("../Event");
class ReturnEvent extends Event_1.Event {
    constructor(id, data) {
        super("return", id);
        this.data = data;
    }
}
exports.ReturnEvent = ReturnEvent;
//# sourceMappingURL=ReturnEvent.js.map