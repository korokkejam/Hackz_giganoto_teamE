import {
    AudioEvent,
  CaptureEvent,
  ChatEvent,
  DeleteEvent,
  DropEvent,
  EndEvent,
  Event,
  Game,
  MoveEvent,
  PromotionCheckEvent,
  PromotionEvent,
  QuestionEvent,
  ReturnRequest,
  StartEvent,
  TurnEvent,
  WarpEvent
} from "shogi2-types";
import { ReservationEvent } from "shogi2-types/dist/esm/events/ReservationEvent";

export default class Base{
  game:Game;
  constructor(game:Game){
    this.game=game;
  }
  onStart(_e:StartEvent,_game:Game):ReturnRequest[]|void{}
  onMessage(_e:ChatEvent,_game:Game):ReturnRequest[]|void{}
  onDrop(_e:DropEvent,_game:Game):ReturnRequest[]|void{}
  onMove(_e:MoveEvent,_game:Game):ReturnRequest[]|void{}
  onPromotion(_e:PromotionEvent,_game:Game):ReturnRequest[]|void{}
  onTurn(_e:TurnEvent,_game:Game):ReturnRequest[]|void{}
  onEnd(_e:EndEvent,_game:Game):ReturnRequest[]|void{}
  onDelete(_e:DeleteEvent,_game:Game):ReturnRequest[]|void{}
  onCapture(_e:CaptureEvent,_game:Game):ReturnRequest[]|void{}
  onQuestion(_e:QuestionEvent,_game:Game):ReturnRequest[]|void{}
  onPromotionCheck(_e:PromotionCheckEvent,_game:Game):ReturnRequest[]|void{}
  onAudio(_e:AudioEvent,_game:Game):ReturnRequest[]|void{}
  onReservation(_e:ReservationEvent,_game:Game):ReturnRequest[]|void{}
  onWarp(_e:WarpEvent,_game:Game):ReturnRequest[]|void{}
  onEvent(_e:Event,_game:Game):ReturnRequest[]|void{}
}
