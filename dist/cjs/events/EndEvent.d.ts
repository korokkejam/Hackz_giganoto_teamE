import { Player } from "..";
import { Event } from "../Event";
export declare class EndEvent extends Event {
    type: string;
    winner: Player;
    constructor(winner: Player);
}
