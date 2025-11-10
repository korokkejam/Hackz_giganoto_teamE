import { Square } from "../Board";
import { Event } from "../Event";
export declare class DropEvent extends Event {
    type: string;
    square: Square;
    constructor(square: Square);
}
