"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = gamedata_update;
const utils_1 = require("./utils");
function gamedata_update(data, request) {
    const type = request.type;
    switch (type) {
        case "turn":
            {
                const r = request;
                const turn = r.player;
                data.turn = turn;
            }
            break;
        case "chat":
            //未実装
            break;
        case "move":
            {
                const r = request;
                const piece = r.piece;
                const p1 = piece.position;
                const p2 = r.position2;
                data.board.squares = data.board.squares.map((square) => {
                    if ((0, utils_1.cmp_pos)(square.position, p1)) {
                        return Object.assign(Object.assign({}, square), { piece: null });
                    }
                    else if ((0, utils_1.cmp_pos)(square.position, p2)) {
                        return Object.assign(Object.assign({}, square), { piece: Object.assign(Object.assign({}, piece), { position: p2 }) });
                    }
                    return square;
                });
            }
            break;
        case "board":
            {
                const r = request;
                const board = r.board;
                data.board = board;
            }
            break;
        case "square":
            {
                const r = request;
                const square = r.square;
                data.board.squares = data.board.squares.map((s) => {
                    if ((0, utils_1.cmp_pos)(s.position, square.position)) {
                        return square;
                    }
                    return s;
                });
            }
            break;
        case "player":
            {
                const r = request;
                const player = r.data.player;
                if (player === "player1") {
                    data.player1 = r.data;
                }
                else {
                    data.player2 = r.data;
                }
            }
            break;
        case "capture":
            {
                const r = request;
                data.player1.captured_pieces = r.player1_pieces;
                data.player2.captured_pieces = r.player2_pieces;
            }
            break;
        case "audio":
        case "end":
        case "file":
        case "start":
        case "question":
        case "ui":
            break;
    }
    request.then.forEach((request) => {
        gamedata_update(data, request);
    });
}
