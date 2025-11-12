import { ReactNode } from "react";
import "./styles/CenterPanel.css";

export default function CenterPanel({children}:{children?:ReactNode}){
  return (
    <div className="centerpanel">
      {children}
    </div>
  );
}
