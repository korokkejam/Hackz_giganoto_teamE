import { Request } from "../index";
export class StartRequest extends Request {
    type;
    to;
    importance;
    constructor(to, importance) {
        super();
        this.type = "start";
        this.to = to;
        this.importance = importance;
    }
}
//# sourceMappingURL=StartRequest.js.map