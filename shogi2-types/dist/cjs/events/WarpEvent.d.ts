import { Event } from "../Event";
export interface WarpEventType {
    z: number;
}
export declare class WarpEvent extends Event<WarpEventType> {
    data: WarpEventType;
    constructor(z: number, id: string);
}
