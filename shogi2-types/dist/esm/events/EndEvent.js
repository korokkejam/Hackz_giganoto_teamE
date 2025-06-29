import { Event } from "../Event";
;
export class EndEvent extends Event {
    data;
    constructor(player, id) {
        super("end", id);
        this.data = { winner: player };
    }
}
//# sourceMappingURL=EndEvent.js.map