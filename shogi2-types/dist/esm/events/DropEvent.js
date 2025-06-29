import { Event } from "../Event";
;
export class DropEvent extends Event {
    data;
    constructor(piece, pos, id) {
        super("drop", id);
        this.data = { piece, pos };
    }
}
//# sourceMappingURL=DropEvent.js.map