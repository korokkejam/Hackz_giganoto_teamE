import Message from "./Message";
import "./styles/Messages.css";
import { useAtomValue } from "jotai";
import { messagesAtom } from "../../state";

export default function Messages(){
  const messages=useAtomValue(messagesAtom);
  return (
    <div className="messages">
      {messages.map((message)=><Message data={message}/>)}
    </div>
  );
}
