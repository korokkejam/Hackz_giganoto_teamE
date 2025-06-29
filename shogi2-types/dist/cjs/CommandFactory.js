"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCommand = createCommand;
// Command execution function
function createCommand(CommandClass, raw, game) {
    return new CommandClass(raw, game);
}
//# sourceMappingURL=CommandFactory.js.map