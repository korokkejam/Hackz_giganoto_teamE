import "../types/global";

const wall:pieceType={
  name:"壁",
  movable:{
    relative:[],
    absolute:[],
    func:""
  },
  jumpable:false
};
const knight_chess:pieceType={
  name:"騎士",
  movable:{
    relative:[[1,2],[-1,2],[2,1],[2,-1],[-2,1],[-2,-1],[1,-2],[-1,-2]],
    absolute:[],
    func:""
  },
  jumpable:true
};
const redbull:pieceType={
  name:"赤牛",
  movable:{
    relative:[[1,0],[0,1],[-1,0]],
    absolute:[[0,8],[8,8]],
    func:""
  },
  jumpable:true
};
const superman:pieceType={
  name:"超人",
  movable:{
    relative:[[2,2],[-2,2],[2,-2],[-2,-2]],
    absolute:[],
    func:""
  },
  jumpable:true
};
const ki:pieceType={
  name:"奇",movable:{
    relative:[],
    absolute:[],
    func:"()=>[Math.floor(Math.random()*9),Math.floor(Math.random()*9)]"
  },
  jumpable:true
};
const pawn:pieceType={
  name:"ポ",movable:{
    relative:[[0,1],[0,2]],
    absolute:[],
    func:""
  },
  jumpable:false
};
const oh:pieceType={
  name:"oh",movable:{
    relative:[[1,2],[-1,1]],
    absolute:[],
    func:""
    //oh!!!
  },
  jumpable:false
};
