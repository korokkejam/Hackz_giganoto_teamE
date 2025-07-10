import { useAtomValue } from "jotai";
import { useMemo } from "react";
import { Button, Container, convert, Image, Operatable, parser, Request, restore, Text, UI } from "shogi2-types";
import { boardAtom, filesAtom, messagesAtom, pieceStorage2Atom, pieceStorageAtom, pieceTypesAtom, playerAtom, turnAtom, wsAtom, zAtom } from "../../state";
import "./styles/CustomUI.css";

export function CustomUI({ui}:{ui:UI}){
  const boards=useAtomValue(boardAtom);
  const player=useAtomValue(playerAtom);
  const turn=useAtomValue(turnAtom);
  const storage1=useAtomValue(pieceStorageAtom);
  const storage2=useAtomValue(pieceStorage2Atom);
  const files=useAtomValue(filesAtom);
  const z=useAtomValue(zAtom);
  const messages=useAtomValue(messagesAtom);
  const pieceTypes=useAtomValue(pieceTypesAtom);
  const ws=useAtomValue(wsAtom);
  const element=useMemo(()=>{
    switch (ui.type){
      case "text":
        const text=ui as Text;
        const v:Operatable={
          boards,
          player,
          turn,
          storage1,
          storage2,
          pieceTypes,
          messages,
          z,
          files
        };
        const converted=convert({...v,field:{},requests:[]});
        if (converted.object){
          const value=parser(text.content);
          const s=value.execute(converted.object);
          console.log(s);
          if (s.string!==undefined){
            return <div style={text.style}>{s.string}</div>;
          }else if (s.number!==undefined){
            return <div style={text.style}>{s.number}</div>;
          }else if (s.boolean!==undefined){
            return <div style={text.style}>{s.boolean}</div>;
          }
        }
        return null;
      case "button":
        const button=ui as Button;
        const onClick=()=>{
          const v:Operatable={
            boards,
            player,
            turn,
            storage1,
            storage2,
            pieceTypes,
            messages,
            z,
            files
          };
          const converted=convert({...v,field:{},requests:[]});
          if (converted.object){
            const func=parser(button.onClick);
            func.execute(converted.object);
            const restored=restore(converted);
            const requests:Request<any>[]=restored.requests;
            if (!ws){
              return;
            }
            requests.forEach((request)=>{
              ws.send(JSON.stringify(request));
            });
          }
        };
        return <button style={button.style} onClick={onClick} className="custom-button"><CustomUI ui={button.content}/></button>
      case "image":
        const image=ui as Image;
        const src=files.find((file)=>file.url===image.src);
        return <img style={image.style} src={src?.url}/>
      case "container":
        const container=ui as Container;
        return <div style={container.style}>{container.children.map((child)=><CustomUI ui={child}/>)}</div>
    }
  },[ui,boards,player,turn,storage1,storage2,pieceTypes,messages,z,files]);
  return (
    element
  );
}
