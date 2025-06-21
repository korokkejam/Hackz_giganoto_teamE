import "./styles/Game.css";
import Board from "../components/layout/Board";
import { useEffect } from "react";
import { useAtomValue } from "jotai";
import { wsAtom } from "../state";

export default function Game(){
  const ws=useAtomValue(wsAtom);
  useEffect(()=>{
    if (!ws){
      return;
    }
    // ws.onmessage=(e:MessageEvent)=>{
    // };
  });
  return (
    <div className="game">
      <Board/>
    </div>
  );
}
