"use strict";
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
const hono_1 = require("hono");
const cors_1 = require("hono/cors");
const node_ws_1 = require("@hono/node-ws");
const requests_1 = require("./requests");
const node_server_1 = require("@hono/node-server");
const utils_1 = require("./utils");
const fs_1 = __importDefault(require("fs"));
const load_1 = require("./load");
const state_1 = require("./state");
const app = new hono_1.Hono();
const { injectWebSocket, upgradeWebSocket } = (0, node_ws_1.createNodeWebSocket)({ app });
const logger = (c, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(c.req.url);
    yield next();
});
app.use("*", logger);
app.use("*", (0, cors_1.cors)());
app.get("/mod/list", requests_1.get_modlist);
app.get("/room/check/:id", requests_1.check_room_name);
app.get("/room/enter/:id", requests_1.enter_room);
app.get("/room/connect/:id/:player", (0, requests_1.connect)(upgradeWebSocket));
app.get("/debug/:id", requests_1.debug);
app.get("/admin/login/:password", requests_1.admin_login);
app.get("/admin/games", requests_1.admin_games);
app.get("/admin/mods", requests_1.get_mod_requests);
app.get("/admin/mods/accept/:id", requests_1.accept_mod_request);
app.get("/admin/mods/reject/:id", requests_1.reject_mod_request);
app.post("/room/create", requests_1.create_room);
app.post("/request/mods", requests_1.request_mod);
fs_1.default.readdir("src/mods/", (_, d) => {
    (0, load_1.loadMods)(d).then((mods) => {
        (0, state_1.setMods)(mods);
        const ipAddress = (0, utils_1.getLocalIpAddress)(true);
        const server = (0, node_server_1.serve)({ fetch: app.fetch, port: 3000, hostname: "0.0.0.0" }, () => {
            console.log(mods.map((mod) => mod.identifier.id));
            console.log(`Server is running on http://${ipAddress}:3000`);
        });
        injectWebSocket(server);
    });
});
