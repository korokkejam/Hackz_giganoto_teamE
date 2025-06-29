import { Event } from "../Event";
;
export class ChatEvent extends Event {
    data;
    constructor(msg, sender, id) {
        super("chat", id);
        this.data = { msg, sender };
    }
}
//# sourceMappingURL=ChatEvent.js.map