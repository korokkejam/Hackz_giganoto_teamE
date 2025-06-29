import { Event } from "../Event";
;
export class CaptureEvent extends Event {
    data;
    constructor(piece1, piece2, pos1, pos2, id) {
        super("capture", id);
        this.data = { piece1, piece2, pos1, pos2 };
    }
}
//# sourceMappingURL=CaptureEvent.js.map