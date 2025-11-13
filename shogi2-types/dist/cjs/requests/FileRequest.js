"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileRequest = void 0;
const Request_1 = require("../Request");
class FileRequest extends Request_1.Request {
    constructor(to, importance, name, content, filetype) {
        super();
        this.to = to;
        this.importance = importance;
        this.name = name;
        this.content = content;
        this.type = "file";
        this.filetype = filetype;
    }
}
exports.FileRequest = FileRequest;
;
//# sourceMappingURL=FileRequest.js.map