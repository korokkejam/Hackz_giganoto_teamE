"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromotionEvent = void 0;
const Event_1 = require("../Event");
;
class PromotionEvent extends Event_1.Event {
    constructor(piece, pos, id) {
        super("promotion", id);
        this.data = { piece, pos };
    }
}
exports.PromotionEvent = PromotionEvent;
//# sourceMappingURL=PromotionEvent.js.map