import { Event } from "../Event";
export interface CommandEventType {
    type: string;
    option: any;
}
export declare class CommandEvent extends Event<CommandEventType> {
    data: CommandEventType;
    constructor(event: CommandEventType, id: string);
}
