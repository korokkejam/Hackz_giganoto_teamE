import { Event } from "../Event";
export class FileEvent extends Event {
    data;
    constructor(id, file) {
        super("file", id);
        this.data = file;
    }
}
//# sourceMappingURL=FileEvent.js.map