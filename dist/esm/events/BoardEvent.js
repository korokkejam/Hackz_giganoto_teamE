import { Event } from "../index";
export class BoardEvent extends Event {
    type = "board";
    board;
    constructor(board) {
        super();
        this.board = board;
    }
}
//# sourceMappingURL=BoardEvent.js.map