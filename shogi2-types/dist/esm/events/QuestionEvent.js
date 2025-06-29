import { Event } from "../Event";
;
export class QuestionEvent extends Event {
    data;
    constructor(type, question, choices, answer, id) {
        super("question", id);
        this.data = { type, question, choices, answer };
    }
}
//# sourceMappingURL=QuestionEvent.js.map