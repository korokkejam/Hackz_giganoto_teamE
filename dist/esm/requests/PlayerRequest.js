import { Request } from "../Request";
export class PlayerRequest extends Request {
    type;
    to;
    importance;
    data;
    constructor(to, importance, data) {
        super();
        this.type = "player";
        this.to = to;
        this.importance = importance;
        this.data = data;
    }
}
//# sourceMappingURL=PlayerRequest.js.map