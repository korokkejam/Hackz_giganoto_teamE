import { createGameData, GameData, Player } from "shogi2-types";
import {atomWithStorage} from "jotai/utils";
import { atom } from "jotai";

export const roomNameAtom=atomWithStorage<string|null>("room_name",null);
export const playerAtom=atomWithStorage<Player|null>("player",null);
export const gameDataAtom=atom<GameData>(createGameData(9,9));
