"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteEvent = void 0;
const Event_1 = require("../Event");
;
class DeleteEvent extends Event_1.Event {
    constructor(piece1, piece2, pos1, pos2, id) {
        super("delete", id);
        this.data = { piece1, piece2, pos1, pos2 };
    }
}
exports.DeleteEvent = DeleteEvent;
//# sourceMappingURL=DeleteEvent.js.map