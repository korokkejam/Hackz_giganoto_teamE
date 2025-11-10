import { Event } from "../Event";
export class EndEvent extends Event {
    type;
    winner;
    constructor(winner) {
        super();
        this.type = "end";
        this.winner = winner;
    }
}
//# sourceMappingURL=EndEvent.js.map