import { Request } from "../Request";
export class TurnRequest extends Request {
    to;
    type;
    importance;
    player;
    constructor(to, importance, player) {
        super();
        this.to = to;
        this.importance = importance;
        this.player = player;
        this.type = "turn";
    }
}
//# sourceMappingURL=TurnRequest.js.map