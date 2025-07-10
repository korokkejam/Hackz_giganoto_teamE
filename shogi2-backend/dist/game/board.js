"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./rooms");
var piece_1 = require("../config/piece");
var load_1 = require("../load");
var cloneDeep_1 = __importDefault(require("lodash/cloneDeep"));
var GameProcess = /** @class */ (function () {
    function GameProcess(boards) {
        var _this = this;
        var game = {
            boards: boards,
            turn: "player1",
            player1_current_board: 0,
            player2_current_board: 0,
            player1_point: 0,
            player2_point: 0,
            player1_redbull: 0,
            player2_redbull: 0,
            history: [],
            player1_storage: [],
            player2_storage: [],
            pieces: __spreadArray([], piece_1.pieces, true),
            messages: [],
            requests: []
        };
        this.game = game;
        this.mods = load_1.mods.map(function (modClass) { return new modClass(game); });
        this.configs = load_1.configs.map(function (configClass, i) { return new configClass(game, _this.mods[i]); });
        this.mods.sort(function (mod1, mod2) {
            var config1 = _this.configs.find(function (config) { return config.type === mod1.type; });
            var config2 = _this.configs.find(function (config) { return config.type === mod2.type; });
            if (!config1 || !config2) {
                return 0;
            }
            return config1.hierarchy - config2.hierarchy;
        });
        this.configs.sort(function (config1, config2) { return config1.hierarchy - config2.hierarchy; });
    }
    GameProcess.prototype.clone_game = function () {
        return (0, cloneDeep_1.default)(this.game);
    };
    GameProcess.prototype.update = function (e, ws1, ws2) {
        var request = JSON.parse(e.data);
        this.event(request, ws1, ws2);
    };
    GameProcess.prototype.event = function (request, ws1, ws2) {
        var before = this.clone_game();
        this.game.requests = [];
        switch (request.head) {
            case "event":
                var event_1 = request.content;
                console.log(event_1);
                switch (event_1.type) {
                    case "chat":
                        {
                            if (request.sender === undefined) {
                                return;
                            }
                            var e = event_1;
                            console.log("".concat(e.data.sender, ":").concat(e.data.msg));
                            this.game.messages.push(e.data);
                            var req = { request: { head: "event", content: e }, target: undefined, owner: "main" };
                            this.game.requests.push(req);
                        }
                        break;
                    case "move":
                        {
                            var end_flag = false;
                            var e = event_1;
                            var move = {
                                pieceId: e.data.piece.id,
                                from: { x: e.data.before_pos[0], y: e.data.before_pos[1], z: 0 },
                                to: { x: e.data.after_pos[0], y: e.data.after_pos[1], z: 0 }
                            };
                            this.game.history.push([move]);
                            var piece1 = e.data.piece;
                            var piece2 = this.game.boards[0][e.data.after_pos[1]][e.data.after_pos[0]].piece;
                            this.game.boards[0][e.data.after_pos[1]][e.data.after_pos[0]] = { piece: piece1 };
                            this.game.boards[0][e.data.before_pos[1]][e.data.before_pos[0]] = { piece: null };
                            if (piece2) { //piece2が取られた時
                                var capture = {
                                    type: "capture",
                                    id: crypto.randomUUID(),
                                    data: {
                                        piece1: piece1,
                                        piece2: piece2,
                                        pos1: { x: e.data.before_pos[0], y: e.data.before_pos[1], z: 0 },
                                        pos2: { x: e.data.after_pos[0], y: e.data.after_pos[1], z: 0 }
                                    }
                                };
                                if (piece2.type.king) {
                                    var end = { type: "end", data: { winner: piece1.owner }, id: crypto.randomUUID() };
                                    var req_1 = { head: "event", content: end };
                                    this.game.requests.push({ request: req_1, owner: "main", target: undefined });
                                    end_flag = true;
                                }
                                if (this.game.turn === "player1") {
                                    this.game.player1_storage.push(piece2);
                                }
                                else {
                                    this.game.player2_storage.push(piece2);
                                }
                                var req_2 = { head: "event", content: capture, sender: request.sender };
                                this.game.requests.push({ request: req_2, target: undefined, owner: "main" });
                            }
                            if (move.to && ((this.game.turn === "player1" && 3 > move.to.y) || (this.game.turn === "player2" && move.to.y > 5)) && piece1.type.promotion && !end_flag) {
                                var promotion_check = {
                                    type: "promotion_check",
                                    id: crypto.randomUUID(),
                                    data: {
                                        piece: piece1,
                                        pos: move.to,
                                        answer: false
                                    }
                                };
                                var req_3 = { head: "event", content: promotion_check };
                                this.game.requests.push({ request: req_3, target: this.game.turn, owner: "main" });
                            }
                            else {
                                this.game.turn = this.game.turn === "player1" ? "player2" : "player1";
                                var turn = { type: "turn", data: { player: this.game.turn }, id: crypto.randomUUID() };
                                var req_4 = { head: "event", content: turn };
                                this.game.requests.push({ request: req_4, target: undefined, owner: "main" });
                            }
                            var req = { head: "event", content: e };
                            this.game.requests.push({ request: req, target: undefined, owner: "main" });
                        }
                        break;
                    case "promotion_check":
                        {
                            var e = event_1;
                            var pos = e.data.pos;
                            var piece = e.data.piece;
                            if (piece.type.promotion) {
                                if (e.data.answer) {
                                    var promotedPiece = { id: piece.id, type: piece.type.promotion, owner: piece.owner };
                                    this.game.boards[pos.z][pos.y][pos.x] = { piece: promotedPiece };
                                    var promotion = {
                                        type: "promotion",
                                        id: crypto.randomUUID(),
                                        data: {
                                            piece: promotedPiece,
                                            pos: e.data.pos
                                        }
                                    };
                                    var req_p = { head: "event", content: promotion };
                                    this.game.requests.push({ request: req_p, target: undefined, owner: "main" });
                                }
                                this.game.turn = this.game.turn === "player1" ? "player2" : "player1";
                                var turn = { type: "turn", data: { player: this.game.turn }, id: crypto.randomUUID() };
                                var req = { head: "event", content: turn };
                                this.game.requests.push({ request: req, target: undefined, owner: "main" });
                            }
                        }
                        break;
                    case "drop":
                        {
                            var e_1 = event_1;
                            if (request.sender === "player1") {
                                this.game.player1_storage = this.game.player1_storage.filter(function (p) { return p.id === e_1.data.piece.id; });
                            }
                            else {
                                this.game.player2_storage = this.game.player2_storage.filter(function (p) { return p.id === e_1.data.piece.id; });
                            }
                            var req1 = { head: "event", content: e_1 };
                            this.game.requests.push({ request: req1, target: undefined, owner: "main" });
                            this.game.turn = this.game.turn === "player1" ? "player2" : "player1";
                            var turn = { type: "turn", data: { player: this.game.turn }, id: crypto.randomUUID() };
                            var req2 = { head: "event", content: turn };
                            this.game.requests.push({ request: req2, target: undefined, owner: "main" });
                        }
                        break;
                }
                break;
        }
        for (var _i = 0, _a = this.mods; _i < _a.length; _i++) {
            var mod = _a[_i];
            var rs = mod.event(request, (0, cloneDeep_1.default)(before));
            var _loop_1 = function (r) {
                var type = r.request.content.type;
                var target = r.target;
                this_1.game.requests = this_1.game.requests.filter(function (req) { return (req.request.content.type !== type || req.target !== target) && req.overwritten; });
                this_1.game.requests.push(r);
            };
            var this_1 = this;
            for (var _b = 0, rs_1 = rs; _b < rs_1.length; _b++) {
                var r = rs_1[_b];
                _loop_1(r);
            }
        }
        this.game.requests.forEach(function (request) {
            var wss = [];
            switch (request.target) {
                case "player1":
                    wss.push(ws1);
                    break;
                case "player2":
                    wss.push(ws2);
                    break;
                case undefined:
                    wss.push(ws1);
                    wss.push(ws2);
                    break;
            }
            wss.map(function (ws) {
                ws.send(JSON.stringify(request.request));
            });
        });
    };
    return GameProcess;
}());
exports.default = GameProcess;
