"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const shogi2_types_1 = require("shogi2-types");
const lodash_1 = require("lodash");
const updater_1 = __importDefault(require("./updater"));
class Game {
    constructor(client, mods) {
        this.id = crypto.randomUUID();
        this.mods = mods;
        this.data = (0, shogi2_types_1.createGameData)(9, 9);
        this.client = client;
        this.instances = mods.map((mod) => new mod.class());
    }
    update(event, sender) {
        const before = (0, lodash_1.cloneDeep)(this.data);
        const updater = new shogi2_types_1.RequestUpdater([]);
        let events = [event];
        do {
            const es = [];
            this.instances.forEach((instance) => {
                events.forEach((event) => {
                    const re = instance.update(this.data, before, event, sender, updater);
                    re.r.forEach((r) => {
                        const same_requests = updater.requests.filter((request) => request.type === r.type);
                        if (r.importance === "exclude") {
                            updater.filter((request) => request.type !== r.type || request.importance !== "obedience");
                        }
                        if (!same_requests.some((request) => request.importance === "exclude") || r.importance !== "obedience") {
                            updater.add(r);
                        }
                    });
                    re.e.forEach((e) => {
                        es.push(e);
                    });
                });
                updater.requests.forEach((request) => {
                    (0, updater_1.default)(this.data, request);
                });
            });
            events = es;
        } while (events.length);
        this.send(updater.requests);
    }
    send(requests) {
        requests.forEach((request) => {
            var _a, _b;
            if (request.to === "both" || request.to === "player1")
                (_a = this.client.ws1) === null || _a === void 0 ? void 0 : _a.send(request.json());
            if (request.to === "both" || request.to === "player2")
                (_b = this.client.ws2) === null || _b === void 0 ? void 0 : _b.send(request.json());
        });
    }
}
exports.Game = Game;
;
