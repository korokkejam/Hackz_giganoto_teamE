import { Request } from "../Request";
export class CaptureRequest extends Request {
    type;
    to;
    importance;
    piece1;
    piece2;
    constructor(to, importance, piece1, piece2) {
        super();
        this.to = to;
        this.type = "capture";
        this.importance = importance;
        this.piece1 = piece1;
        this.piece2 = piece2;
    }
}
//# sourceMappingURL=CaptureRequest.js.map