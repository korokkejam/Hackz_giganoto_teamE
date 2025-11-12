"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = update;
exports.accept_player = accept_player;
exports.close_room = close_room;
const shogi2_types_1 = require("shogi2-types");
const state_1 = require("./state");
function update(game, player) {
    return (event, _ws) => {
        if (!game) {
            return;
        }
        const request = JSON.parse(event.data);
        game.update(request, player);
    };
}
function accept_player(game, player) {
    const request = (new shogi2_types_1.StartRequest("both", "exclude")).json();
    return (_event, ws) => {
        if (!game) {
            ws.close(1008);
            return;
        }
        if (player === "player1") {
            if (game.client.ws1) {
                ws.close(1008);
                return;
            }
            game.client.ws1 = ws;
        }
        else {
            if (game.client.ws2) {
                ws.close(1008);
                return;
            }
            game.client.ws2 = ws;
        }
        if (game.client.ws1 && game.client.ws2) {
            game.client.ws1.send(request);
            game.client.ws2.send(request);
            const event = new shogi2_types_1.StartEvent();
            game.update(event, "player1");
            console.log(`game start at ${game.client.room_name}`);
            console.log(`mods being used is ${game.mods.map((mod) => mod.identifier.id)}`);
        }
    };
}
;
function close_room(game, player) {
    return (_event) => {
        if (!game) {
            return;
        }
        if (player === "player1") {
            game.client.ws1 = null;
        }
        else if (player === "player2") {
            game.client.ws2 = null;
        }
        if (!game.client.ws1 && !game.client.ws2) {
            (0, state_1.deleteGame)(game);
        }
    };
}
;
