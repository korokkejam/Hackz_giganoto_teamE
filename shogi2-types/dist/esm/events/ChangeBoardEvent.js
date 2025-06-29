import { Event } from "../Event";
;
export class ChangeBoardEvent extends Event {
    data;
    constructor(boards, id) {
        super("change_board", id);
        this.data = { boards };
    }
}
//# sourceMappingURL=ChangeBoardEvent.js.map