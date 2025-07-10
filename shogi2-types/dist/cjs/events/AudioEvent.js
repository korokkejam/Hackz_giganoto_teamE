"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AudioEvent = void 0;
const Event_1 = require("../Event");
;
class AudioEvent extends Event_1.Event {
    constructor(fileid, id) {
        super("audio", id);
        this.data = { id: fileid };
    }
}
exports.AudioEvent = AudioEvent;
//# sourceMappingURL=AudioEvent.js.map