import { Event } from "../Event";
export class AnswerEvent extends Event {
    type = "answer";
    key;
    id;
    constructor(id, key) {
        super();
        this.id = id;
        this.key = key;
    }
    ;
}
//# sourceMappingURL=AnswerEvent.js.map