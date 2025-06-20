import "./styles/Index.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function Index(){
  return (
    <div className="index">
      <div className="match-box">
        <TextField variant="standard" fullWidth label="部屋番号"/>
        <div className="match-box-buttons">
          <Button className="match-box-button">部屋を作る</Button>
          <Button className="match-box-button">部屋に入る</Button>
        </div>
      </div>
    </div>
  );
}
