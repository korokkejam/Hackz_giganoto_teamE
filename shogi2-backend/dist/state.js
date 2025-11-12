"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getModRequest = exports.addModRequest = exports.deleteModRequest = exports.getModRequests = exports.deleteGame = exports.getGame = exports.addGame = exports.getRooms = exports.deleteMod = exports.addMod = exports.setMods = exports.getMods = exports.auth = void 0;
const state = {
    mods: [],
    games: [],
    password: crypto.randomUUID(),
    mod_requests: []
};
console.log(`admin password is: ${state.password}`);
const auth = (password) => password === state.password;
exports.auth = auth;
const getMods = () => state.mods;
exports.getMods = getMods;
const setMods = (mods) => { state.mods = mods; };
exports.setMods = setMods;
const addMod = (mod) => { state.mods = [...state.mods, mod]; };
exports.addMod = addMod;
const deleteMod = (mod) => { state.mods = state.mods.filter((m) => m.identifier.id !== mod.identifier.id); };
exports.deleteMod = deleteMod;
const getRooms = () => state.games.map((game) => game.client.room_name);
exports.getRooms = getRooms;
const addGame = (game) => { state.games = [...state.games, game]; };
exports.addGame = addGame;
const getGame = (room_name) => state.games.find((game) => game.client.room_name === room_name);
exports.getGame = getGame;
const deleteGame = (game) => { state.games = state.games.filter((g) => g.id !== game.id); };
exports.deleteGame = deleteGame;
const getModRequests = () => state.mod_requests;
exports.getModRequests = getModRequests;
const deleteModRequest = (id) => { state.mod_requests = state.mod_requests.filter((r) => r.id !== id); };
exports.deleteModRequest = deleteModRequest;
const addModRequest = (r) => { state.mod_requests.push(r); };
exports.addModRequest = addModRequest;
const getModRequest = (id) => state.mod_requests.find((r) => r.id === id);
exports.getModRequest = getModRequest;
