import {Routes,Route} from "react-router-dom";
import Home from "./pages/Home";
import Game from "./pages/Game";

export default function App(){
  return (
    <div className="App">
      <Routes>
        <Route index element={<Home/>}/>
        <Route path="/game" element={<Game/>}/>
      </Routes>
    </div>
  );
}
