"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestUpdater = exports.Request = void 0;
class Request {
    constructor() {
        this.id = crypto.randomUUID();
        this.then = [];
    }
    json() {
        return JSON.stringify(this);
    }
    ;
}
exports.Request = Request;
;
class RequestUpdater {
    constructor(requests) {
        this.requests = requests;
    }
    set(requests) {
        this.requests = requests;
    }
    add(request) {
        this.requests.push(request);
    }
    delete(id) {
        this.filter((request) => request.id !== id);
    }
    filter(func) {
        this.requests = this.requests.filter(func);
    }
    map(func) {
        this.requests = this.requests.map(func);
    }
}
exports.RequestUpdater = RequestUpdater;
;
//# sourceMappingURL=Request.js.map