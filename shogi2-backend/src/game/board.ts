import "./rooms";
import {board,boardData} from "../types/global";

class Data{
  data:boardData;
  constructor(boards:board[]){
    this.data={boards,turn:"player1"};
  }
  change(){
    if (this.data.turn==="player1"){
      this.data.turn="player2";
    }else{
      this.data.turn="player1";
    }
  }
}

export default Data;
