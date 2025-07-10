import { Event } from "../Event";
;
export class UIEvent extends Event {
    data;
    constructor(id, data) {
        super("ui", id);
        this.data = data;
    }
}
//# sourceMappingURL=UIEvent.js.map