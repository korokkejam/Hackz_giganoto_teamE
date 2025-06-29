"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TurnEvent = void 0;
const Event_1 = require("../Event");
;
class TurnEvent extends Event_1.Event {
    constructor(player, id) {
        super("turn", id);
        this.data = { player };
    }
}
exports.TurnEvent = TurnEvent;
//# sourceMappingURL=TurnEvent.js.map