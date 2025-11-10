"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EndEvent = void 0;
const Event_1 = require("../Event");
class EndEvent extends Event_1.Event {
    constructor(winner) {
        super();
        this.type = "end";
        this.winner = winner;
    }
}
exports.EndEvent = EndEvent;
//# sourceMappingURL=EndEvent.js.map