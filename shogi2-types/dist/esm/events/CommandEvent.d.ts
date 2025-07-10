import { Event } from "../Event";
export interface CommandEventType {
    type: string;
    option: string[];
    sender: string;
}
export declare class CommandEvent extends Event<CommandEventType> {
    data: CommandEventType;
    constructor(event: CommandEventType, id: string);
}
