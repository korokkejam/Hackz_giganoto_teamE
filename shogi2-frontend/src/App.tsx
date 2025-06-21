import "./styles/App.css";
import {boardAtom,wsAtom} from "./state";
import {useAtomValue, useSetAtom} from "jotai";
import {useEffect} from "react";
import Game from "./pages/Game";
import {Route,Routes} from "react-router-dom";
import Index from "./pages/Index";

export default function App(){
  const ws=useAtomValue(wsAtom);
  const setBoard=useSetAtom(boardAtom);
  useEffect(()=>{
    fetch("http://localhost:3000/board").then((d)=>{
      d.json().then((json)=>{
        setBoard(json);
      });
    });
  },[]);
  return (
    <div className="app">
      <Routes>
        <Route index element={<Index/>}/>
        <Route path="/game" element={<Game/>}/>
      </Routes>
    </div>
  );
}
