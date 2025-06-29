"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionEvent = void 0;
const Event_1 = require("../Event");
;
class QuestionEvent extends Event_1.Event {
    constructor(type, question, choices, answer, id) {
        super("question", id);
        this.data = { type, question, choices, answer };
    }
}
exports.QuestionEvent = QuestionEvent;
//# sourceMappingURL=QuestionEvent.js.map