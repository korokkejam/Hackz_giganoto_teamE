import { Event } from "../Event";
;
export class StartEvent extends Event {
    data;
    constructor(id) {
        super("start", id);
        this.data = {};
    }
}
//# sourceMappingURL=StartEvent.js.map