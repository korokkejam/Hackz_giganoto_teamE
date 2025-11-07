import { Event } from "../Event";
export class MoveEvent extends Event {
    type = "move";
    piece;
    to;
    constructor(piece, to) {
        super();
        this.piece = piece;
        this.to = to;
    }
}
;
//# sourceMappingURL=MoveEvent.js.map