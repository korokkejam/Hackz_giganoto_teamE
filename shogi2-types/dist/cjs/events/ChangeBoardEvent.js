"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangeBoardEvent = void 0;
const Event_1 = require("../Event");
;
class ChangeBoardEvent extends Event_1.Event {
    constructor(boards, id) {
        super("change_board", id);
        this.data = { boards };
    }
}
exports.ChangeBoardEvent = ChangeBoardEvent;
//# sourceMappingURL=ChangeBoardEvent.js.map