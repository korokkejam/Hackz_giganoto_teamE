import { Event } from "../Event";
export interface QuestionEventType {
    question: string;
    choices: string[];
    answer: string;
    type: string;
}
export declare class QuestionEvent extends Event<QuestionEventType> {
    data: QuestionEventType;
    constructor(type: string, question: string, choices: string[], answer: string, id: string);
}
