import { Event } from "../Event";
export interface StartEventType {
}
export declare class StartEvent extends Event<StartEventType> {
    data: StartEventType;
    constructor(id: string);
}
