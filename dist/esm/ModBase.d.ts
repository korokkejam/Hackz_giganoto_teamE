import { CaptureEvent, DropEvent, EndEvent, Event, GameData, Player, RequestExpansion, RequestUpdater, StartEvent } from "./index";
import { BoardEvent } from "./events/BoardEvent";
import { MoveEvent } from "./events/MoveEvent";
import { AnswerEvent } from "./events/AnswerEvent";
export declare abstract class ModBase {
    log_list: string[];
    constructor();
    log(content: string): void;
    update(data: GameData, before: GameData, event: Event, sender: Player, updater: RequestUpdater): {
        r: RequestExpansion[];
        e: Event[];
    };
    onStart(_data: GameData, _before: GameData, _event: StartEvent, _sender: Player, _updater: RequestUpdater): {
        r: RequestExpansion[];
        e: Event[];
    };
    onBoard(_data: GameData, _before: GameData, _event: BoardEvent, _sender: Player, _updater: RequestUpdater): {
        r: RequestExpansion[];
        e: Event[];
    };
    onMove(_data: GameData, _before: GameData, _event: MoveEvent, _sender: Player, _updater: RequestUpdater): {
        r: RequestExpansion[];
        e: Event[];
    };
    onAnswer(_data: GameData, _before: GameData, _event: AnswerEvent, _sender: Player, _updater: RequestUpdater): {
        r: RequestExpansion[];
        e: Event[];
    };
    onDrop(_data: GameData, _before: GameData, _event: DropEvent, _sender: Player, _updater: RequestUpdater): {
        r: RequestExpansion[];
        e: Event[];
    };
    onCapture(_data: GameData, _before: GameData, _event: CaptureEvent, _sender: Player, _updater: RequestUpdater): {
        r: RequestExpansion[];
        e: Event[];
    };
    onEnd(_data: GameData, _before: GameData, _event: EndEvent, _sender: Player, _updater: RequestUpdater): {
        r: RequestExpansion[];
        e: Event[];
    };
}
