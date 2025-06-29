import { Event } from "../Event";
;
export class PromotionEvent extends Event {
    data;
    constructor(piece, pos, id) {
        super("promotion", id);
        this.data = { piece, pos };
    }
}
//# sourceMappingURL=PromotionEvent.js.map