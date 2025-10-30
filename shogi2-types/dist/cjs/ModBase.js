"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModBase = void 0;
class ModBase {
    update(data, event, sender) {
        const requests = [];
        switch (event.type) {
            case "start":
                const re = this.onStart(data, event, sender);
                re.forEach((r) => {
                    requests.push(r);
                });
                break;
        }
        return requests;
    }
    onStart(_data, _event, _sender) { return []; }
    ;
    onBoard(_data, _event, _sender) { return []; }
    ;
}
exports.ModBase = ModBase;
//# sourceMappingURL=ModBase.js.map