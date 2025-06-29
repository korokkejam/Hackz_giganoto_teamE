import { Event } from "../Event";
;
export class MoveEvent extends Event {
    data;
    constructor(piece, before_pos, after_pos, id) {
        super("move", id);
        this.data = { piece, before_pos, after_pos };
    }
}
//# sourceMappingURL=MoveEvent.js.map