import { Event } from "../Event";
;
export class ReservationEvent extends Event {
    data;
    constructor(id, data) {
        super("reservation", id);
        this.data = data;
    }
}
//# sourceMappingURL=ReservationEvent.js.map