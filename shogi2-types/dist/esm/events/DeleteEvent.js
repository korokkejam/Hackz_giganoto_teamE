import { Event } from "../Event";
;
export class DeleteEvent extends Event {
    data;
    constructor(piece1, piece2, pos1, pos2, id) {
        super("delete", id);
        this.data = { piece1, piece2, pos1, pos2 };
    }
}
//# sourceMappingURL=DeleteEvent.js.map