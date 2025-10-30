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

export * from "./Request";
export * from "./requests/StartRequest";
export * from "./requests/BoardRequest";
export * from "./Event";
export * from "./Piece";
export * from "./PlayerData";
export * from "./ModBase";
export * from "./ModBase";
export * from "./Game";
export * from "./Board";
export * from "./events/StartEvent";
export * from "./events/BoardEvent";
