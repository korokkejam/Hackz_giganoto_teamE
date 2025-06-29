import { Event } from "../Event";
;
export class TurnEvent extends Event {
    data;
    constructor(player, id) {
        super("turn", id);
        this.data = { player };
    }
}
//# sourceMappingURL=TurnEvent.js.map