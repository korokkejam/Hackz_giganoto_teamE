import { Request } from "../Request";
export class CaptureRequest extends Request {
    type;
    to;
    importance;
    player1_pieces;
    player2_pieces;
    constructor(to, importance, player1_pieces, player2_pieces) {
        super();
        this.to = to;
        this.type = "capture";
        this.importance = importance;
        this.player1_pieces = player1_pieces;
        this.player2_pieces = player2_pieces;
    }
}
//# sourceMappingURL=CaptureRequest.js.map