import { Event } from "../Event";
export class DropEvent extends Event {
    type;
    square;
    constructor(square) {
        super();
        this.square = square;
        this.type = "drop";
    }
}
//# sourceMappingURL=DropEvent.js.map