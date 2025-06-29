"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangeEvent = void 0;
const Event_1 = require("../Event");
;
class ChangeEvent extends Event_1.Event {
    constructor(boards) {
        super("chat");
        this.data = { boards };
    }
}
exports.ChangeEvent = ChangeEvent;
//# sourceMappingURL=ChangeBoard.js.map