import { AudioEvent, EndEvent, Game, Request, UIEvent } from "shogi2-types";
import Base from "./base";
import { to_be_continued_background } from "./to_be_continued_ui";

export default class ToBeContinued extends Base{
  constructor(game:Game){
    super(game);
  }
  onEnd(_e:EndEvent,_before:Game){
    const audio:AudioEvent={
      type:"audio",
      id:crypto.randomUUID(),
      data:{
        id:"to_be_continued_wav"
      }
    };
    const req1:Request<AudioEvent>={
      head:"event",
      content:audio
    };
    const ui:UIEvent={
      type:"ui",
      id:crypto.randomUUID(),
      data:{
        menu1:[],
        menu2:[],
        foreground:to_be_continued_background
      }
    };
    const req2:Request<UIEvent>={
      head:"event",
      content:ui
    };
    return [{request:req1,target:undefined,owner:"jojo"},{request:req2,target:undefined,owner:"jojo"}];
  }
}
