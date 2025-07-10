"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileEvent = void 0;
const Event_1 = require("../Event");
class FileEvent extends Event_1.Event {
    constructor(id, file) {
        super("file", id);
        this.data = file;
    }
}
exports.FileEvent = FileEvent;
//# sourceMappingURL=FileEvent.js.map