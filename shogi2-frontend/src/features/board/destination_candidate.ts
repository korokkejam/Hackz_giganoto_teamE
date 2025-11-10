import { GameData, Piece, Player, Pos, Square } from "shogi2-types";

export default function destination_candidate(piece:Piece,player:Player,data:GameData):Pos[]{
  const candidate:Pos[]=[];
  const position_list=data.board.squares.filter((square)=>square.piece?.player===player).map((square)=>square.position);
  const {absolute,relative}=piece.type.movable;
  absolute.forEach((pos)=>{
    const exists=position_list.some((p)=>pos_cmp(p,pos));
    if (exists){
      return;
    }
    candidate.push(pos);
  });
  const k=player==="player1"?-1:1;
  relative.forEach((pos)=>{
    const adjusted={x:k*pos.x,y:k*pos.y};
    const p=pos_add(adjusted,piece.position);
    const exists=position_list.some((pos)=>pos_cmp(p,pos));
    if (exists){
      return;
    }
    if (piece.type.jumpable){
      candidate.push(adjusted);
      return;
    }
    const absx=Math.abs(pos.x);
    const absy=Math.abs(pos.y);
    const minx=min(p.x,piece.position.x);
    const miny=min(p.y,piece.position.y);
    const maxx=max(p.x,piece.position.x);
    const maxy=max(p.y,piece.position.y);
    if (absy===0 && absx){
      const filter=(square:Square)=>square.piece && square.position.y===piece.position.y && minx < square.position.x && square.position.x < maxx;
      const number_of_pieces=data.board.squares.filter(filter).length;
      if (number_of_pieces){
        return;
      }
    }
    if (absx===0 && absy){
      const filter=(square:Square)=>square.piece && square.position.x===piece.position.x && miny < square.position.y && square.position.y < maxy;
      const number_of_pieces=data.board.squares.filter(filter).length;
      if (number_of_pieces){
        return;
      }
    }
    if (absx===absy){
      const dx=absx/adjusted.x;
      const dy=absy/adjusted.y;
      const m=absx;
      const squares=[];
      for (let i=1;i < m;i++){
        const x=piece.position.x+dx*i;
        const y=piece.position.y+dy*i;
        const square=data.board.squares.find((square)=>pos_cmp(square.position,{x,y}));
        if (square){
          squares.push(square);
        }
      }
      const number_of_empty=squares.filter((square)=>!square.piece).length;
      const number_of_not_empty=squares.length-number_of_empty;
      if (number_of_not_empty){
        return;
      }
    }
    candidate.push(adjusted);
  });
  return candidate;
};

const pos_cmp=(p1:Pos,p2:Pos)=>p1.x===p2.x && p1.y===p2.y;
const pos_add=(p1:Pos,p2:Pos)=>({x:p1.x+p2.x,y:p1.y+p2.y});
const min=(a:number,b:number)=>a<b?a:b;
const max=(a:number,b:number)=>a>b?a:b;
