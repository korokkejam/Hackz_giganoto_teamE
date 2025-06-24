"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
var hono_1 = require("hono");
var node_server_1 = require("@hono/node-server");
var cors_1 = require("hono/cors");
var board_1 = require("./config/board");
var node_ws_1 = require("@hono/node-ws");
var rooms_1 = require("./game/rooms");
var board_2 = __importDefault(require("./game/board"));
var pieces_1 = __importDefault(require("./mods/addpieces/pieces"));
var piece_1 = require("./config/piece");
var index_1 = __importDefault(require("./mods/addpieces/index"));
var fs_1 = __importDefault(require("fs"));
fs_1.default.readdir("src/mods/", function (_, d) {
    d.forEach(function (dir) {
        Promise.resolve("".concat("./mods/".concat(dir, "/test"))).then(function (s) { return __importStar(require(s)); }).then(function (q) {
            q.run();
        });
    });
});
var app = new hono_1.Hono();
var _a = (0, node_ws_1.createNodeWebSocket)({ app: app }), injectWebSocket = _a.injectWebSocket, upgradeWebSocket = _a.upgradeWebSocket;
var logger = function (c, next) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log(c.req.url);
                return [4 /*yield*/, next()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
app.use("*", logger);
app.use("*", (0, cors_1.cors)());
app.get("/room/check/:id", function (c) {
    var id = c.req.param("id");
    return c.text(rooms_1.rooms.map(function (room) { return room.id; }).includes(id) ? "yes" : "no");
});
app.get("/room/create/:id", upgradeWebSocket(function (c) {
    var id = c.req.param("id");
    console.log(id);
    var data = new board_2.default(board_1.boards.map(function (board) { return board.map(function (row) { return row.map(function (s) { return __assign({}, s); }); }); }));
    (0, index_1.default)(data);
    return {
        onMessage: function (event, _ws) {
            var room = rooms_1.rooms.find(function (room) { return room.id === id; });
            if (!room) {
                return;
            }
            room.data.change();
            room.data.update(event, room.ws);
        },
        onOpen: function (_event, ws) {
            rooms_1.rooms.push({ ws: [ws], id: id, gamemode: "survival", data: data });
            // console.log(rooms);
        },
        onClose: function (event) {
            console.log(event);
        },
        onError: function (event) {
            console.log(event);
        }
    };
}));
app.get("/room/enter/:id", upgradeWebSocket(function (c) {
    var id = c.req.param("id");
    var room = rooms_1.rooms.find(function (room) { return room.id === id; });
    return {
        onMessage: function (event, _ws) {
            if (!room) {
                return;
            }
            room.data.change();
            room.data.update(event, room.ws);
        },
        onOpen: function (_event, ws) {
            if (!room) {
                return;
            }
            var d = { head: "ready", content: { room: room.data.data, pieces: __spreadArray(__spreadArray([], pieces_1.default, true), piece_1.pieces, true) } };
            room.ws[0].send(JSON.stringify(d));
            ws.send(JSON.stringify(d));
            room.ws.push(ws);
            console.log(rooms_1.rooms);
        },
        onClose: function (event) {
            console.log(event);
        },
        onError: function (event) {
            console.log(event);
        }
    };
}));
var server = (0, node_server_1.serve)({ fetch: app.fetch, port: 3000 }, function () {
    console.log("Server is running on http://localhost:3000");
});
injectWebSocket(server);
