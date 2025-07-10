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
Object.defineProperty(exports, "__esModule", { value: true });
var shogi2_types_1 = require("shogi2-types");
var JoJoConfig = /** @class */ (function (_super) {
    __extends(JoJoConfig, _super);
    function JoJoConfig(game, mod) {
        var _this = _super.call(this, game, mod) || this;
        _this.type = "jojo";
        _this.config = {};
        _this.hierarchy = 0;
        return _this;
    }
    return JoJoConfig;
}(shogi2_types_1.ModConfig));
exports.default = JoJoConfig;
