"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UIEvent = void 0;
const Event_1 = require("../Event");
;
class UIEvent extends Event_1.Event {
    constructor(id, data) {
        super("ui", id);
        this.data = data;
    }
}
exports.UIEvent = UIEvent;
//# sourceMappingURL=UIEvent.js.map