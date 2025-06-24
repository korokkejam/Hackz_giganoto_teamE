"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.boards = void 0;
var piece_1 = require("./piece");
var boards = [[
        [
            { piece: { id: crypto.randomUUID(), type: piece_1.lance, owner: "player2" } },
            { piece: { id: crypto.randomUUID(), type: piece_1.knight, owner: "player2" } },
            { piece: { id: crypto.randomUUID(), type: piece_1.silver_general, owner: "player2" } },
            { piece: { id: crypto.randomUUID(), type: piece_1.gold_general, owner: "player2" } },
            { piece: { id: crypto.randomUUID(), type: piece_1.king1, owner: "player2" } },
            { piece: { id: crypto.randomUUID(), type: piece_1.gold_general, owner: "player2" } },
            { piece: { id: crypto.randomUUID(), type: piece_1.silver_general, owner: "player2" } },
            { piece: { id: crypto.randomUUID(), type: piece_1.knight, owner: "player2" } },
            { piece: { id: crypto.randomUUID(), type: piece_1.lance, owner: "player2" } }
        ],
        [
            { piece: null },
            { piece: { id: crypto.randomUUID(), type: piece_1.rook, owner: "player2" } },
            { piece: null },
            { piece: null },
            { piece: null },
            { piece: null },
            { piece: null },
            { piece: { id: crypto.randomUUID(), type: piece_1.bishop, owner: "player2" } },
            { piece: null }
        ],
        [
            { piece: { id: crypto.randomUUID(), type: piece_1.pawn, owner: "player2" } },
            { piece: { id: crypto.randomUUID(), type: piece_1.pawn, owner: "player2" } },
            { piece: { id: crypto.randomUUID(), type: piece_1.pawn, owner: "player2" } },
            { piece: { id: crypto.randomUUID(), type: piece_1.pawn, owner: "player2" } },
            { piece: { id: crypto.randomUUID(), type: piece_1.pawn, owner: "player2" } },
            { piece: { id: crypto.randomUUID(), type: piece_1.pawn, owner: "player2" } },
            { piece: { id: crypto.randomUUID(), type: piece_1.pawn, owner: "player2" } },
            { piece: { id: crypto.randomUUID(), type: piece_1.pawn, owner: "player2" } },
            { piece: { id: crypto.randomUUID(), type: piece_1.pawn, owner: "player2" } }
        ],
        [
            { piece: null },
            { piece: null },
            { piece: null },
            { piece: null },
            { piece: null },
            { piece: null },
            { piece: null },
            { piece: null },
            { piece: null }
        ],
        [
            { piece: null },
            { piece: null },
            { piece: null },
            { piece: null },
            { piece: null },
            { piece: null },
            { piece: null },
            { piece: null },
            { piece: null }
        ],
        [
            { piece: null },
            { piece: null },
            { piece: null },
            { piece: null },
            { piece: null },
            { piece: null },
            { piece: null },
            { piece: null },
            { piece: null }
        ],
        [
            { piece: { id: crypto.randomUUID(), type: piece_1.pawn, owner: "player1" } },
            { piece: { id: crypto.randomUUID(), type: piece_1.pawn, owner: "player1" } },
            { piece: { id: crypto.randomUUID(), type: piece_1.pawn, owner: "player1" } },
            { piece: { id: crypto.randomUUID(), type: piece_1.pawn, owner: "player1" } },
            { piece: { id: crypto.randomUUID(), type: piece_1.pawn, owner: "player1" } },
            { piece: { id: crypto.randomUUID(), type: piece_1.pawn, owner: "player1" } },
            { piece: { id: crypto.randomUUID(), type: piece_1.pawn, owner: "player1" } },
            { piece: { id: crypto.randomUUID(), type: piece_1.pawn, owner: "player1" } },
            { piece: { id: crypto.randomUUID(), type: piece_1.pawn, owner: "player1" } }
        ],
        [
            { piece: null },
            { piece: { id: crypto.randomUUID(), type: piece_1.bishop, owner: "player1" } },
            { piece: null },
            { piece: null },
            { piece: null },
            { piece: null },
            { piece: null },
            { piece: { id: crypto.randomUUID(), type: piece_1.rook, owner: "player1" } },
            { piece: null }
        ],
        [
            { piece: { id: crypto.randomUUID(), type: piece_1.lance, owner: "player1" } },
            { piece: { id: crypto.randomUUID(), type: piece_1.knight, owner: "player1" } },
            { piece: { id: crypto.randomUUID(), type: piece_1.silver_general, owner: "player1" } },
            { piece: { id: crypto.randomUUID(), type: piece_1.gold_general, owner: "player1" } },
            { piece: { id: crypto.randomUUID(), type: piece_1.king2, owner: "player1" } },
            { piece: { id: crypto.randomUUID(), type: piece_1.gold_general, owner: "player1" } },
            { piece: { id: crypto.randomUUID(), type: piece_1.silver_general, owner: "player1" } },
            { piece: { id: crypto.randomUUID(), type: piece_1.knight, owner: "player1" } },
            { piece: { id: crypto.randomUUID(), type: piece_1.lance, owner: "player1" } }
        ],
    ]];
exports.boards = boards;
