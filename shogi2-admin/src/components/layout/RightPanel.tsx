import { ReactNode } from "react";
import "./styles/RightPanel.css";

export default function RightPanel({children}:{children?:ReactNode}){
  return (
    <div className="rightpanel">
      {children}
    </div>
  );
}
