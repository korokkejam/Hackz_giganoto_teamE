import {PieceType} from "shogi2-types";

export const golden_wind_pieces:PieceType[]=[
  {
    name:"黄金",
    id:"gold_experience",
      movable:{
      absolute:[],
      relative:[],
      func:[]
    },
    jumpable:false,
    promotion:{
      name:"無帰",
      id:"gold_experience_requiem",
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
    promotion_callback:"",
    promotion_msg:["あなたは\"矢\"に選ばれた者ですか？","はい","いいえ"],
    king:false,
    promotion_check:true
  }
];
