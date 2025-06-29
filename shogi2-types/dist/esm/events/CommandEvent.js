import { Event } from "../Event";
;
export class CommandEvent extends Event {
    data;
    constructor(event, id) {
        super("command", id);
        this.data = event;
    }
}
//# sourceMappingURL=CommandEvent.js.map