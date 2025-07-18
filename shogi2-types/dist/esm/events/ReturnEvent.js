import { Event } from "../Event";
export class ReturnEvent extends Event {
    data;
    constructor(id, data) {
        super("return", id);
        this.data = data;
    }
}
//# sourceMappingURL=ReturnEvent.js.map