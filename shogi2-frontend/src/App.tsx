import "./styles/App.css";
import {boardAtom} from "./state";
import {useSetAtom} from "jotai";
import {useEffect} from "react";
import Game from "./pages/Game";
import {Route,Routes} from "react-router-dom";

export default function App(){
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
        <Route path="/game" element={<Game/>}/>
      </Routes>
    </div>
  );
}
