import "../types/global";

const lance:pieceType={
  name:"香",
  movable:{
    relative:[...Array(8)].map((_,i)=>[0,i+1]),
    absolute:[]
  },
  jumpable:false
};

const knight:pieceType={
  name:"桂",
  movable:{
    relative:[[1,2],[-1,2]],
    absolute:[]
  },
  jumpable:false
};

const silver_general:pieceType={
  name:"銀",
  movable:{
    relative:[[1,1],[0,1],[-1,1],[-1,-1],[1,-1]],
    absolute:[]
  },
  jumpable:false
};

const gold_general:pieceType={
  name:"金",
  movable:{
    relative:[[1,1],[0,1],[-1,1],[1,0],[-1,0],[0,-1]],
    absolute:[]
  },
  jumpable:false
};

const king1:pieceType={
  name:"王",
  movable:{
    relative:[[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[-1,-1],[-1,0],[-1,1]],
    absolute:[]
  },
  jumpable:false
};

const king2:pieceType={
  name:"玉",
  movable:{
    relative:[[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[-1,-1],[-1,0],[-1,1]],
    absolute:[]
  },
  jumpable:false
};

const rook:pieceType={
  name:"飛",
  movable:{
    relative:[...[...Array(8)].map((_,i)=>[0,i+1]),...[...Array(8)].map((_,i)=>[i+1,0]),...[...Array(8)].map((_,i)=>[0,-i-1]),...[...Array(8)].map((_,i)=>[-i-1,0])],
    absolute:[]
  },
  jumpable:true
};

const bishop:pieceType={
  name:"角",
  movable:{
    relative:[...[...Array(8)].map((_,i)=>[i+1,i+1]),...[...Array(8)].map((_,i)=>[i+1,-i-1]),...[...Array(8)].map((_,i)=>[-i-1,i+1]),...[...Array(8)].map((_,i)=>[-i-1,-i-1])],
    absolute:[]
  },
  jumpable:false
};

const pawn:pieceType={name:"歩",movable:{relative:[[0,1]],absolute:[]},jumpable:false};

export {lance,knight,silver_general,gold_general,king1,king2,rook,bishop,pawn};
