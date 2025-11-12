import { useSetAtom } from "jotai";
import { useEffect } from "react";
import { gamesAtom, modRequestsAtom } from "../state";
import { ipaddress } from "../ipaddress";
import Home from "./Home";

export default function Loggedin(){
  const setGames=useSetAtom(gamesAtom);
  const setRequests=useSetAtom(modRequestsAtom);
  const update=()=>{
    fetch(`http://${ipaddress}:3000/admin/games`).then((response)=>{
      response.json().then((result)=>{
        setGames(result);
      });
    });
    fetch(`http://${ipaddress}:3000/admin/mods`).then((response)=>{
      response.json().then((result)=>{
        setRequests(result);
      });
    });
  };
  useEffect(()=>{
    update();
  });
  return (
    <div>
      <Home/>
    </div>
  );
}
