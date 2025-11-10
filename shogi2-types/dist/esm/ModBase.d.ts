import { CaptureEvent, DropEvent, EndEvent, Event, GameData, Player, Request, RequestUpdater, StartEvent } from "./index";
import { BoardEvent } from "./events/BoardEvent";
import { MoveEvent } from "./events/MoveEvent";
import { AnswerEvent } from "./events/AnswerEvent";
export declare abstract class ModBase {
    update(data: GameData, event: Event, sender: Player, updater: RequestUpdater): {
        r: Request[];
        e: Event[];
    };
    onStart(_data: GameData, _event: StartEvent, _sender: Player, _updater: RequestUpdater): {
        r: Request[];
        e: Event[];
    };
    onBoard(_data: GameData, _event: BoardEvent, _sender: Player, _updater: RequestUpdater): {
        r: Request[];
        e: Event[];
    };
    onMove(_data: GameData, _event: MoveEvent, _sender: Player, _updater: RequestUpdater): {
        r: Request[];
        e: Event[];
    };
    onAnswer(_data: GameData, _event: AnswerEvent, _sender: Player, _updater: RequestUpdater): {
        r: Request[];
        e: Event[];
    };
    onDrop(_data: GameData, _event: DropEvent, _sender: Player, _updater: RequestUpdater): {
        r: Request[];
        e: Event[];
    };
    onCapture(_data: GameData, _event: CaptureEvent, _sender: Player, _updater: RequestUpdater): {
        r: Request[];
        e: Event[];
    };
    onEnd(_data: GameData, _event: EndEvent, _sender: Player, _updater: RequestUpdater): {
        r: Request[];
        e: Event[];
    };
}
