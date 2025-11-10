"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModBase = void 0;
class ModBase {
    update(data, event, sender, updater) {
        const requests = [];
        const events = [];
        switch (event.type) {
            case "start":
                {
                    const re = this.onStart(data, event, sender, updater);
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
                    const re = this.onBoard(data, event, sender, updater);
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
                    const re = this.onMove(data, event, sender, updater);
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
                    const re = this.onAnswer(data, event, sender, updater);
                    re.r.forEach((r) => {
                        requests.push(r);
                    });
                    re.e.forEach((e) => {
                        events.push(e);
                    });
                }
                break;
            case "drop":
                {
                    const re = this.onDrop(data, event, sender, updater);
                    re.r.forEach((r) => {
                        requests.push(r);
                    });
                    re.e.forEach((e) => {
                        events.push(e);
                    });
                }
                break;
            case "capture":
                {
                    const re = this.onCapture(data, event, sender, updater);
                    re.r.forEach((r) => {
                        requests.push(r);
                    });
                    re.e.forEach((e) => {
                        events.push(e);
                    });
                }
                break;
            case "end":
                {
                    const re = this.onEnd(data, event, sender, updater);
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
    onStart(_data, _event, _sender, _updater) { return { r: [], e: [] }; }
    ;
    onBoard(_data, _event, _sender, _updater) { return { r: [], e: [] }; }
    ;
    onMove(_data, _event, _sender, _updater) { return { r: [], e: [] }; }
    ;
    onAnswer(_data, _event, _sender, _updater) { return { r: [], e: [] }; }
    ;
    onDrop(_data, _event, _sender, _updater) { return { r: [], e: [] }; }
    ;
    onCapture(_data, _event, _sender, _updater) { return { r: [], e: [] }; }
    ;
    onEnd(_data, _event, _sender, _updater) { return { r: [], e: [] }; }
    ;
}
exports.ModBase = ModBase;
//# sourceMappingURL=ModBase.js.map