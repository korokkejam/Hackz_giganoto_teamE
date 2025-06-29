import {atom} from "jotai";
import type {board,player} from "shogi2-types";
import {ChatEventType, Piece,PieceType} from "shogi2-types";

export const boardAtom=atom<board>([]);
export const playerAtom=atom<player|undefined>("player1");
export const turnAtom=atom<player>("player1");
export const wsAtom=atom<WebSocket|null>(null);
export const focusedPieceAtom=atom<{pos:number[],piece:Piece}|null>(null);
export const pieceStorageAtom=atom<Piece[]>([]);
export const pieceStorage2Atom=atom<Piece[]>([]);
export const putPieceAtom=atom<string|undefined>(undefined);
export const pieceTypesAtom=atom<PieceType[]>([]);
export const messagesAtom=atom<ChatEventType[]>([]);
export const menubarStateAtom=atom<{chat:boolean,storage:boolean}>({chat:false,storage:false});
export const zAtom=atom<number>(0);
