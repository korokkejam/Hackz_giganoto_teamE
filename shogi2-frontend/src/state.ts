import {atom} from "jotai";

const boardAtom=atom<board>([
  [{piece:null},{piece:null},{piece:null},{piece:null},{piece:null},{piece:null},{piece:null},{piece:null},{piece:null}],
  [{piece:null},{piece:null},{piece:null},{piece:null},{piece:null},{piece:null},{piece:null},{piece:null},{piece:null}],
  [{piece:null},{piece:null},{piece:null},{piece:null},{piece:null},{piece:null},{piece:null},{piece:null},{piece:null}],
  [{piece:null},{piece:null},{piece:null},{piece:null},{piece:null},{piece:null},{piece:null},{piece:null},{piece:null}],
  [{piece:null},{piece:null},{piece:null},{piece:null},{piece:null},{piece:null},{piece:null},{piece:null},{piece:null}],
  [{piece:null},{piece:null},{piece:null},{piece:null},{piece:null},{piece:null},{piece:null},{piece:null},{piece:null}],
  [{piece:null},{piece:null},{piece:null},{piece:null},{piece:null},{piece:null},{piece:null},{piece:null},{piece:null}],
  [{piece:null},{piece:null},{piece:null},{piece:null},{piece:null},{piece:null},{piece:null},{piece:null},{piece:null}],
  [{piece:null},{piece:null},{piece:null},{piece:null},{piece:null},{piece:null},{piece:null},{piece:null},{piece:null}]
]);
const playerAtom=atom<"player1"|"player2"|undefined>("player1");
const turnAtom=atom<"player1"|"player2">("player1");
const wsAtom=atom<WebSocket|null>(null);

export {boardAtom,playerAtom,turnAtom,wsAtom};
