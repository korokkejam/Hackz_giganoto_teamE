import "./styles/Game.css";
import Board from "../components/layout/Board";
import { useEffect } from "react";
import { useSetAtom, useAtomValue } from "jotai";
import { boardAtom, turnAtom, wsAtom } from "../state";

export default function Game(){
  const setBoard=useSetAtom(boardAtom);
  const ws=useAtomValue(wsAtom);
  const setTurn=useSetAtom(turnAtom);
  useEffect(()=>{
    if (!ws){
      return;
    }
    ws.onmessage=(e:MessageEvent)=>{
      const d:request=e.data;
      switch (d.head){
        case "move":
          {
            const data:{board:board,next:"player1"|"player2"}=d.content;
            setBoard(data.board);
            console.log(data.board);
            setTurn(data.next);
          }
          break;
        case "change":
          {
            const data:{next:"player1"|"player2"}=d.content;
            setTurn(data.next);
          }
          break;
      }
    };
  },[ws]);
  return (
    <div className="game">
      <Board/>
    </div>
  );
}
