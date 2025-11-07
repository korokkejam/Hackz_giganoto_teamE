import { PieceType } from "shogi2-types";

export const king1=new PieceType(
  "王",
  {
    absolute:[],
    relative:[{x:1,y:1},{x:1,y:-1},{x:-1,y:1},{x:-1,y:-1},{x:1,y:0},{x:0,y:1},{x:-1,y:0},{x:0,y:-1}]
  },
  false
);
export const king2=new PieceType(
  "玉",
  {
    absolute:[],
    relative:[{x:1,y:1},{x:1,y:-1},{x:-1,y:1},{x:-1,y:-1},{x:1,y:0},{x:0,y:1},{x:-1,y:0},{x:0,y:-1}]
  },
  false
);
const promoted_bishop=new PieceType(
  "竜馬",
  {
    absolute:[],
    relative:[
      {x:1,y:1}, {x:2,y:2}, {x:3,y:3}, {x:4,y:4}, {x:5,y:5}, {x:6,y:6}, {x:7,y:7}, {x:8,y:8},
      {x:1,y:-1}, {x:2,y:-2}, {x:3,y:-3}, {x:4,y:-4}, {x:5,y:-5}, {x:6,y:-6}, {x:7,y:-7}, {x:8,y:-8},
      {x:-1,y:1}, {x:-2,y:2}, {x:-3,y:3}, {x:-4,y:4}, {x:-5,y:5}, {x:-6,y:6}, {x:-7,y:7}, {x:-8,y:8},
      {x:-1,y:-1}, {x:-2,y:-2}, {x:-3,y:-3}, {x:-4,y:-4}, {x:-5,y:-5}, {x:-6,y:-6}, {x:-7,y:-7}, {x:-8,y:-8},
      {x:0,y:1},{x:0,y:-1},{x:1,y:0},{x:-1,y:0}
    ]
  },
  false
);
export const bishop=new PieceType(
  "角",
  {
    absolute:[],
    relative:[
      {x:1,y:1}, {x:2,y:2}, {x:3,y:3}, {x:4,y:4}, {x:5,y:5}, {x:6,y:6}, {x:7,y:7}, {x:8,y:8},
      {x:1,y:-1}, {x:2,y:-2}, {x:3,y:-3}, {x:4,y:-4}, {x:5,y:-5}, {x:6,y:-6}, {x:7,y:-7}, {x:8,y:-8},
      {x:-1,y:1}, {x:-2,y:2}, {x:-3,y:3}, {x:-4,y:4}, {x:-5,y:5}, {x:-6,y:6}, {x:-7,y:7}, {x:-8,y:8},
      {x:-1,y:-1}, {x:-2,y:-2}, {x:-3,y:-3}, {x:-4,y:-4}, {x:-5,y:-5}, {x:-6,y:-6}, {x:-7,y:-7}, {x:-8,y:-8},
    ]
  },
  false,
  promoted_bishop
);
const promoted_rook=new PieceType(
  "竜王",
  {
    absolute:[],
    relative:[
      {x:1,y:0}, {x:2,y:0}, {x:3,y:0}, {x:4,y:0}, {x:5,y:0}, {x:6,y:0}, {x:7,y:0}, {x:8,y:0},
      {x:-1,y:0}, {x:-2,y:0}, {x:-3,y:0}, {x:-4,y:0}, {x:-5,y:0}, {x:-6,y:0}, {x:-7,y:0}, {x:-8,y:0},
      {x:0,y:1}, {x:0,y:2}, {x:0,y:3}, {x:0,y:4}, {x:0,y:5}, {x:0,y:6}, {x:0,y:7}, {x:0,y:8},
      {x:0,y:-1}, {x:0,y:-2}, {x:0,y:-3}, {x:0,y:-4}, {x:0,y:-5}, {x:0,y:-6}, {x:0,y:-7}, {x:0,y:-8},
      {x:1,y:1},{x:1,y:-1},{x:-1,y:1},{x:-1,y:-1}
    ]
  },
  false
);
export const rook=new PieceType(
  "飛",
  {
    absolute:[],
    relative:[
      {x:1,y:0}, {x:2,y:0}, {x:3,y:0}, {x:4,y:0}, {x:5,y:0}, {x:6,y:0}, {x:7,y:0}, {x:8,y:0},
      {x:-1,y:0}, {x:-2,y:0}, {x:-3,y:0}, {x:-4,y:0}, {x:-5,y:0}, {x:-6,y:0}, {x:-7,y:0}, {x:-8,y:0},
      {x:0,y:1}, {x:0,y:2}, {x:0,y:3}, {x:0,y:4}, {x:0,y:5}, {x:0,y:6}, {x:0,y:7}, {x:0,y:8},
      {x:0,y:-1}, {x:0,y:-2}, {x:0,y:-3}, {x:0,y:-4}, {x:0,y:-5}, {x:0,y:-6}, {x:0,y:-7}, {x:0,y:-8},
    ]
  },
  false,
  promoted_rook
);
const promoted_knight=new PieceType(
  "成桂",
  {
    absolute:[],
    relative:[{x:1,y:1},{x:0,y:1},{x:-1,y:1},{x:1,y:0},{x:-1,y:0},{x:0,y:-1}]
  },
  false
);
export const knight=new PieceType(
  "桂",
  {
    absolute:[],
    relative:[ {x:1,y:2}, {x:-1,y:2} ]
  },
  true,
  promoted_knight
);
const promoted_pawn=new PieceType(
  "と金",
  {
    absolute:[],
    relative:[{x:1,y:1},{x:0,y:1},{x:-1,y:1},{x:1,y:0},{x:-1,y:0},{x:0,y:-1}]
  },
  false
);
export const pawn=new PieceType(
  "歩",
  {
    absolute:[],
    relative:[{x:0,y:1}]
  },
  false,
  promoted_pawn
);
export const gold=new PieceType(
  "金",
  {
    absolute:[],
    relative:[{x:1,y:1},{x:0,y:1},{x:-1,y:1},{x:1,y:0},{x:-1,y:0},{x:0,y:-1}]
  },
  false
);
export const silver=new PieceType(
  "銀",
  {
    absolute:[],
    relative:[{x:1,y:1},{x:0,y:1},{x:-1,y:1},{x:1,y:-1},{x:-1,y:-1}]
  },
  false
);
const promoted_lance=new PieceType(
  "成香",
  {
    absolute:[],
    relative:[{x:1,y:1},{x:0,y:1},{x:-1,y:1},{x:1,y:0},{x:-1,y:0},{x:0,y:-1}]
  },
  false
);
export const lance=new PieceType(
  "香",
  {
    absolute:[],
    relative:[ {x:0,y:1}, {x:0,y:2}, {x:0,y:3}, {x:0,y:4}, {x:0,y:5}, {x:0,y:6}, {x:0,y:7}, {x:0,y:8}, ]
  },
  false,
  promoted_lance
);
