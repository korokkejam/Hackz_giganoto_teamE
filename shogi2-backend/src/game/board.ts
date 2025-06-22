import "./rooms";
import {board,GameState,request,pieceType} from "../types/global";
import { WSContext } from "hono/ws";

class Data{
  data:GameState;
  constructor(boards:board[]){
    this.data={
      boards,
      turn:"player1",
      player1_current_board:0,
      player2_current_board:0,
      player1_point:0,
      player2_point:0,
      player1_redbull:0,
      player2_redbull:0,
      history:[],
      player1_storage:[],
      player2_storage:[]
    };
  }
  change(){
    if (this.data.turn==="player1"){
      this.data.turn="player2";
    }else{
      this.data.turn="player1";
    }
  }
  setStorage1(pieces:pieceType[]){
    this.data.player1_storage=pieces;
  }
  setStorage2(pieces:pieceType[]){
    this.data.player2_storage=pieces;
  }
  update(e:MessageEvent,ws:WSContext[]){
    const d:request=JSON.parse(e.data);
    console.log(d);
    switch (d.head){
      case "move":
        {
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
        }
        break;
      case "promotion":
        {
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
        }
        break;
      case "kill":
        {
          const sender=d.sender;
          const d1:request={head:"lose",content:""};
          const d2:request={head:"win",content:""};
          if (sender==="player1"){
            ws[1].send(JSON.stringify(d1));
            ws[0].send(JSON.stringify(d2));
          }else{
            ws[0].send(JSON.stringify(d1));
            ws[1].send(JSON.stringify(d2));
          }
        }
        break;
      case "random":
        {
          const board:board=d.content;
          const sender=d.sender;
          if (sender==="player1"){
            this.data.boards[this.data.player1_current_board]=board;
            if (this.data.player1_current_board===this.data.player2_current_board){
              const d2:request={head:"move",content:{board:board,next:"player1"}};
              ws[1].send(JSON.stringify(d2));
            }
            const d3:request={head:"change",content:{next:"player1"}};
            ws[0].send(JSON.stringify(d3));
          }else{
            this.data.boards[this.data.player2_current_board]=board;
            if (this.data.player1_current_board===this.data.player2_current_board){
              const d2:request={head:"move",content:{board:board,next:"player2"}};
              ws[0].send(JSON.stringify(d2));
            }
            const d3:request={head:"change",content:{next:"player2"}};
            ws[1].send(JSON.stringify(d3));
          }
        }
        break;
    }
  }
}

export default Data;
