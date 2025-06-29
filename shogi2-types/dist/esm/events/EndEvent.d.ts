import { Event } from "../Event";
import { player } from "../types";
export interface EndEventType {
    winner: player;
}
export declare class EndEvent extends Event<EndEventType> {
    data: EndEventType;
    constructor(player: player, id: string);
}
