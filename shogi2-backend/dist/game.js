"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const shogi2_types_1 = require("shogi2-types");
class Game {
    constructor(client, mods) {
        this.id = crypto.randomUUID();
        this.mods = mods;
        this.data = (0, shogi2_types_1.createGameData)(9, 9);
        this.client = client;
        this.instances = mods.map((mod) => new mod.class());
    }
    update(event, sender) {
        const updater = new shogi2_types_1.RequestUpdater([]);
        let events = [event];
        do {
            const es = [];
            this.instances.forEach((instance) => {
                events.forEach((event) => {
                    const re = instance.update(this.data, event, sender, updater);
                    re.r.forEach((r) => {
                        updater.add(r);
                    });
                    re.e.forEach((e) => {
                        es.push(e);
                    });
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
