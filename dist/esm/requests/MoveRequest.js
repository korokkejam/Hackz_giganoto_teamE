import { Request } from "../Request";
export class MoveRequest extends Request {
    type;
    to;
    importance;
    piece;
    position2;
    constructor(to, importance, piece, position2) {
        super();
        this.type = "move";
        this.importance = importance;
        this.to = to;
        this.piece = piece;
        this.position2 = position2;
    }
}
//# sourceMappingURL=MoveRequest.js.map