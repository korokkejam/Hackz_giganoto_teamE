"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionRequest = void 0;
const Request_1 = require("../Request");
class QuestionRequest extends Request_1.Request {
    constructor(to, importance, content, choices) {
        super();
        this.to = to;
        this.type = "question";
        this.importance = importance;
        this.content = content;
        this.id = crypto.randomUUID();
        this.choices = choices;
    }
}
exports.QuestionRequest = QuestionRequest;
//# sourceMappingURL=QuestionRequest.js.map