import {ModBase} from "./ModBase";

export type ModBaseClass=new ()=>ModBase;

export type Mod={identifier:ModIdentifier,class:ModBaseClass};

export interface ModIdentifier{
  name:string;
  id:string;
};

export type Player="player1"|"player2";

export interface CreateRoomRequest{
  name:string;
  mods:ModIdentifier[];
};

export type Pos={x:number,y:number};

export * from "./Request";
export * from "./Event";
export * from "./Piece";
export * from "./PlayerData";
export * from "./ModBase";
export * from "./ModBase";
export * from "./Game";
export * from "./Board";
export * from "./events/StartEvent";
export * from "./events/BoardEvent";
export * from "./events/MoveEvent";
export * from "./events/AnswerEvent";
export * from "./events/DropEvent";
export * from "./events/CaptureEvent";
export * from "./events/EndEvent";
export * from "./requests/StartRequest";
export * from "./requests/BoardRequest";
export * from "./requests/MoveRequest";
export * from "./requests/TurnRequest";
export * from "./requests/QuestionRequest";
export * from "./requests/SquareRequest";
export * from "./requests/CaptureRequest";
export * from "./requests/PlayerRequest";
export * from "./requests/EndRequest";
