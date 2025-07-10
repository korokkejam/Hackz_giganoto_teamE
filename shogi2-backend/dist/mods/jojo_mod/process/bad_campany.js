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
var base_1 = __importDefault(require("./base"));
var stone_ocean_1 = require("../pieces/stone_ocean");
var BadCampany = /** @class */ (function (_super) {
    __extends(BadCampany, _super);
    function BadCampany(game) {
        var _this = _super.call(this, game) || this;
        _this.count = 0;
        return _this;
    }
    BadCampany.prototype.onStart = function (_e, _before) {
        this.game.boards = this.game.boards.map(function (board) { return board.map(function (row) { return row.map(function (s) {
            var _a;
            if (((_a = s.piece) === null || _a === void 0 ? void 0 : _a.type.id) === "pawn") {
                var piece = {
                    type: __assign({}, stone_ocean_1.stone_ocean_pieces[2]),
                    id: crypto.randomUUID(),
                    owner: s.piece.owner
                };
                return { piece: piece };
            }
            else {
                return s;
            }
        }); }); });
    };
    BadCampany.prototype.onMove = function (e, before) {
        if (this.count === 0 && e.data.piece.type.id === "bad-campany") {
            this.game.turn = before.turn;
            this.game.requests = this.game.requests.filter(function (request) {
                return request.request.content.type !== "turn";
            });
            this.count = 1;
        }
        else if (0 < this.count) {
            this.count = 0;
        }
    };
    return BadCampany;
}(base_1.default));
exports.default = BadCampany;
