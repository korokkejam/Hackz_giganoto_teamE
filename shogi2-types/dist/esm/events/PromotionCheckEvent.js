import { Event } from "../Event";
;
export class PromotionCheckEvent extends Event {
    data;
    constructor(piece, pos, answer, id) {
        super("promotion_check", id);
        this.data = { piece, pos, answer };
    }
}
//# sourceMappingURL=PromotionCheckEvent.js.map