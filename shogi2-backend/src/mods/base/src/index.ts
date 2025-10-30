import { Board, BoardRequest, createBoard, GameData, ModBase, Player, StartEvent } from "shogi2-types";
import set_pieces from "./set_pieces";

export default class Base extends ModBase{
  onStart(data: GameData, _event: StartEvent, _sender: Player) {
    const board:Board=createBoard(9,9);
    data.board=board;
    set_pieces(board);
    const request=new BoardRequest("both",board,"obedience");
    return [request];
  }
}
