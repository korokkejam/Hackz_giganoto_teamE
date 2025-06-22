import Data from "../../game/board";
import pieces from "./pieces";

export default function setup(data:Data){
  data.setStorage1(pieces.map((piece)=>{return {...piece}}));
  data.setStorage2(pieces.map((piece)=>{return {...piece}}));
}
