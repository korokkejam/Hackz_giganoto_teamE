"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromotionCheckEvent = void 0;
const Event_1 = require("../Event");
;
class PromotionCheckEvent extends Event_1.Event {
    constructor(piece, pos, answer, id) {
        super("promotion_check", id);
        this.data = { piece, pos, answer };
    }
}
exports.PromotionCheckEvent = PromotionCheckEvent;
//# sourceMappingURL=PromotionCheckEvent.js.map