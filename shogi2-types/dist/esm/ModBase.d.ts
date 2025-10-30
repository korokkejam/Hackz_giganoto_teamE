import { Event, GameData, Player, Request, StartEvent } from ".";
import { BoardEvent } from "./events/BoardEvent";
export declare abstract class ModBase {
    update(data: GameData, event: Event, sender: Player): Request[];
    onStart(_data: GameData, _event: StartEvent, _sender: Player): Request[];
    onBoard(_data: GameData, _event: BoardEvent, _sender: Player): Request[];
}
