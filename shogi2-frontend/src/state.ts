import { createGameData, GameData, Piece, Player } from "shogi2-types";
import {atomWithStorage} from "jotai/utils";
import { atom } from "jotai";

export const roomNameAtom=atomWithStorage<string|null>("room_name",null);
export const playerAtom=atomWithStorage<Player|null>("player",null);
export const gameDataAtom=atom<GameData>(createGameData(9,9));
export const openCapturedPiecesAtom=atom<boolean>(false);
export const selectedPieceAtom=atom<Piece|null>(null);
export const imagesAtom=atom<{content:HTMLImageElement,name:string}[]>([]);
