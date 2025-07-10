"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WarpEvent = void 0;
const Event_1 = require("../Event");
;
class WarpEvent extends Event_1.Event {
    constructor(z, id) {
        super("warp", id);
        this.data = { z };
    }
}
exports.WarpEvent = WarpEvent;
//# sourceMappingURL=WarpEvent.js.map