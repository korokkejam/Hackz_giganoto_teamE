"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var shogi2_types_1 = require("shogi2-types");
var stone_ocean_1 = require("./pieces/stone_ocean");
var bad_campany_1 = __importDefault(require("./process/bad_campany"));
var JoJo = /** @class */ (function (_super) {
    __extends(JoJo, _super);
    function JoJo(game) {
        var _this = _super.call(this, game) || this;
        _this.type = "jojo";
        _this.processes = [
            new bad_campany_1.default(game)
        ];
        return _this;
    }
    JoJo.prototype.onStart = function (e, before) {
        var _this = this;
        stone_ocean_1.stone_ocean_pieces.forEach(function (piece) {
            _this.game.pieces.push(piece);
        });
        console.log("jojo mod loaded!");
        var requests = this.processes.map(function (process) { return process.onStart(e, before); }).filter(function (request) { return !!request; }).flat();
        var change = { type: "change_board", data: { boards: this.game.boards }, id: crypto.randomUUID() };
        var request = { head: "event", content: change };
        var r = { request: request, owner: "jojo", target: undefined };
        return __spreadArray([r], requests, true);
    };
    JoJo.prototype.onMove = function (e, before) {
        var requests = this.processes.map(function (process) { return process.onMove(e, before); }).filter(function (request) { return !!request; }).flat();
        return requests;
    };
    return JoJo;
}(shogi2_types_1.ModBase));
exports.default = JoJo;
