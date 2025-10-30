import {PieceType} from "shogi2-types";

export const item_pieces:PieceType[]=[
  {
    name:"矢",
    id:"stand_arrow",
      movable:{
      absolute:[],
      relative:[],
      func:[]
    },
    jumpable:false,
    promotion:undefined,
    promotion_callback:"",
    promotion_msg:[],
    king:false
  },
];
