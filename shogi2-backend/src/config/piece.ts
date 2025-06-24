import { PieceType } from "shogi2-types";

const dark_king:PieceType={
  src:"",
  name:"魔王",
  movable:{
    relative:[...[...Array(8)].map((_,i)=>[0,i+1]),...[...Array(8)].map((_,i)=>[i+1,0]),...[...Array(8)].map((_,i)=>[0,-i-1]),...[...Array(8)].map((_,i)=>[-i-1,0]),...[...Array(8)].map((_,i)=>[i+1,i+1]),...[...Array(8)].map((_,i)=>[i+1,-i-1]),...[...Array(8)].map((_,i)=>[-i-1,i+1]),...[...Array(8)].map((_,i)=>[-i-1,-i-1])],
    absolute:[],
    func:""
  },
  jumpable:false,
  promotion:undefined,
  promotion_callback:"",
  promotion_msg:[],
  king:true
};

const dragon_king:PieceType={
  src:"",
  name:"龍王",
  movable:{
    relative:[...[...Array(8)].map((_,i)=>[0,i+1]),...[...Array(8)].map((_,i)=>[i+1,0]),...[...Array(8)].map((_,i)=>[0,-i-1]),...[...Array(8)].map((_,i)=>[-i-1,0]),[1,1],[1,-1],[-1,1],[-1,-1]],
    absolute:[],
    func:""
  },
  jumpable:false,
  promotion:undefined,
  promotion_callback:"",
  promotion_msg:[],
  king:false
};

const promoted_bishop:PieceType={
  src:"",
  name:"龍馬",
  movable:{
    relative:[...[...Array(8)].map((_,i)=>[i+1,i+1]),...[...Array(8)].map((_,i)=>[i+1,-i-1]),...[...Array(8)].map((_,i)=>[-i-1,i+1]),...[...Array(8)].map((_,i)=>[-i-1,-i-1]),[0,1],[0,-1],[-1,0],[1,0]],
    absolute:[],
    func:""
  },
  jumpable:false,
  promotion:undefined,
  promotion_callback:"",
  promotion_msg:[],
  king:false
};

const promoted_silver:PieceType={
  src:"",
  name:"成銀",
  movable:{
    relative:[[1,1],[0,1],[-1,1],[1,0],[-1,0],[0,-1]],
    absolute:[],
    func:""
  },
  jumpable:false,
  promotion:undefined,
  promotion_callback:"",
  promotion_msg:[],
  king:false
};

const promoted_knight:PieceType={
  src:"",
  name:"成桂",
  movable:{
    relative:[[1,1],[0,1],[-1,1],[1,0],[-1,0],[0,-1]],
    absolute:[],
    func:""
  },
  jumpable:false,
  promotion:undefined,
  promotion_callback:"",
  promotion_msg:[],
  king:false
};

const promoted_lance:PieceType={
  src:"",
  name:"成香",
  movable:{
    relative:[[1,1],[0,1],[-1,1],[1,0],[-1,0],[0,-1]],
    absolute:[],
    func:""
  },
  jumpable:false,
  promotion:undefined,
  promotion_callback:"",
  promotion_msg:[],
  king:false
};

const lance:PieceType={
  src:"",
  name:"香",
  movable:{
    relative:[...Array(8)].map((_,i)=>[0,i+1]),
    absolute:[[1,3]],
    func:""
  },
  jumpable:false,
  promotion:promoted_lance,
  promotion_callback:"",
  promotion_msg:[],
  king:false
};

const knight:PieceType={
  src:"",
  name:"桂",
  movable:{
    relative:[[1,2],[-1,2]],
    absolute:[],
    func:""
  },
  jumpable:true,
  promotion:promoted_knight,
  promotion_callback:"",
  promotion_msg:[],
  king:false
};

const silver_general:PieceType={
  src:"",
  name:"銀",
  movable:{
    relative:[[1,1],[0,1],[-1,1],[-1,-1],[1,-1]],
    absolute:[],
    func:""
  },
  jumpable:false,
  promotion:promoted_silver,
  promotion_callback:"",
  promotion_msg:["成りますか？","嫌じゃないかもしれない","嫌です"],
  king:false
};

const gold_general:PieceType={
  src:"",
  name:"金",
  movable:{
    relative:[[1,1],[0,1],[-1,1],[1,0],[-1,0],[0,-1]],
    absolute:[],
    func:""
  },
  jumpable:false,
  promotion:undefined,
  promotion_callback:"",
  promotion_msg:[],
  king:false
};

const promoted_pawn:PieceType={
  src:"",
  name:"と金",
  movable:{
    relative:[[1,1],[0,1],[-1,1],[1,0],[-1,0],[0,-1]],
    absolute:[],
    func:""
  },
  jumpable:false,
  promotion:undefined,
  promotion_callback:"",
  promotion_msg:[],
  king:false
};

const king1:PieceType={
  src:"",
  name:"王",
  movable:{
    relative:[[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]],
    absolute:[],
    func:""
  },
  jumpable:false,
  promotion:dark_king,
  promotion_callback:"",
  promotion_msg:["更なる力が欲しいか？","欲しい","欲しくない"],
  king:true
};

const king2:PieceType={
  src:"",
  name:"玉",
  movable:{
    relative:[[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]],
    absolute:[],
    func:""
  },
  jumpable:false,
  promotion:dark_king,
  promotion_callback:"",
  promotion_msg:["更なる力が欲しいか？","欲しい","欲しくない"],
  king:true
};

const rook:PieceType={
  src:"",
  name:"飛",
  movable:{
    relative:[...[...Array(8)].map((_,i)=>[0,i+1]),...[...Array(8)].map((_,i)=>[i+1,0]),...[...Array(8)].map((_,i)=>[0,-i-1]),...[...Array(8)].map((_,i)=>[-i-1,0])],
    absolute:[],
    func:""
  },
  jumpable:false,
  promotion:dragon_king,
  promotion_callback:"",
  promotion_msg:[],
  king:false
};

const bishop:PieceType={
  src:"",
  name:"角",
  movable:{
    relative:[...[...Array(8)].map((_,i)=>[i+1,i+1]),...[...Array(8)].map((_,i)=>[i+1,-i-1]),...[...Array(8)].map((_,i)=>[-i-1,i+1]),...[...Array(8)].map((_,i)=>[-i-1,-i-1])],
    absolute:[],
    func:""
  },
  jumpable:false,
  promotion:promoted_bishop,
  promotion_callback:"",
  promotion_msg:[],
  king:false
};

const pawn:PieceType={
  src:"",
  name:"歩",
  movable:{
    relative:[[0,1]],
    absolute:[],
    func:""
  },
  jumpable:false,
  promotion:promoted_pawn,
  promotion_callback:"",
  promotion_msg:[],
  king:false
};

const pieces:PieceType[]=[lance,knight,silver_general,gold_general,king1,king2,rook,bishop,pawn,]
// dragon_king, promoted_bishop, promoted_silver, promoted_knight, promoted_lance, promoted_pawn


export {lance,knight,silver_general,gold_general,king1,king2,rook,bishop,pawn,pieces};
