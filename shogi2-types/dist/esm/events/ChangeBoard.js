import { Event } from "../Event";
;
export class ChangeEvent extends Event {
    data;
    constructor(boards) {
        super("chat");
        this.data = { boards };
    }
}
//# sourceMappingURL=ChangeBoard.js.map