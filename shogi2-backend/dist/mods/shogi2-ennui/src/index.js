"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const shogi2_types_1 = require("shogi2-types");
const fs_1 = __importDefault(require("fs"));
class Ennui extends shogi2_types_1.ModBase {
    constructor() {
        super();
    }
    onStart(_data, _before, _event, _sender, _updater) {
        const request = new shogi2_types_1.FileRequest("both", "coexistence", "effect1", fs_1.default.readFileSync("src/mods/shogi2-ennui/src/assets/effect1.png").toString("base64"), "image/png");
        return { r: [{ request }], e: [] };
    }
    onMove(_data, before, event, _sender, _updater) {
        const data = Object.assign({}, before);
        const { x, y } = event.to;
        const requests = [];
        data.board.squares = data.board.squares.map((square) => {
            if (square.position.x === x && square.position.y === y) {
                const s = Object.assign(Object.assign({}, square), { image: "effect1" });
                const request = new shogi2_types_1.SquareRequest("both", "coexistence", s);
                requests.push(request);
                return s;
            }
            return square;
        });
        return { r: requests.map((r) => ({ request: r, data })), e: [] };
    }
}
exports.default = Ennui;
;
