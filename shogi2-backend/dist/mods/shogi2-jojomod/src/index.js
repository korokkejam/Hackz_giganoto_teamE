"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shogi2_types_1 = require("shogi2-types");
class Jojo extends shogi2_types_1.ModBase {
    onStart(_data, _event, _sender, _updater) {
        console.log("jojo mod is loaded!");
        return { r: [], e: [] };
    }
}
exports.default = Jojo;
;
