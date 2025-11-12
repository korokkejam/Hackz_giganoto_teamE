import { Button, CSSProperties, Paper } from "@mui/material";
import { ModRequest } from "shogi2-types";
import { ipaddress } from "../../ipaddress";

const style:CSSProperties={
  position:"fixed",
  transform:"translate(-50%,-50%)",
  left:"50%",
  top:"50%",
  width:"500px",
  padding:"20px"
};

export default function ModRequestDialog({request,onClose}:{request:ModRequest|null,onClose:()=>void}){
  const accept=()=>{
    if (!request){
      return;
    }
    fetch(`http://${ipaddress}:3000/admin/mods/accept/${request.id}`);
    onClose();
  };
  const reject=()=>{
    if (!request){
      return;
    }
    fetch(`http://${ipaddress}:3000/admin/mods/reject/${request.id}`);
    onClose();
  };
  return (
    <Paper sx={style}>
      <h1>{request?.msg}</h1>
      <p>{request?.type==="add"?"追加":"削除"}リクエスト</p>
      <a href={`https://github.com/${request?.repo}`} target="_blank">MODページ</a>
      <div style={{display:"flex",justifyContent:"space-around"}}>
        <Button onClick={accept}>承認</Button>
        <Button onClick={reject}>却下</Button>
      </div>
    </Paper>
  );
}
