import { Container, Image } from "shogi2-types";
import { CSSProperties } from "@mui/material";

const style:CSSProperties={
  position:"fixed",
  width:"100%",
  height:"100%",
  pointerEvents:"none",
  left:"0px",
  top:"0px",
  display:"flex",
  flexDirection:"column-reverse",
};

const imageStyle:CSSProperties={
  width:"100%",
};

export const to_be_continued_background=new Container(
  "to_be_continued_foreground",
  [
    new Image("","to_be_continued_gif",imageStyle)
  ],
  style
);
