import {Event} from "../Event";
import {Piece,Position} from "../types";

export interface DeleteEventType{
  piece1:Piece; //削除した駒
  piece2:Piece; //削除された駒
  pos1:Position;
  pos2:Position;
};

export class DeleteEvent extends Event<DeleteEventType>{
  data:DeleteEventType;
  constructor(piece1:Piece,piece2:Piece,pos1:Position,pos2:Position,id:string){
    super("delete",id);
    this.data={piece1,piece2,pos1,pos2};
  }
}
