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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = setup;
var pieces_1 = __importDefault(require("./pieces"));
function setup(data) {
    data.setStorage1(pieces_1.default.map(function (piece) { return __assign({}, piece); }));
    data.setStorage2(pieces_1.default.map(function (piece) { return __assign({}, piece); }));
}
