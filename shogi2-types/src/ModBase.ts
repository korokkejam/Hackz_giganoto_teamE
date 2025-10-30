import { Event, GameData, Player, Request, StartEvent } from ".";
import { BoardEvent } from "./events/BoardEvent";

export abstract class ModBase{
  update(data:GameData,event:Event,sender:Player):Request[]{
    const requests:Request[]=[];
    switch (event.type){
      case "start":
        const re=this.onStart(data,event,sender);
        re.forEach((r)=>{
          requests.push(r);
        });
        break;
    }
    return requests;
  }
  onStart(_data:GameData,_event:StartEvent,_sender:Player):Request[]{return [];};
  onBoard(_data:GameData,_event:BoardEvent,_sender:Player):Request[]{return [];};
}
