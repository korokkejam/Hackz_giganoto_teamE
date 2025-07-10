import { Game, player, Request } from "./types";
import { Event } from "./Event";
import { ChatEvent } from "./events/ChatEvent";
import { StartEvent } from "./events/StartEvent";
import { DropEvent } from "./events/DropEvent";
import { MoveEvent } from "./events/MoveEvent";
import { PromotionEvent } from "./events/PromotionEvent";
import { TurnEvent } from "./events/TurnEvent";
import { EndEvent } from "./events/EndEvent";
import { DeleteEvent } from "./events/DeleteEvent";
import { CaptureEvent } from "./events/CaptureEvent";
import { CommandConstructor } from "./CommandFactory";
import { CommandEvent } from "./events/CommandEvent";
import { QuestionEvent } from "./events/QuestionEvent";
import { PromotionCheckEvent } from "./events/PromotionCheckEvent";
import { CommandBase } from "./CommandBase";
import { AudioEvent } from "./events/AudioEvent";
import { ReservationEvent } from "./events/ReservationEvent";
import { WarpEvent } from "./events/WarpEvent";
export interface ReturnRequest {
    request: Request<Event | any>;
    target: player | undefined;
    overwritten?: boolean;
    owner: string;
}
export declare abstract class ModBase {
    abstract type: string;
    game: Game;
    commands: CommandBase[];
    constructor(game: Game);
    addCommands(commands: CommandConstructor[]): void;
    event(request: Request<Event>, game: Game): ReturnRequest[];
    onStart(_e: StartEvent, _game: Game): ReturnRequest[] | void;
    onMessage(_e: ChatEvent, _game: Game): ReturnRequest[] | void;
    onDrop(_e: DropEvent, _game: Game): ReturnRequest[] | void;
    onMove(_e: MoveEvent, _game: Game): ReturnRequest[] | void;
    onPromotion(_e: PromotionEvent, _game: Game): ReturnRequest[] | void;
    onTurn(_e: TurnEvent, _game: Game): ReturnRequest[] | void;
    onEnd(_e: EndEvent, _game: Game): ReturnRequest[] | void;
    onDelete(_e: DeleteEvent, _game: Game): ReturnRequest[] | void;
    onCapture(_e: CaptureEvent, _game: Game): ReturnRequest[] | void;
    onQuestion(_e: QuestionEvent, _game: Game): ReturnRequest[] | void;
    onPromotionCheck(_e: PromotionCheckEvent, _game: Game): ReturnRequest[] | void;
    onAudio(_e: AudioEvent, _game: Game): ReturnRequest[] | void;
    onReservation(_e: ReservationEvent, _game: Game): ReturnRequest[] | void;
    onWarp(_e: WarpEvent, _game: Game): ReturnRequest[] | void;
    onCommand(e: CommandEvent, game: Game): ReturnRequest[] | void;
    onEvent(_e: Event, _game: Game): ReturnRequest[] | void;
}
