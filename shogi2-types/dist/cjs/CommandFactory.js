"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCommand = createCommand;
// Command execution function
function createCommand(CommandClass, game) {
    return new CommandClass(game);
}
//# sourceMappingURL=CommandFactory.js.map