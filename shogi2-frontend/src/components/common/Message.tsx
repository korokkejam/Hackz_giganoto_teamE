import "./styles/Message.css";
import {ChatEventType} from "shogi2-types";

export default function Message({data}:{data:ChatEventType}){
  return (
    <div className="message">
      <h3>{`<${data.sender}>`}</h3>
      <h2>{data.msg}</h2>
    </div>
  );
}
