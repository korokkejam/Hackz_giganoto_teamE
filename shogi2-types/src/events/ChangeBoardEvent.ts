import {Event} from "../Event";
import {board} from "../types";

export interface ChangeBoardEventType{
  boards:board[]
};

export class ChangeBoardEvent extends Event<ChangeBoardEventType>{
  data:ChangeBoardEventType;
  constructor(boards:board[],id:string){
    super("change_board",id);
    this.data={boards};
  }
}
