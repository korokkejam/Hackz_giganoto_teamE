import { Request } from "../Request";
export class SquareRequest extends Request {
    type;
    to;
    importance;
    square;
    constructor(to, importance, square) {
        super();
        this.to = to;
        this.importance = importance;
        this.type = "square";
        this.square = square;
    }
}
;
//# sourceMappingURL=SquareRequest.js.map