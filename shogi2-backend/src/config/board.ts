import "../types/global";

const lance:pieceType={name:"香",movable:{relative:[],absolute:[]}};
const knight:pieceType={name:"桂",movable:{relative:[],absolute:[]}};
const silver_general:pieceType={name:"銀",movable:{relative:[],absolute:[]}};
const gold_general:pieceType={name:"金",movable:{relative:[],absolute:[]}};
const king1:pieceType={name:"王",movable:{relative:[],absolute:[]}};
const king2:pieceType={name:"玉",movable:{relative:[],absolute:[]}};
const rook:pieceType={name:"飛",movable:{relative:[],absolute:[]}};
const bishop:pieceType={name:"角",movable:{relative:[],absolute:[]}};
const pawn:pieceType={name:"歩",movable:{relative:[],absolute:[]}};

const boards:board[]=[[
  [{piece:{type:lance,player:"player2"}},{piece:{type:knight,player:"player2"}},{piece:{type:silver_general,player:"player2"}},{piece:{type:gold_general,player:"player2"}},{piece:{type:king1,player:"player2"}},{piece:{type:gold_general,player:"player2"}},{piece:{type:silver_general,player:"player2"}},{piece:{type:knight,player:"player2"}},{piece:{type:lance,player:"player2"}}],
  [{piece:null},{piece:{type:rook,player:"player2"}},{piece:null},{piece:null},{piece:null},{piece:null},{piece:null},{piece:{type:bishop,player:"player2"}},{piece:null}],
  [{piece:{type:pawn,player:"player2"}},{piece:{type:pawn,player:"player2"}},{piece:{type:pawn,player:"player2"}},{piece:{type:pawn,player:"player2"}},{piece:{type:pawn,player:"player2"}},{piece:{type:pawn,player:"player2"}},{piece:{type:pawn,player:"player2"}},{piece:{type:pawn,player:"player2"}},{piece:{type:pawn,player:"player2"}}],
  [{piece:null},{piece:null},{piece:null},{piece:null},{piece:null},{piece:null},{piece:null},{piece:null},{piece:null}],
  [{piece:null},{piece:null},{piece:null},{piece:null},{piece:null},{piece:null},{piece:null},{piece:null},{piece:null}],
  [{piece:null},{piece:null},{piece:null},{piece:null},{piece:null},{piece:null},{piece:null},{piece:null},{piece:null}],
  [{piece:{type:pawn,player:"player1"}},{piece:{type:pawn,player:"player1"}},{piece:{type:pawn,player:"player1"}},{piece:{type:pawn,player:"player1"}},{piece:{type:pawn,player:"player1"}},{piece:{type:pawn,player:"player1"}},{piece:{type:pawn,player:"player1"}},{piece:{type:pawn,player:"player1"}},{piece:{type:pawn,player:"player1"}}],
  [{piece:null},{piece:{type:bishop,player:"player1"}},{piece:null},{piece:null},{piece:null},{piece:null},{piece:null},{piece:{type:rook,player:"player1"}},{piece:null}],
  [{piece:{type:lance,player:"player1"}},{piece:{type:knight,player:"player1"}},{piece:{type:silver_general,player:"player1"}},{piece:{type:gold_general,player:"player1"}},{piece:{type:king2,player:"player1"}},{piece:{type:gold_general,player:"player1"}},{piece:{type:silver_general,player:"player1"}},{piece:{type:knight,player:"player1"}},{piece:{type:lance,player:"player1"}}],
]];

export {boards};
