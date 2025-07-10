import { Event } from "../Event";
;
export class AudioEvent extends Event {
    data;
    constructor(fileid, id) {
        super("audio", id);
        this.data = { id: fileid };
    }
}
//# sourceMappingURL=AudioEvent.js.map