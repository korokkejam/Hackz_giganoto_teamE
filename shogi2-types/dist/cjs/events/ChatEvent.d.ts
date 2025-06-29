import { Event } from "../Event";
export interface ChatEventType {
    msg: string;
    sender: string;
}
export declare class ChatEvent extends Event<ChatEventType> {
    data: ChatEventType;
    constructor(msg: string, sender: string, id: string);
}
