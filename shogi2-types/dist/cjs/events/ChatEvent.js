"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatEvent = void 0;
const Event_1 = require("../Event");
;
class ChatEvent extends Event_1.Event {
    constructor(msg, sender, id) {
        super("chat", id);
        this.data = { msg, sender };
    }
}
exports.ChatEvent = ChatEvent;
//# sourceMappingURL=ChatEvent.js.map