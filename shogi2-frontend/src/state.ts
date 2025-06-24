import {atom} from "jotai";
import type {board,player} from "shogi2-types";
import {Piece,PieceType} from "shogi2-types";

const boardAtom=atom<board>([]);
const playerAtom=atom<player|undefined>("player1");
const turnAtom=atom<player>("player1");
const wsAtom=atom<WebSocket|null>(null);
const focusedPieceAtom=atom<{pos:number[],piece:Piece}|null>(null);
const pieceStorageAtom=atom<PieceType[]>([]);
const putPieceAtom=atom<number|undefined>(undefined);
const pieceTypesAtom=atom<PieceType[]>([]);

export {boardAtom,playerAtom,turnAtom,wsAtom,focusedPieceAtom,pieceStorageAtom,putPieceAtom,pieceTypesAtom};
