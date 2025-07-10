"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Base = /** @class */ (function () {
    function Base(game) {
        this.game = game;
    }
    Base.prototype.onStart = function (_e, _game) { };
    Base.prototype.onMessage = function (_e, _game) { };
    Base.prototype.onDrop = function (_e, _game) { };
    Base.prototype.onMove = function (_e, _game) { };
    Base.prototype.onPromotion = function (_e, _game) { };
    Base.prototype.onTurn = function (_e, _game) { };
    Base.prototype.onEnd = function (_e, _game) { };
    Base.prototype.onDelete = function (_e, _game) { };
    Base.prototype.onCapture = function (_e, _game) { };
    Base.prototype.onQuestion = function (_e, _game) { };
    Base.prototype.onPromotionCheck = function (_e, _game) { };
    Base.prototype.onEvent = function (_e, _game) { };
    return Base;
}());
exports.default = Base;
