"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModBase = void 0;
class ModBase {
    update(data, event, sender, registered_requests) {
        const requests = [];
        const events = [];
        switch (event.type) {
            case "start":
                {
                    const re = this.onStart(data, event, sender, registered_requests);
                    re.r.forEach((r) => {
                        requests.push(r);
                    });
                    re.e.forEach((e) => {
                        events.push(e);
                    });
                }
                break;
            case "board":
                {
                    const re = this.onBoard(data, event, sender, registered_requests);
                    re.r.forEach((r) => {
                        requests.push(r);
                    });
                    re.e.forEach((e) => {
                        events.push(e);
                    });
                }
                break;
            case "move":
                {
                    const re = this.onMove(data, event, sender, registered_requests);
                    re.r.forEach((r) => {
                        requests.push(r);
                    });
                    re.e.forEach((e) => {
                        events.push(e);
                    });
                }
                break;
            case "answer":
                {
                    const re = this.onAnswer(data, event, sender, registered_requests);
                    re.r.forEach((r) => {
                        requests.push(r);
                    });
                    re.e.forEach((e) => {
                        events.push(e);
                    });
                }
                break;
        }
        return { r: requests, e: events };
    }
    onStart(_data, _event, _sender, _registered_requests) { return { r: [], e: [] }; }
    ;
    onBoard(_data, _event, _sender, _registered_requests) { return { r: [], e: [] }; }
    ;
    onMove(_data, _event, _sender, _registered_requests) { return { r: [], e: [] }; }
    ;
    onAnswer(_data, _event, _sender, _registered_requests) { return { r: [], e: [] }; }
    ;
}
exports.ModBase = ModBase;
//# sourceMappingURL=ModBase.js.map