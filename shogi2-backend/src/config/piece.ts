import { PieceType } from "shogi2-types";

const promoted_silver:PieceType={
  id:"promoted_silver",
  name:"成銀",
  movable:{
    relative:[[1,1],[0,1],[-1,1],[1,0],[-1,0],[0,-1]],
    absolute:[],
    func:[]
  },
  jumpable:false,
  promotion:undefined,
  promotion_callback:"",
  promotion_msg:[],
  king:false
};

const promoted_knight:PieceType={
  id:"promoted_knight",
  name:"成桂",
  movable:{
    relative:[[1,1],[0,1],[-1,1],[1,0],[-1,0],[0,-1]],
    absolute:[],
    func:[]
  },
  jumpable:false,
  promotion:undefined,
  promotion_callback:"",
  promotion_msg:[],
  king:false
};

const promoted_lance:PieceType={
  id:"promoted_lance",
  name:"成香",
  movable:{
    relative:[[1,1],[0,1],[-1,1],[1,0],[-1,0],[0,-1]],
    absolute:[],
    func:[]
  },
  jumpable:false,
  promotion:undefined,
  promotion_callback:"",
  promotion_msg:[],
  king:false
};

const knight:PieceType={
  id:"knight",
  name:"桂",
  movable:{
    relative:[[1,2],[-1,2]],
    absolute:[],
    func:[]
  },
  jumpable:true,
  promotion:promoted_knight,
  promotion_callback:"",
  promotion_msg:[],
  king:false
};

const silver_general:PieceType={
  id:"silver_general",
  name:"銀",
  movable:{
    relative:[[1,1],[0,1],[-1,1],[-1,-1],[1,-1]],
    absolute:[],
    func:[]
  },
  jumpable:false,
  promotion:promoted_silver,
  promotion_callback:"",
  promotion_msg:["成りますか？","嫌じゃないかもしれない","嫌です"],
  king:false
};

const gold_general:PieceType={
  id:"gold_general",
  name:"金",
  movable:{
    relative:[[1,1],[0,1],[-1,1],[1,0],[-1,0],[0,-1]],
    absolute:[],
    func:[]
  },
  jumpable:false,
  promotion:undefined,
  promotion_callback:"",
  promotion_msg:[],
  king:false
};

const promoted_pawn:PieceType={
  id:"promoted_pawn",
  name:"と金",
  movable:{
    relative:[[1,1],[0,1],[-1,1],[1,0],[-1,0],[0,-1]],
    absolute:[],
    func:[]
  },
  jumpable:false,
  promotion:undefined,
  promotion_callback:"",
  promotion_msg:[],
  king:false
};

const king1:PieceType={
  id:"king1",
  name:"王",
  movable:{
    relative:[[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]],
    absolute:[],
    func:[]
  },
  jumpable:false,
  promotion:undefined,
  promotion_callback:"",
  promotion_msg:[],
  king:true
};

const king2:PieceType={
  id:"king2",
  name:"玉",
  movable:{
    relative:[[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]],
    absolute:[],
    func:[]
  },
  jumpable:false,
  promotion:undefined,
  promotion_callback:"",
  promotion_msg:[],
  king:true
};

const pawn:PieceType={
  id:"pawn",
  name:"歩",
  movable:{
    relative:[[0,1]],
    absolute:[],
    func:[]
  },
  jumpable:false,
  promotion:promoted_pawn,
  promotion_callback:"",
  promotion_msg:[],
  king:false
};

const dragon_king:PieceType={
  id:"dragon_king",
  name:"龍王",
  movable:{
    relative:[[1,1],[1,-1],[-1,1],[-1,-1]],
    absolute:[],
    func:[
      `(p,_,board)=>[...[...Array(board[p.y].length)].map((_,i)=>[p.x+i+1,p.y])]`,
      `(p,_,board)=>[...[...Array(board[p.y].length)].map((_,i)=>[p.x-i-1,p.y])]`,
      `(p,_,board)=>[...[...Array(board.length)].map((_,i)=>[p.x,p.y+i+1])]`,
      `(p,_,board)=>[...[...Array(board.length)].map((_,i)=>[p.x,p.y-i-1])]`,
    ]
  },
  jumpable:false,
  promotion:undefined,
  promotion_callback:"",
  promotion_msg:[],
  king:false
};

const promoted_bishop:PieceType={
  id:"promoted_bishop",
  name:"龍馬",
  movable:{
    relative:[[0,1],[0,-1],[-1,0],[1,0]],
    absolute:[],
    func:[
      `(p,_,board)=>[
        ...[
          ...Array(board.length<board[p.y].length?board[p.y].length:board.length)
        ].map((_,i)=>[p.x+i+1,p.y+i+1])
      ]`,
      `(p,_,board)=>[
        ...[
          ...Array(board.length<board[p.y].length?board[p.y].length:board.length)
        ].map((_,i)=>[p.x+i+1,p.y-i-1])
      ]`,
      `(p,_,board)=>[
        ...[
          ...Array(board.length<board[p.y].length?board[p.y].length:board.length)
        ].map((_,i)=>[p.x-i-1,p.y+i+1])
      ]`,
      `(p,_,board)=>[
        ...[
          ...Array(board.length<board[p.y].length?board[p.y].length:board.length)
        ].map((_,i)=>[p.x-i-1,p.y-i-1])
      ]`
    ]
  },
  jumpable:false,
  promotion:undefined,
  promotion_callback:"",
  promotion_msg:[],
  king:false
};

const bishop:PieceType={
  id:"bishop",
  name:"角",
  movable:{
    relative:[],
    absolute:[],
    func:[
      `(p,_,board)=>[
        ...[
          ...Array(board.length<board[p.y].length?board[p.y].length:board.length)
        ].map((_,i)=>[p.x+i+1,p.y+i+1])
      ]`,
      `(p,_,board)=>[
        ...[
          ...Array(board.length<board[p.y].length?board[p.y].length:board.length)
        ].map((_,i)=>[p.x+i+1,p.y-i-1])
      ]`,
      `(p,_,board)=>[
        ...[
          ...Array(board.length<board[p.y].length?board[p.y].length:board.length)
        ].map((_,i)=>[p.x-i-1,p.y+i+1])
      ]`,
      `(p,_,board)=>[
        ...[
          ...Array(board.length<board[p.y].length?board[p.y].length:board.length)
        ].map((_,i)=>[p.x-i-1,p.y-i-1])
      ]`
    ]
  },
  jumpable:false,
  promotion:promoted_bishop,
  promotion_callback:"",
  promotion_msg:[],
  king:false
};

const rook:PieceType={
  id:"rook",
  name:"飛",
  movable:{
    relative:[],
    absolute:[],
    func:[
      `(p,_,board)=>[...[...Array(board[p.y].length)].map((_,i)=>[p.x+i+1,p.y])]`,
      `(p,_,board)=>[...[...Array(board[p.y].length)].map((_,i)=>[p.x-i-1,p.y])]`,
      `(p,_,board)=>[...[...Array(board.length)].map((_,i)=>[p.x,p.y+i+1])]`,
      `(p,_,board)=>[...[...Array(board.length)].map((_,i)=>[p.x,p.y-i-1])]`,
    ]
  },
  jumpable:false,
  promotion:dragon_king,
  promotion_callback:"",
  promotion_msg:[],
  king:false
};

const lance:PieceType={
  id:"lance",
  name:"香",
  movable:{
    relative:[],
    absolute:[],
    func:[`(p,turn,board)=>[...Array(board.length)].map((_,i)=>[p.x,p.y+(i+1)*(turn==="player1"?-1:1)])`]
  },
  jumpable:false,
  promotion:promoted_lance,
  promotion_callback:"",
  promotion_msg:[],
  king:false
};

const pieces:PieceType[]=[lance,knight,silver_general,gold_general,king1,king2,rook,bishop,pawn,]
// promoted_bishop, promoted_silver, promoted_knight, promoted_lance, promoted_pawn

export {lance,knight,silver_general,gold_general,king1,king2,rook,bishop,pawn,pieces};
