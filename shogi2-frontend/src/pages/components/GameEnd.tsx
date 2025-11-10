import { Button, CSSProperties, Paper } from "@mui/material";
import { useAtomValue } from "jotai";
import { Player } from "shogi2-types";
import { playerAtom } from "../../state";
import "./styles/GameEnd.css";
import { useNavigate } from "react-router-dom";

const style:CSSProperties={
  position:"fixed",
  transform:"translate(-50%,-50%)",
  left:"50%",
  top:"50%"
};

export default function GameEnd({winner}:{winner:Player|null}){
  const player=useAtomValue(playerAtom);
  const navigate=useNavigate();
  const gotoHome=()=>{
    navigate("/");
  };
  return (
    <Paper sx={style}>
      <div className="game-end">
        <p>{winner===player?"あなたの勝ち":"あなたの負け"}</p>
        <Button onClick={gotoHome}>OK</Button>
      </div>
    </Paper>
  );
}
