import { Request } from "../Request";
export class BoardRequest extends Request {
    type;
    to;
    board;
    importance;
    constructor(to, board, importance) {
        super();
        this.to = to;
        this.type = "board";
        this.board = board;
        this.importance = importance;
    }
}
;
//# sourceMappingURL=BoardRequest.js.map