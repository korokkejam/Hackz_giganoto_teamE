import { PieceType } from "shogi2-types";

const dragon_king:PieceType={
  id:"dragon_king",
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
  id:"promoted_bishop",
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
  id:"promoted_silver",
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
  id:"promoted_knight",
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
  id:"promoted_lance",
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
  id:"lance",
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
  id:"knight",
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
  id:"silver_general",
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
  id:"gold_general",
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
  id:"promoted_pawn",
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
  id:"king1",
  src:"",
  name:"王",
  movable:{
    relative:[[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]],
    absolute:[],
    func:""
  },
  jumpable:false,
  promotion:undefined,
  promotion_callback:"",
  promotion_msg:["更なる力が欲しいか？","欲しい","欲しくない"],
  king:true
};

const king2:PieceType={
  id:"king2",
  src:"",
  name:"玉",
  movable:{
    relative:[[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]],
    absolute:[],
    func:""
  },
  jumpable:false,
  promotion:undefined,
  promotion_callback:"",
  promotion_msg:["更なる力が欲しいか？","欲しい","欲しくない"],
  king:true
};

const rook:PieceType={
  id:"rook",
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
  id:"bishop",
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
  id:"pawn",
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
