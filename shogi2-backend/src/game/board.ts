import "./rooms";
import {board,boardData,request} from "../types/global";
import { WSContext } from "hono/ws";

class Data{
  data:boardData;
  constructor(boards:board[]){
    this.data={boards,turn:"player1",player1_current_board:0,player2_current_board:0};
  }
  change(){
    if (this.data.turn==="player1"){
      this.data.turn="player2";
    }else{
      this.data.turn="player1";
    }
  }
  update(e:MessageEvent,ws:WSContext[]){
    const d:request=JSON.parse(e.data);
    console.log(d);
    switch (d.head){
      case "move":
        const board:board=d.content;
        const sender=d.sender;
        if (sender==="player1"){
          this.data.boards[this.data.player1_current_board]=board;
          if (this.data.player1_current_board===this.data.player2_current_board){
            const d2:request={head:"move",content:{board:board,next:"player2"}};
            ws[1].send(JSON.stringify(d2));
          }
          const d3:request={head:"change",content:{next:"player2"}};
          ws[0].send(JSON.stringify(d3));
        }else{
          this.data.boards[this.data.player2_current_board]=board;
          if (this.data.player1_current_board===this.data.player2_current_board){
            const d2:request={head:"move",content:{board:board,next:"player1"}};
            ws[0].send(JSON.stringify(d2));
          }
          const d3:request={head:"change",content:{next:"player1"}};
          ws[1].send(JSON.stringify(d3));
        }
        break;
    }
  }
}

export default Data;
