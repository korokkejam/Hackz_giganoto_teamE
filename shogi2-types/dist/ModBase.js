"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModBase = void 0;
class ModBase {
    constructor(game) {
        this.game = game;
    }
    event(request) {
        switch (request.content.type) {
            case "chat":
                break;
        }
    }
}
exports.ModBase = ModBase;
//# sourceMappingURL=ModBase.js.map