"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservationEvent = void 0;
const Event_1 = require("../Event");
;
class ReservationEvent extends Event_1.Event {
    constructor(id, data) {
        super("reservation", id);
        this.data = data;
    }
}
exports.ReservationEvent = ReservationEvent;
//# sourceMappingURL=ReservationEvent.js.map