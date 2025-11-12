import { atom } from "jotai";
import { GameData, ModRequest } from "shogi2-types";

export const loginAtom=atom<boolean>(false);
export const gamesAtom=atom<{name:string,data:GameData}[]>([]);
export const modRequestsAtom=atom<ModRequest[]>([]);
