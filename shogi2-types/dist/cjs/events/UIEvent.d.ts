import { Event } from "../Event";
import { UI } from "../UI";
export interface UIEventType {
    menu1: UI[];
    menu2: UI[];
}
export declare class UIEvent extends Event<UIEventType> {
    data: UIEventType;
    constructor(id: string, data: UIEventType);
}
