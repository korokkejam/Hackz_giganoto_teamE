import { Event } from "../Event";
export class CaptureEvent extends Event {
    type;
    piece;
    constructor(piece) {
        super();
        this.type = "capture";
        this.piece = piece;
    }
}
;
//# sourceMappingURL=CaptureEvent.js.map