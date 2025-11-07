import { Event, GameData, Player, Request, StartEvent } from "./index";
import { BoardEvent } from "./events/BoardEvent";
import { MoveEvent } from "./events/MoveEvent";
import { AnswerEvent } from "./events/AnswerEvent";
export declare abstract class ModBase {
    update(data: GameData, event: Event, sender: Player, registered_requests: Request[]): {
        r: Request[];
        e: Event[];
    };
    onStart(_data: GameData, _event: StartEvent, _sender: Player, _registered_requests: Request[]): {
        r: Request[];
        e: Event[];
    };
    onBoard(_data: GameData, _event: BoardEvent, _sender: Player, _registered_requests: Request[]): {
        r: Request[];
        e: Event[];
    };
    onMove(_data: GameData, _event: MoveEvent, _sender: Player, _registered_requests: Request[]): {
        r: Request[];
        e: Event[];
    };
    onAnswer(_data: GameData, _event: AnswerEvent, _sender: Player, _registered_requests: Request[]): {
        r: Request[];
        e: Event[];
    };
}
