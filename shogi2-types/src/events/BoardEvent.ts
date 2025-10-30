import {Board,Event} from "../index";

export class BoardEvent extends Event{
  type="board";
  board:Board;
  constructor(board:Board){
    super();
    this.board=board;
  }
}
