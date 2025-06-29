export declare abstract class Event<T = any> {
    type: string;
    id: string;
    abstract data: T;
    constructor(type: string, id: string);
}
