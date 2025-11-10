import { Request } from "../Request";
export class EndRequest extends Request {
    type;
    to;
    importance;
    winner;
    constructor(to, importance, winner) {
        super();
        this.to = to;
        this.type = "end";
        this.importance = importance;
        this.winner = winner;
    }
}
//# sourceMappingURL=EndRequest.js.map