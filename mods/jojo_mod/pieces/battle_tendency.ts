import {PieceType} from "shogi2-types";

export const battle_tendency_pieces:PieceType[]=[
  {
    name:"死馬",
    id:"zombie_horse",
      movable:{
      absolute:[],
      relative:[
        [1,2],
        [1,-2],
        [-1,2],
        [-1,-2],
        [2,1],
        [2,-1],
        [-2,1],
        [-2,-1],
        [2,4],
        [2,-4],
        [-2,4],
        [-2,-4],
        [4,2],
        [4,-2],
        [-4,2],
        [-4,-2],
      ],
      func:[]
    },
    jumpable:true,
    promotion_msg:[],
    promotion_callback:"",
    promotion:undefined,
    king:false
  }
];
