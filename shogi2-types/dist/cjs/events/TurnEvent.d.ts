import { Event } from "../Event";
import { player } from "../types";
export interface TurnEventType {
    player: player;
}
export declare class TurnEvent extends Event<TurnEventType> {
    data: TurnEventType;
    constructor(player: player, id: string);
}
