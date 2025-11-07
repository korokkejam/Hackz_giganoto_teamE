import { Request } from "../Request";
export class QuestionRequest extends Request {
    to;
    type;
    importance;
    content;
    id;
    choices;
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
//# sourceMappingURL=QuestionRequest.js.map