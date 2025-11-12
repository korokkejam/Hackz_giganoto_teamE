"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.get_modlist = get_modlist;
exports.check_room_name = check_room_name;
exports.create_room = create_room;
exports.enter_room = enter_room;
exports.connect = connect;
exports.debug = debug;
exports.admin_login = admin_login;
exports.admin_games = admin_games;
exports.request_mod = request_mod;
exports.get_mod_requests = get_mod_requests;
exports.accept_mod_request = accept_mod_request;
exports.reject_mod_request = reject_mod_request;
const state_1 = require("./state");
const handle_websocket_1 = require("./handle_websocket");
const game_1 = require("./game");
const git_clone_1 = __importDefault(require("git-clone"));
function get_modlist(c) {
    const mod_list = (0, state_1.getMods)().map((mod) => mod.identifier);
    return c.text(JSON.stringify(mod_list));
}
;
function check_room_name(c) {
    const id = c.req.param("id");
    const rooms = (0, state_1.getRooms)();
    console.log(rooms.includes(id) ? "exist" : "not exist");
    return c.text(rooms.includes(id) ? "true" : "false");
}
function create_room(c) {
    return __awaiter(this, void 0, void 0, function* () {
        const req = yield c.req.json();
        const enable_mods = req.mods.map((identifier) => identifier.id);
        const room_name = req.name;
        const mods = (0, state_1.getMods)().filter((mod) => enable_mods.includes(mod.identifier.id));
        const client = { ws1: null, ws2: null, room_name };
        const game = new game_1.Game(client, mods);
        (0, state_1.addGame)(game);
        return c.text("success");
    });
}
function enter_room(c) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = c.req.param("id");
        const rooms = (0, state_1.getRooms)();
        if (rooms.includes(id)) {
            return c.text("success");
        }
        else {
            return c.text("failed");
        }
    });
}
function connect(upgradeWebSocket) {
    return upgradeWebSocket((c) => {
        const room_id = c.req.param("id");
        const player = c.req.param("player");
        const game = (0, state_1.getGame)(room_id);
        return {
            onMessage: (0, handle_websocket_1.update)(game, player),
            onOpen: (0, handle_websocket_1.accept_player)(game, player),
            onClose: (0, handle_websocket_1.close_room)(game, player),
            onError(_event) { }
        };
    });
}
;
function debug(c) {
    const id = c.req.param("id");
    const game = (0, state_1.getGame)(id);
    if (game) {
        return c.json(game.data);
    }
    else {
        return c.text("not found");
    }
}
function admin_login(c) {
    const password = c.req.param("password");
    if ((0, state_1.auth)(password)) {
        return c.text("success");
    }
    else {
        return c.text("rejected");
    }
}
function admin_games(c) {
    const games = (0, state_1.getRooms)().map((room) => {
        const game = (0, state_1.getGame)(room);
        if (!game) {
            return;
        }
        return { name: room, data: game.data };
    }).filter((game) => !!game);
    return c.json(games);
}
function request_mod(c) {
    return __awaiter(this, void 0, void 0, function* () {
        const req = yield c.req.json();
        (0, state_1.addModRequest)(req);
        return c.text("ok");
    });
}
function get_mod_requests(c) {
    const requests = (0, state_1.getModRequests)();
    return c.json(requests);
}
function accept_mod_request(c) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = c.req.param("id");
        const request = (0, state_1.getModRequest)(id);
        (0, state_1.deleteModRequest)(id);
        if (!request) {
            return c.text("cancel");
        }
        if (request.type === "add") {
            const dir = request.repo.split("/")[1];
            (0, git_clone_1.default)(`https://github.com/${request.repo}`, `./src/mods/${dir}`);
            const mod_class = yield Promise.resolve(`${`./mods/${dir}/src/index`}`).then(s => __importStar(require(s)));
            const info = yield Promise.resolve(`${`./mods/${dir}/info`}`).then(s => __importStar(require(s)));
            const mod = {
                class: mod_class.default,
                identifier: { name: dir, id: info.id }
            };
            (0, state_1.addMod)(mod);
        }
        else {
            const mods = (0, state_1.getMods)();
            const mod = mods.find((mod) => mod.identifier.name === request.repo);
            if (mod) {
                (0, state_1.deleteMod)(mod);
            }
        }
        return c.text("ok");
    });
}
function reject_mod_request(c) {
    const id = c.req.param("id");
    (0, state_1.deleteModRequest)(id);
    return c.text("ok");
}
