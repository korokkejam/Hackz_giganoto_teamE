import { ChangeBoardEvent, Game, Piece, PieceType, player, Request, ReturnRequest, Square } from "shogi2-types";

export default function expand(game:Game):ReturnRequest[]{
  const king1=game.pieces.find((p)=>p.id==="king1");
  const king2=game.pieces.find((p)=>p.id==="king2");
  const bishop=game.pieces.find((p)=>p.id==="bishop");
  const rook=game.pieces.find((p)=>p.id==="rook");
  const gold_general=game.pieces.find((p)=>p.id==="gold_general");
  const silver_general=game.pieces.find((p)=>p.id==="silver_general");
  const knight=game.pieces.find((p)=>p.id==="knight");
  const lance=game.pieces.find((p)=>p.id==="lance");
  const pawn=game.pieces.find((p)=>p.id==="pawn");

  const star_platinum=game.pieces.find((p)=>p.id==="star_platinum");
  const gold_experience=game.pieces.find((p)=>p.id==="gold_experience");
  const harvest=game.pieces.find((p)=>p.id==="harvest");
  const stand_arrow=game.pieces.find((p)=>p.id==="stand_arrow");
  const the_hand=game.pieces.find((p)=>p.id==="the_hand");
  const zombie_horse=game.pieces.find((p)=>p.id==="zombie_horse");
  const white_snake=game.pieces.find((p)=>p.id==="white_snake");
  const green_baby=game.pieces.find((p)=>p.id==="green_baby");
  const bad_campany=game.pieces.find((p)=>p.id==="bad_campany");
  const mandom=game.pieces.find((p)=>p.id==="mandom");
  const d4c=game.pieces.find((p)=>p.id==="d4c");

  game.boards=[[
    [
      create(lance,"player2"),
      create(knight,"player2"),
      create(lance,"player2"),
      create(zombie_horse,"player2"),
      create(silver_general,"player2"),
      create(gold_general,"player2"),
      create(star_platinum,"player2"),
      create(king2,"player2"),
      create(the_hand,"player2"),
      create(gold_general,"player2"),
      create(silver_general,"player2"),
      create(zombie_horse,"player2"),
      create(lance,"player2"),
      create(knight,"player2"),
      create(lance,"player2"),
    ],
    [
      {piece:null},
      create(stand_arrow,"player2"),
      {piece:null},{piece:null},
      create(bishop,"player2"),
      {piece:null},{piece:null},{piece:null},{piece:null},{piece:null},
      create(rook,"player2"),
      {piece:null},{piece:null},
      create(gold_experience,"player2"),
      {piece:null}
    ],
    [...Array(15)].map((_,i)=>create(i%2?harvest:pawn,"player2")),
    ...[...Array(9)].map(()=>[...Array(15)].map(()=>{return {piece:null}})),
    [...Array(15)].map((_,i)=>create(i%2?bad_campany:pawn,"player1")),
    [
      {piece:null},
      create(green_baby,"player1"),
      {piece:null},{piece:null},
      create(bishop,"player1"),
      {piece:null},{piece:null},{piece:null},{piece:null},{piece:null},
      create(rook,"player1"),
      {piece:null},{piece:null},
      create(white_snake,"player1"),
      {piece:null}
    ],
    [
      create(lance,"player1"),
      create(knight,"player1"),
      create(lance,"player1"),
      create(zombie_horse,"player1"),
      create(silver_general,"player1"),
      create(gold_general,"player1"),
      create(mandom,"player1"),
      create(king1,"player1"),
      create(d4c,"player1"),
      create(gold_general,"player1"),
      create(silver_general,"player1"),
      create(zombie_horse,"player1"),
      create(lance,"player1"),
      create(knight,"player1"),
      create(lance,"player1"),
    ]
  ]];
  game.boards=game.boards.map((board)=>board.map((row)=>row.map((s)=>{
    if (s.piece){
      return create(d4c,s.piece.owner);
    }else{
      return s;
    }
  })));
  const change:ChangeBoardEvent={
    id:crypto.randomUUID(),
    type:"change",
    data:{
      boards:game.boards
    }
  };
  const req:Request<ChangeBoardEvent>={
    head:"event",
    content:change
  };
  return [{request:req,target:undefined,owner:"jojo"}];
}

function create(type:PieceType|undefined,owner:player):Square{
  if (type){
    const piece:Piece={
      id:crypto.randomUUID(),
      owner,
      type
    };
    return {piece};
  }else{
    return {piece:null};
  }
}
