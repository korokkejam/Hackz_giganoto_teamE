import { Button, CSSProperties, Modal, Paper } from "@mui/material";
import "./styles/Dialog.css";

const style:CSSProperties={
  position:"absolute",
  transform:"translate(-50%,-50%)",
  left:"50%",
  top:"30%"
};

export default function Dialog({question,send,onClose}:{question:{content:string,choices:{display:string,key:string}[],id:string}|null,send:(key:string,id:string)=>void,onClose:()=>void}){
  return (
    <Modal open={!!question} onClose={onClose}>
      <Paper sx={style}>
        <div className="dialog">
          <p>{question?.content}</p>
          <div>
            {question?.choices.map((choice)=>
              <Button onClick={()=>{send(choice.key,question.id);onClose();}}>{choice.display}</Button>
            )}
          </div>
        </div>
      </Paper>
    </Modal>
  );
}
