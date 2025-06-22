import {pieceType} from "../types/global";

const dragon_king:pieceType={
  name:"龍王",
  movable:{
    relative:[...[...Array(8)].map((_,i)=>[0,i+1]),...[...Array(8)].map((_,i)=>[i+1,0]),...[...Array(8)].map((_,i)=>[0,-i-1]),...[...Array(8)].map((_,i)=>[-i-1,0]),[1,1],[1,-1],[-1,1],[-1,-1]],
    absolute:[],
    func:""
  },
  jumpable:false,
  promotion:undefined,
  promotion_callback:""
};

const promoted_bishop:pieceType={
  name:"龍馬",
  movable:{
    relative:[...[...Array(8)].map((_,i)=>[i+1,i+1]),...[...Array(8)].map((_,i)=>[i+1,-i-1]),...[...Array(8)].map((_,i)=>[-i-1,i+1]),...[...Array(8)].map((_,i)=>[-i-1,-i-1]),[0,1],[0,-1],[-1,0],[1,0]],
    absolute:[],
    func:""
  },
  jumpable:false,
  promotion:undefined,
  promotion_callback:""
};

const promoted_silver:pieceType={
  name:"成銀",
  movable:{
    relative:[[1,1],[0,1],[-1,1],[1,0],[-1,0],[0,-1]],
    absolute:[],
    func:""
  },
  jumpable:false,
  promotion:undefined,
  promotion_callback:""
};

const promoted_knight:pieceType={
  name:"成桂",
  movable:{
    relative:[[1,1],[0,1],[-1,1],[1,0],[-1,0],[0,-1]],
    absolute:[],
    func:""
  },
  jumpable:false,
  promotion:undefined,
  promotion_callback:""
};

const promoted_lance:pieceType={
  name:"成香",
  movable:{
    relative:[[1,1],[0,1],[-1,1],[1,0],[-1,0],[0,-1]],
    absolute:[],
    func:""
  },
  jumpable:false,
  promotion:undefined,
  promotion_callback:""
};

const lance:pieceType={
  name:"香",
  movable:{
    relative:[...Array(8)].map((_,i)=>[0,i+1]),
    absolute:[[1,3]],
    func:""
  },
  jumpable:false,
  promotion:promoted_lance,
  promotion_callback:""
};

const knight:pieceType={
  name:"桂",
  movable:{
    relative:[[1,2],[-1,2]],
    absolute:[],
    func:""
  },
  jumpable:true,
  promotion:promoted_knight,
  promotion_callback:""
};

const silver_general:pieceType={
  name:"銀",
  movable:{
    relative:[[1,1],[0,1],[-1,1],[-1,-1],[1,-1]],
    absolute:[],
    func:""
  },
  jumpable:false,
  promotion:promoted_silver,
  promotion_callback:""
};

const gold_general:pieceType={
  name:"金",
  movable:{
    relative:[[1,1],[0,1],[-1,1],[1,0],[-1,0],[0,-1]],
    absolute:[],
    func:""
  },
  jumpable:false,
  promotion:undefined,
  promotion_callback:""
};

const promoted_pawn:pieceType={
  name:"と金",
  movable:{
    relative:[[1,1],[0,1],[-1,1],[1,0],[-1,0],[0,-1]],
    absolute:[],
    func:""
  },
  jumpable:false,
  promotion:undefined,
  promotion_callback:""
};

const king1:pieceType={
  name:"王",
  movable:{
    relative:[[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]],
    absolute:[],
    func:""
  },
  jumpable:false,
  promotion:undefined,
  promotion_callback:""
};

const king2:pieceType={
  name:"玉",
  movable:{
    relative:[[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]],
    absolute:[],
    func:""
  },
  jumpable:false,
  promotion:undefined,
  promotion_callback:""
};

const rook:pieceType={
  name:"飛",
  movable:{
    relative:[...[...Array(8)].map((_,i)=>[0,i+1]),...[...Array(8)].map((_,i)=>[i+1,0]),...[...Array(8)].map((_,i)=>[0,-i-1]),...[...Array(8)].map((_,i)=>[-i-1,0])],
    absolute:[],
    func:""
  },
  jumpable:false,
  promotion:dragon_king,
  promotion_callback:""
};

const bishop:pieceType={
  name:"角",
  movable:{
    relative:[...[...Array(8)].map((_,i)=>[i+1,i+1]),...[...Array(8)].map((_,i)=>[i+1,-i-1]),...[...Array(8)].map((_,i)=>[-i-1,i+1]),...[...Array(8)].map((_,i)=>[-i-1,-i-1])],
    absolute:[],
    func:""
  },
  jumpable:false,
  promotion:promoted_bishop,
  promotion_callback:""
};

const pawn:pieceType={
  name:"歩",
  movable:{
    relative:[[0,1]],
    absolute:[],
    func:""
  },
  jumpable:false,
  promotion:promoted_pawn,
  promotion_callback:""
};

const pieces:pieceType[]=[lance,knight,silver_general,gold_general,king1,king2,rook,bishop,pawn,]
// dragon_king, promoted_bishop, promoted_silver, promoted_knight, promoted_lance, promoted_pawn


export {lance,knight,silver_general,gold_general,king1,king2,rook,bishop,pawn,pieces};
