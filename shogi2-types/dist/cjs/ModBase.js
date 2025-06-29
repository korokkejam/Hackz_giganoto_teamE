"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModBase = void 0;
const CommandFactory_1 = require("./CommandFactory");
class ModBase {
    constructor(game) {
        this.game = game;
        this.commands = [];
    }
    event(request, game) {
        let requests = [];
        switch (request.content.type) {
            case "chat":
                {
                    const rs = this.onMessage(request.content, game);
                    if (rs) {
                        rs.forEach((r) => {
                            requests.push(r);
                        });
                    }
                }
                break;
            case "drop":
                {
                    const rs = this.onDrop(request.content, game);
                    if (rs) {
                        rs.forEach((r) => {
                            requests.push(r);
                        });
                    }
                }
                break;
            case "move":
                {
                    const rs = this.onMove(request.content, game);
                    if (rs) {
                        rs.forEach((r) => {
                            requests.push(r);
                        });
                    }
                }
                break;
            case "start":
                {
                    const rs = this.onStart(request.content, game);
                    if (rs) {
                        rs.forEach((r) => {
                            requests.push(r);
                        });
                    }
                }
                break;
            case "promotion":
                {
                    const rs = this.onPromotion(request.content, game);
                    if (rs) {
                        rs.forEach((r) => {
                            requests.push(r);
                        });
                    }
                }
                break;
            case "turn":
                {
                    const rs = this.onTurn(request.content, game);
                    if (rs) {
                        rs.forEach((r) => {
                            requests.push(r);
                        });
                    }
                }
                break;
            case "end":
                {
                    const rs = this.onEnd(request.content, game);
                    if (rs) {
                        rs.forEach((r) => {
                            requests.push(r);
                        });
                    }
                }
                break;
            case "delete":
                {
                    const rs = this.onDelete(request.content, game);
                    if (rs) {
                        rs.forEach((r) => {
                            requests.push(r);
                        });
                    }
                }
                break;
            case "capture":
                {
                    const rs = this.onCapture(request.content, game);
                    if (rs) {
                        rs.forEach((r) => {
                            requests.push(r);
                        });
                    }
                }
                break;
            case "question":
                {
                    const rs = this.onQuestion(request.content, game);
                    if (rs) {
                        rs.forEach((r) => {
                            requests.push(r);
                        });
                    }
                }
                break;
            case "promotion_check":
                {
                    const rs = this.onPromotionCheck(request.content, game);
                    if (rs) {
                        rs.forEach((r) => {
                            requests.push(r);
                        });
                    }
                }
                break;
            case "command":
                this.onCommand(request.content);
                break;
        }
        const rs = this.onEvent(request.content, game);
        if (rs) {
            rs.forEach((r) => {
                requests.push(r);
            });
        }
        return requests.filter((request) => !!request);
    }
    // mod開発者はeventメソッドから自動で呼び出されるこのメソッドを実装する
    // _game:Gameはベースのゲームの更新が行われる前のgameで、これを使うことで処理を上書きすることができ、使わなければ処理の追加という扱いになる
    onStart(_e, _game) { }
    onMessage(_e, _game) { }
    onDrop(_e, _game) { }
    onMove(_e, _game) { }
    onPromotion(_e, _game) { }
    onTurn(_e, _game) { }
    onEnd(_e, _game) { }
    onDelete(_e, _game) { }
    onCapture(_e, _game) { }
    onQuestion(_e, _game) { }
    onPromotionCheck(_e, _game) { }
    onCommand(e) {
        const command = this.commands.map((commandClass) => (0, CommandFactory_1.createCommand)(commandClass, e.data, this.game)).find((command) => command.type === e.data.type);
        if (!command) {
            return;
        }
        command.execute();
    }
    onEvent(_e, _game) { }
}
exports.ModBase = ModBase;
//# sourceMappingURL=ModBase.js.map