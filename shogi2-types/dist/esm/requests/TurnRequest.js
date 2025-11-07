import { Request } from "../Request";
export class TurnRequest extends Request {
    to;
    type;
    importance;
    player;
    seconds;
    constructor(to, importance, player, seconds) {
        super();
        this.to = to;
        this.importance = importance;
        this.player = player;
        this.type = "turn";
        this.seconds = seconds;
    }
}
//# sourceMappingURL=TurnRequest.js.map