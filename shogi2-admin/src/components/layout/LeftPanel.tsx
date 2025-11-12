import "./styles/LeftPanel.css";
import { ReactNode } from "react";

export default function LeftPanel({children}:{children?:ReactNode}){
  return (
    <div className="leftpanel">
      {children}
    </div>
  );
}
