"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnswerEvent = void 0;
const Event_1 = require("../Event");
class AnswerEvent extends Event_1.Event {
    constructor(id, key) {
        super();
        this.type = "answer";
        this.id = id;
        this.key = key;
    }
    ;
}
exports.AnswerEvent = AnswerEvent;
//# sourceMappingURL=AnswerEvent.js.map