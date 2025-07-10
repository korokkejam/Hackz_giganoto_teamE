import { Event } from "../Event";
;
export class WarpEvent extends Event {
    data;
    constructor(z, id) {
        super("warp", id);
        this.data = { z };
    }
}
//# sourceMappingURL=WarpEvent.js.map