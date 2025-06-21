import "./styles/App.css";
import Game from "./pages/Game";
import {Route,Routes} from "react-router-dom";
import Index from "./pages/Index";

export default function App(){
  return (
    <div className="app">
      <Routes>
        <Route index element={<Index/>}/>
        <Route path="/game" element={<Game/>}/>
      </Routes>
    </div>
  );
}
