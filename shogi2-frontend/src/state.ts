import {atom} from "jotai";

const boardAtom=atom<board>([]);
const playerAtom=atom<"player1"|"player2"|undefined>("player1");
const turnAtom=atom<"player1"|"player2">("player1");
const wsAtom=atom<WebSocket|null>(null);
const focusedPieceAtom=atom<{pos:number[],piece:piece}|null>(null);
const pieceStorageAtom=atom<piece[]>([]);

export {boardAtom,playerAtom,turnAtom,wsAtom,focusedPieceAtom,pieceStorageAtom};
